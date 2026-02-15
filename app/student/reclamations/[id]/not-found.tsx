import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="bg-gray-50 p-6 rounded-full mb-6">
        <SearchX className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">
        Réclamation introuvable
      </h2>
      <p className="text-gray-500 mt-2 max-w-sm">
        Cette demande n'existe pas ou a peut-être été archivée par le service de
        scolarité.
      </p>
      <Link
        href="/student/reclamations"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
      >
        Retour à mes demandes
      </Link>
    </div>
  );
}
