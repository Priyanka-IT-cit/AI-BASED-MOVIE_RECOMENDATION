import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-[#7c3aed] text-white shadow-2xl shadow-purple-950/60 border border-purple-400/30 backdrop-blur-xl animate-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-200 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-sky-200 shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-200 shrink-0" />
          )}
          <span className="text-sm font-medium tracking-wide">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="ml-2 text-white/70 hover:text-white transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
