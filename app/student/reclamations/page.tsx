import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { getStudentReclamations } from "@/lib/data";
import DeleteReclamationButton from "@/ui/student/delete-button";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;

  const myReclamations = await getStudentReclamations(userId);

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4 sm:px-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 mt-6">
        <div className="space-y-4">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm shadow-blue-100"
          >
            <ArrowLeft size={14} /> Retour au Dashboard
          </Link>

          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic uppercase">
              Historique <span className="text-blue-600">Complet</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
              Suivi de vos {myReclamations.length} demandes
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="hidden md:flex gap-4">
          <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm min-w-[120px]">
            <p className="text-[10px] font-black text-gray-400 uppercase">
              En attente
            </p>
            <p className="text-xl font-black text-amber-500">
              {myReclamations.filter((r) => r.status === "PENDING").length}
            </p>
          </div>
          <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm min-w-[120px]">
            <p className="text-[10px] font-black text-gray-400 uppercase">
              Traitées
            </p>
            <p className="text-xl font-black text-emerald-500">
              {myReclamations.filter((r) => r.status === "RESOLVED").length}
            </p>
          </div>
        </div>
      </div>

      {/* LIST SECTION */}
      <div className="grid gap-4">
        {myReclamations.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-[3rem] p-20 text-center space-y-4">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Search size={32} />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              Aucune demande trouvée
            </p>
          </div>
        ) : (
          myReclamations.map((rec) => (
            <div key={rec.id} className="relative group">
              <Link href={`/student/reclamations/${rec.id}`} className="block">
                <div className="bg-white border border-gray-100 p-5 md:p-8 rounded-[2rem] flex items-center justify-between gap-6 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 relative overflow-hidden">
                  {/* Status Side Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all group-hover:w-2 ${
                      rec.status === "RESOLVED"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />

                  <div className="flex items-center gap-4 md:gap-6">
                    <div
                      className={`p-4 rounded-2xl shrink-0 transition-transform ${
                        rec.status === "RESOLVED"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {rec.status === "RESOLVED" ? (
                        <CheckCircle size={24} />
                      ) : (
                        <Clock size={24} />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                          {rec.type.replace("_", " ")}
                        </span>
                        <span className="hidden sm:inline text-[9px] font-bold text-gray-300">
                          #{rec.id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-black text-base md:text-xl text-gray-900 uppercase italic tracking-tight group-hover:text-blue-600 transition-colors">
                        {rec.subject}
                      </h4>
                      <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-widest">
                        {format(new Date(rec.createdAt), "d MMMM yyyy", {
                          locale: fr,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE ACTIONS */}
                  <div className="flex items-center gap-3 md:gap-6">
                    <div
                      className={`hidden md:block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                        rec.status === "RESOLVED"
                          ? "border-emerald-100 text-emerald-600 bg-emerald-50"
                          : "border-amber-100 text-amber-600 bg-amber-50"
                      }`}
                    >
                      {rec.status}
                    </div>

                    {/* Placeholder div to create space for the absolute delete button */}
                    {rec.status === "PENDING" && <div className="w-10 h-10" />}

                    <div className="bg-gray-50 p-2 rounded-full text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>

              {/* DELETE BUTTON: Perfectly Centered Vertically */}
              {rec.status === "PENDING" && (
                <div className="absolute right-14 md:right-24 top-1/2 -translate-y-1/2 z-30">
                  <DeleteReclamationButton id={rec.id} studentId={userId} />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-16 text-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">
          FMPR • Service de Support
        </p>
      </div>
    </div>
  );
}
