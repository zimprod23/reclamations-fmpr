import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  Clock,
  Info,
} from "lucide-react";
import { getReclamationById } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function ReclamationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;
  const reclamation = await getReclamationById(id, session.user.id);

  if (!reclamation) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 px-4">
      {/* NAVIGATION */}
      <Link
        href="/student/reclamations"
        className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all"
      >
        <ArrowLeft size={14} /> Retour à l'historique
      </Link>

      {/* STUDENT REQUEST CARD */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-blue-900/5 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-white bg-blue-600 px-3 py-1 rounded-lg">
                Détails de la Demande
              </span>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-2">
                ID: #{reclamation.id.slice(-10).toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Date de dépôt
              </p>
              <p className="font-bold text-gray-900 italic">
                {format(new Date(reclamation.createdAt), "dd MMMM yyyy", {
                  locale: fr,
                })}
              </p>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 italic uppercase tracking-tighter leading-none">
            {reclamation.subject}
          </h1>

          <div className="bg-gray-50 rounded-3xl p-6 md:p-8 relative">
            <Info className="absolute top-6 right-6 text-gray-200" size={40} />
            <p className="text-gray-600 text-lg leading-relaxed font-medium relative z-10">
              {reclamation.description}
            </p>
          </div>
        </div>
      </div>

      {/* ADMIN RESPONSE SECTION */}
      {reclamation.status === "RESOLVED" ? (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 p-2 rounded-xl">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                Décision Administrative
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-bold leading-tight text-blue-50">
                {reclamation.adminResponse ||
                  "Votre demande a été traitée avec succès par nos services."}
              </p>
              <div className="h-1 w-20 bg-blue-500 rounded-full" />
            </div>
          </div>

          {/* Decorative Icon */}
          <CheckCircle2 className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform duration-700" />
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-amber-200 rounded-[2.5rem] p-12 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-amber-500 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-xl font-black text-amber-800 uppercase italic tracking-tight">
              Traitement en cours
            </h3>
            <p className="text-amber-600 font-medium max-w-xs mx-auto mt-2">
              L'administration examine actuellement votre dossier. Vous recevrez
              une notification une fois la décision prise.
            </p>
          </div>
        </div>
      )}

      {/* FOOTER LOGO */}
      <div className="pt-10 text-center opacity-20 grayscale">
        <p className="text-[10px] font-black tracking-[1em] uppercase">
          FMPR Digital
        </p>
      </div>
    </div>
  );
}
