import pandas as pd
import numpy as np
import ast
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# ---------------------------------------------------------
# Step 1: Load TMDB 5000 Dataset
# ---------------------------------------------------------
print("Loading TMDB 5000 Dataset...")

movies_df = pd.read_csv("dataset/tmdb_5000_movies.csv")
credits_df = pd.read_csv("dataset/tmdb_5000_credits.csv")

print(f"Movies Dataset Loaded Successfully!")
print(f"Total Movies : {len(movies_df)}")

# ---------------------------------------------------------
# Step 2: Merge Movies & Credits Dataset
# ---------------------------------------------------------

movies_df = movies_df.merge(credits_df, on="title")

# ---------------------------------------------------------
# Step 3: Helper Functions
# ---------------------------------------------------------

def convert(obj):
    L = []
    if pd.isna(obj):
        return L
    for i in ast.literal_eval(obj):
        L.append(i["name"])
    return L


def get_top_cast(obj):
    L = []
    if pd.isna(obj):
        return L

    count = 0

    for i in ast.literal_eval(obj):
        if count != 3:
            L.append(i["name"])
            count += 1
        else:
            break
    return L


def fetch_director(obj):
    L = []

    if pd.isna(obj):
        return L

    for i in ast.literal_eval(obj):
        if i["job"] == "Director":
            L.append(i["name"])
            break

    return L


# ---------------------------------------------------------
# Step 4: Data Cleaning
# ---------------------------------------------------------

movies_df["genres"] = movies_df["genres"].apply(convert)
movies_df["keywords"] = movies_df["keywords"].apply(convert)
movies_df["cast"] = movies_df["cast"].apply(get_top_cast)
movies_df["crew"] = movies_df["crew"].apply(fetch_director)

movies_df["overview"] = movies_df["overview"].fillna("").apply(lambda x: x.split())

# Remove spaces between names

movies_df["genres"] = movies_df["genres"].apply(lambda x: [i.replace(" ", "") for i in x])
movies_df["keywords"] = movies_df["keywords"].apply(lambda x: [i.replace(" ", "") for i in x])
movies_df["cast"] = movies_df["cast"].apply(lambda x: [i.replace(" ", "") for i in x])
movies_df["crew"] = movies_df["crew"].apply(lambda x: [i.replace(" ", "") for i in x])

# ---------------------------------------------------------
# Step 5: Create Combined Features
# ---------------------------------------------------------

movies_df["tags"] = (
    movies_df["overview"]
    + movies_df["genres"]
    + movies_df["keywords"]
    + movies_df["cast"]
    + movies_df["crew"]
)

movies_df["tags"] = movies_df["tags"].apply(lambda x: " ".join(x))

# ---------------------------------------------------------
# Step 6: TF-IDF Vectorization
# ---------------------------------------------------------

print("Creating TF-IDF Matrix...")

tfidf = TfidfVectorizer(stop_words="english")

tfidf_matrix = tfidf.fit_transform(movies_df["tags"])

print("Computing Cosine Similarity...")

cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# ---------------------------------------------------------
# Step 7: Recommendation Function
# ---------------------------------------------------------


def recommend_movies(
    movie_title=None,
    preferred_mood=None,
    max_runtime_mins=None,
    preferred_language="en",
    top_n=5,
):

    filtered_df = movies_df.copy()

    # Language Filter

    if preferred_language:
        filtered_df = filtered_df[
            filtered_df["original_language"] == preferred_language.lower()
        ]

    # Runtime Filter

    if max_runtime_mins:
        filtered_df = filtered_df[
            filtered_df["runtime"] <= max_runtime_mins
        ]

    # Mood Mapping

    mood_map = {
        "happy": "Comedy",
        "sad": "Drama",
        "romantic": "Romance",
        "adventurous": "Adventure",
        "thrilled": "Action",
        "scared": "Horror",
        "mindblown": "ScienceFiction",
    }

    selected_genre = None

    if preferred_mood:
        mood = preferred_mood.lower().strip()

        if mood in mood_map:
            selected_genre = mood_map[mood]
        else:
            selected_genre = preferred_mood.replace(" ", "")

    if selected_genre:
        filtered_df = filtered_df[
            filtered_df["genres"].apply(lambda x: selected_genre in x)
        ]

    if filtered_df.empty:
        print("\nNo movie matches your filters.")
        return

    # Similar Movie Search

    if movie_title and movie_title in movies_df["title"].values:

        idx = movies_df[movies_df["title"] == movie_title].index[0]

        sim_scores = list(enumerate(cosine_sim[idx]))

        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        valid_indices = filtered_df.index

        recommendations = []

        for i in sim_scores:

            if i[0] in valid_indices and i[0] != idx:
                recommendations.append(i[0])

            if len(recommendations) == top_n:
                break

        result = movies_df.iloc[recommendations]

    else:

        result = filtered_df.sort_values(
            by=["vote_average", "popularity"],
            ascending=False,
        ).head(top_n)

    print("\nRecommended Movies")
    print("=" * 60)

    for _, row in result.iterrows():

        print(f"\nTitle      : {row['title']}")
        print(f"Language   : {row['original_language']}")
        print(f"Runtime    : {row['runtime']} mins")
        print(f"Rating     : {row['vote_average']}")
        print(f"Popularity : {row['popularity']}")
        print("-" * 60)


# ---------------------------------------------------------
# Step 8: User Input
# ---------------------------------------------------------

print("\n")
print("=" * 70)
print("        AI MOVIE RECOMMENDATION SYSTEM")
print("=" * 70)

print("\nAvailable Mood Options")
print("happy")
print("sad")
print("romantic")
print("thrilled")
print("adventurous")
print("scared")
print("mindblown")
print("or enter any genre like Action, Animation, Fantasy")

print()

user_movie = input("Enter Base Movie (Press Enter to Skip): ").strip()

user_mood = input("Enter Mood/Genre (Press Enter to Skip): ").strip()

user_time = input("Maximum Runtime in Minutes (Press Enter to Skip): ").strip()

runtime = int(user_time) if user_time.isdigit() else None

recommend_movies(
    movie_title=user_movie if user_movie else None,
    preferred_mood=user_mood if user_mood else None,
    max_runtime_mins=runtime,
    preferred_language="en",
    top_n=5,
)