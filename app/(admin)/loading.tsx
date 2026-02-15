// app/(admin)/admin/loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-4">
      {/* Spinner and pulse effect */}
      <div className="relative flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <div className="absolute h-16 w-16 rounded-full border-4 border-blue-100 border-t-transparent animate-pulse" />
      </div>

      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-gray-700">
          Chargement de l'espace Faculté...
        </p>
        <p className="text-xs text-gray-400">
          Préparation de vos données en cours
        </p>
      </div>
    </div>
  );
}
