import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageSquare, CheckCircle2, Clock } from "lucide-react";
import { fetchReclamationById } from "@/lib/data-simulation";
// import { getReclamationById } from '@/lib/data'; // You'll create this later

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await the params (Next.js 15 Requirement)
  const { id } = await params;

  const reclamation = await fetchReclamationById(id); // Simulate a missing record for testing not-found

  if (!reclamation) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <Link
        href="/student/reclamations"
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Retour à l'historique
      </Link>

      {/* Student's Original Request */}
      <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Ma Demande
          </span>
          <span className="text-xs text-gray-400 font-medium">
            ID: #{id.slice(0, 8)}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {reclamation.subject}
        </h1>
        <p className="text-gray-600 leading-relaxed italic border-l-4 border-gray-100 pl-4">
          "{reclamation.description}"
        </p>
      </div>

      {/* Admin Response Section */}
      {reclamation.status === "RESOLVED" ? (
        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-200" />
              <span className="text-sm font-bold uppercase tracking-wider text-blue-100">
                Réponse de l'Administration
              </span>
            </div>
            <p className="text-lg font-medium leading-relaxed">
              {reclamation.adminResponse ||
                "Aucun commentaire supplémentaire n'a été fourni."}
            </p>
          </div>
          <CheckCircle2 className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10" />
        </div>
      ) : (
        <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-3xl p-10 flex flex-col items-center text-center">
          <Clock className="w-10 h-10 text-amber-400 mb-4 animate-pulse" />
          <p className="text-amber-800 font-bold">Demande en cours d'examen</p>
          <p className="text-amber-600 text-sm mt-1">
            L'administration n'a pas encore rendu de décision finale.
          </p>
        </div>
      )}
    </div>
  );
}
