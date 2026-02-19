// app/(admin)/admin/manage/[id]/not-found.tsx
import Link from "next/link";
import { Frown, ArrowLeft } from "lucide-react";

// MUST be 'export default'
export default function NotFound() {
  return (
    <main className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <div className="bg-gray-100 p-4 rounded-full">
        <Frown className="w-12 h-12 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">404 Introuvable</h2>
        <p className="text-gray-500 max-w-[300px]">
          Désolé, nous n'avons pas pu trouver la réclamation que vous
          recherchez.
        </p>
      </div>
      <Link
        href="/admin/manage"
        className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la liste
      </Link>
    </main>
  );
}
