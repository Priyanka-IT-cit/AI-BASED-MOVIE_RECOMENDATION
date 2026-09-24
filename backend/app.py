from pathlib import Path
import ast

import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel


# ============================================================
# PATH CONFIGURATION
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset"

MOVIES_FILE = DATASET_DIR / "tmdb_5000_movies.csv"
CREDITS_FILE = DATASET_DIR / "tmdb_5000_credits.csv"


# ============================================================
# LOAD DATASET
# ============================================================

print("Loading movie dataset...")

movies = pd.read_csv(MOVIES_FILE)
credits = pd.read_csv(CREDITS_FILE)

# Rename movie_id in credits so it matches movies.id
credits = credits.rename(columns={"movie_id": "id"})

# Merge movie and credit information
movies = movies.merge(
    credits[["id", "cast", "crew"]],
    on="id",
    how="left"
)

print(f"Loaded {len(movies)} movies")


# ============================================================
# DATA PARSING FUNCTIONS
# ============================================================

def parse_list(value):
    """
    Convert TMDB stringified list data into a Python list.
    """
    try:
        if pd.isna(value):
            return []

        return ast.literal_eval(value)

    except (ValueError, SyntaxError, TypeError):
        return []


def get_genres(value):
    """
    Extract genre names.
    """
    return [
        item.get("name", "")
        for item in parse_list(value)
        if isinstance(item, dict)
    ]


def get_keywords(value):
    """
    Extract keyword names.
    """
    return [
        item.get("name", "")
        for item in parse_list(value)
        if isinstance(item, dict)
    ]


def get_cast(value):
    """
    Extract the first three cast members.
    """
    cast = parse_list(value)

    return [
        item.get("name", "")
        for item in cast[:3]
        if isinstance(item, dict)
    ]


def get_director(value):
    """
    Extract the director from crew information.
    """
    crew = parse_list(value)

    for person in crew:

        if (
            isinstance(person, dict)
            and person.get("job") == "Director"
        ):
            return person.get("name", "")

    return ""


def clean_text(value):
    """
    Normalize text for TF-IDF processing.
    """
    if pd.isna(value):
        return ""

    return str(value).replace(" ", "").lower()


# ============================================================
# FEATURE ENGINEERING
# ============================================================

print("Preparing movie features...")

movies["genres_list"] = movies["genres"].apply(get_genres)

movies["keywords_list"] = movies["keywords"].apply(get_keywords)

movies["cast_list"] = movies["cast"].apply(get_cast)

movies["director"] = movies["crew"].apply(get_director)

movies["overview_clean"] = movies["overview"].fillna("")


# Combine important movie information into one field
movies["tags"] = (
    movies["overview_clean"]
    + " "
    + movies["genres_list"].apply(lambda x: " ".join(x))
    + " "
    + movies["keywords_list"].apply(lambda x: " ".join(x))
    + " "
    + movies["cast_list"].apply(lambda x: " ".join(x))
    + " "
    + movies["director"]
)

movies["tags"] = movies["tags"].apply(clean_text)


# ============================================================
# TF-IDF MODEL
# ============================================================

print("Building TF-IDF recommendation model...")

tfidf = TfidfVectorizer(
    stop_words="english"
)

tfidf_matrix = tfidf.fit_transform(
    movies["tags"]
)

print(
    f"TF-IDF matrix created: "
    f"{tfidf_matrix.shape[0]} movies × "
    f"{tfidf_matrix.shape[1]} features"
)


# ============================================================
# COSINE SIMILARITY
# ============================================================

print("Calculating cosine similarity...")

cosine_similarity = linear_kernel(
    tfidf_matrix,
    tfidf_matrix
)

print("Recommendation model ready!")


# ============================================================
# MOOD → GENRE MAPPING
# ============================================================

MOOD_MAPPING = {

    "happy": "Comedy",

    "sad": "Drama",

    "romantic": "Romance",

    "adventurous": "Adventure",

    "thrilled": "Action",

    "scared": "Horror",

    "mindblown": "Science Fiction",

}


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="CineMind Movie Recommendation API",

    description=(
        "Content-based movie recommendation system "
        "using TF-IDF and Cosine Similarity."
    ),

    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ============================================================
# REQUEST MODEL
# ============================================================

class RecommendationRequest(BaseModel):

    movie_title: str | None = None

    mood: str | None = None

    max_runtime: int | None = None

    language: str | None = "en"

    top_n: int = 5


# ============================================================
# FORMAT MOVIE RESPONSE
# ============================================================

def format_movies(recommendations):

    results = []

    for movie, score in recommendations:

        genres = movie.get(
            "genres_list",
            []
        )

        poster_path = movie.get(
            "poster_path"
        )

        # Build TMDB poster URL
        if pd.notna(poster_path) and poster_path:

            poster_url = (
                "https://image.tmdb.org/t/p/w500"
                + str(poster_path)
            )

        else:

            poster_url = None


        # Runtime
        runtime = movie.get("runtime", 0)

        if pd.isna(runtime):

            runtime = 0

        runtime = int(runtime)


        # Rating
        rating = movie.get(
            "vote_average",
            0
        )

        if pd.isna(rating):

            rating = 0

        rating = float(rating)


        # Popularity
        popularity = movie.get(
            "popularity",
            0
        )

        if pd.isna(popularity):

            popularity = 0

        popularity = float(popularity)


        # Overview
        overview = movie.get(
            "overview",
            ""
        )

        if pd.isna(overview):

            overview = ""


        results.append({

            "id": int(movie["id"]),

            "title": str(
                movie["title"]
            ),

            "overview": str(
                overview
            ),

            "genres": genres,

            "runtime": runtime,

            "language": str(
                movie.get(
                    "original_language",
                    ""
                )
            ),

            "rating": round(
                rating,
                1
            ),

            "popularity": popularity,

            "poster_path": poster_url,

            "similarity_score": round(
                float(score),
                4
            ),

        })

    return results


# ============================================================
# RECOMMENDATION ENGINE
# ============================================================

def recommend_movies(
    movie_title=None,
    mood=None,
    max_runtime=None,
    language="en",
    top_n=5
):

    # --------------------------------------------------------
    # Validate top_n
    # --------------------------------------------------------

    top_n = max(
        1,
        min(top_n, 20)
    )


    # --------------------------------------------------------
    # Start with complete dataset
    # --------------------------------------------------------

    filtered = movies.copy()


    # --------------------------------------------------------
    # LANGUAGE FILTER
    # --------------------------------------------------------

    if language:

        language = language.strip().lower()

        filtered = filtered[
            filtered[
                "original_language"
            ]
            .fillna("")
            .str.lower()
            == language
        ]


    # --------------------------------------------------------
    # RUNTIME FILTER
    # --------------------------------------------------------

    if max_runtime:

        filtered = filtered[
            filtered[
                "runtime"
            ]
            .fillna(0)
            <= max_runtime
        ]


    # --------------------------------------------------------
    # MOOD FILTER
    # --------------------------------------------------------

    if mood:

        mood_key = mood.strip().lower()

        genre = MOOD_MAPPING.get(
            mood_key,
            mood
        )

        genre = genre.lower()

        filtered = filtered[
            filtered["genres_list"].apply(

                lambda genres:

                any(
                    genre in g.lower()
                    for g in genres
                )

            )
        ]


    # --------------------------------------------------------
    # MOVIE-BASED RECOMMENDATION
    # --------------------------------------------------------

    if movie_title:

        movie_title_clean = (
            movie_title
            .strip()
            .lower()
        )

        matches = movies[
            movies["title"]
            .fillna("")
            .str.lower()
            == movie_title_clean
        ]


        # If exact title isn't found,
        # try partial matching.
        if len(matches) == 0:

            matches = movies[
                movies["title"]
                .fillna("")
                .str.lower()
                .str.contains(
                    movie_title_clean,
                    na=False
                )
            ]


        if len(matches) > 0:

            movie_index = matches.index[0]


            # Get similarity scores
            similarity_scores = list(
                enumerate(
                    cosine_similarity[
                        movie_index
                    ]
                )
            )


            # Sort highest similarity first
            similarity_scores.sort(
                key=lambda x: x[1],
                reverse=True
            )


            recommendations = []


            for index, score in similarity_scores:

                # Don't recommend the selected movie itself
                if index == movie_index:
                    continue


                # Only include movies
                # passing the filters
                if index not in filtered.index:
                    continue


                movie = movies.loc[index]


                recommendations.append(
                    (
                        movie,
                        score
                    )
                )


                if len(recommendations) >= top_n:

                    break


            return format_movies(
                recommendations
            )


    # --------------------------------------------------------
    # FALLBACK RECOMMENDATIONS
    # --------------------------------------------------------

    # If no movie was selected/found,
    # recommend highly rated popular movies.

    filtered = filtered.sort_values(

        by=[
            "vote_average",
            "popularity"
        ],

        ascending=False
    )


    recommendations = [

        (
            movie,
            0.0
        )

        for _, movie
        in filtered.head(top_n).iterrows()

    ]


    return format_movies(
        recommendations
    )


# ============================================================
# API ROUTES
# ============================================================


@app.get("/")
def home():

    return {

        "message":
            "CineMind Movie Recommendation API is running",

        "movies_loaded":
            len(movies),

        "model":
            "TF-IDF + Cosine Similarity",

        "status":
            "ready"

    }


# ============================================================
# RECOMMENDATION API
# ============================================================

@app.post("/recommend")
def get_recommendations(
    request: RecommendationRequest
):

    recommendations = recommend_movies(

        movie_title=request.movie_title,

        mood=request.mood,

        max_runtime=request.max_runtime,

        language=request.language,

        top_n=request.top_n

    )


    return {

        "success": True,

        "count":
            len(recommendations),

        "filters": {

            "movie_title":
                request.movie_title,

            "mood":
                request.mood,

            "max_runtime":
                request.max_runtime,

            "language":
                request.language,

        },

        "recommendations":
            recommendations

    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health_check():

    return {

        "status": "healthy",

        "movies_loaded":
            len(movies),

        "model":
            "TF-IDF + Cosine Similarity"

    }