"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-black text-white min-h-screen flex items-center justify-center font-sans">
        <div className="text-center px-6">
          <h1 className="text-6xl font-bold mb-4">500</h1>
          <h2 className="text-2xl mb-6">Critical System Error</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            A critical error occurred that prevented the application from loading.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
