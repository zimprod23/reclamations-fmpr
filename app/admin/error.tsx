"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="bg-rose-50 p-4 rounded-full mb-6">
        <AlertCircle className="w-12 h-12 text-rose-600" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter mb-2">
        Une erreur est survenue
      </h2>
      <p className="text-gray-500 text-sm max-w-md mb-8">
        Nous n'avons pas pu charger les données. Cela peut être dû à un problème
        de connexion ou à une maintenance de la base de données.
      </p>
      <button
        onClick={() => reset()} // Attempts to re-render the segment
        className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-black uppercase italic text-xs hover:bg-blue-600 transition-all shadow-xl active:scale-95"
      >
        <RefreshCcw className="w-4 h-4" />
        Réessayer
      </button>
    </div>
  );
}
