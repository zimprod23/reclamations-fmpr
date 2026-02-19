import { getReclamationByIdForAdmin } from "@/lib/data";
import { updateReclamationStatus } from "@/lib/actions/reclamations";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  User,
  FileText,
  GraduationCap,
  CreditCard,
  Phone,
  History,
  MessageSquare,
  Fingerprint,
  Calendar,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Status } from "@prisma/client";
import ActionButtons from "@/ui/admin/action-button";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reclamation = await getReclamationByIdForAdmin(id);

  if (!reclamation) notFound();
  const student = reclamation.student;

  return (
    <div className="w-full space-y-8 pb-20 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <Link
            href="/admin/manage"
            className="group flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-blue-600 transition-all mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour au Dashboard
          </Link>
          <h1 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">
            Dossier <span className="text-blue-600">Académique</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-[1.5rem] shadow-sm border border-gray-100">
          <StatusBadge status={reclamation.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR: STUDENT PROFILE */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden">
            <div className="bg-gray-900 p-8 text-white relative">
              <div className="absolute top-4 right-4 opacity-20">
                <Fingerprint size={48} />
              </div>
              <h2 className="text-2xl font-black italic uppercase leading-tight mb-1">
                {student.name}
              </h2>
              <p className="text-blue-400 text-xs font-bold font-mono">
                {student.email}
              </p>
            </div>

            <div className="p-8 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <DossierItem
                  label="Apogée"
                  value={student.apogeeCode}
                  icon={<GraduationCap size={16} />}
                />
                <DossierItem
                  label="CNE"
                  value={student.cne}
                  icon={<CreditCard size={16} />}
                />
                <DossierItem
                  label="CIN"
                  value={student.cin}
                  icon={<Fingerprint size={16} />}
                />
                <DossierItem
                  label="Contact Officiel"
                  value={student.phone}
                  icon={<User size={16} />}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    Total Demandes
                  </p>
                  <p className="text-4xl font-black text-gray-900 italic">
                    {student._count.demands}
                  </p>
                </div>
                {student.studentCard && (
                  <Link
                    href={student.studentCard}
                    target="_blank"
                    className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-50"
                  >
                    <FileText size={20} />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* History Sidebar with Status Coloring */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2 italic">
              <History size={16} className="text-blue-600" /> Historique récent
            </h3>
            <div className="space-y-4">
              {student.demands.map((d) => (
                <Link
                  key={d.id}
                  href={`/admin/manage/${d.id}`}
                  className={`group block p-4 rounded-2xl transition-all border ${
                    d.id === id
                      ? "bg-blue-50 border-blue-200 shadow-inner"
                      : getHistoryStyle(d.status)
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </p>
                    <span className="text-[8px] font-bold opacity-70 uppercase tracking-tighter">
                      {d.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 truncate italic uppercase tracking-tighter">
                    {d.subject || d.type}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="lg:col-span-8 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] italic">
                    Catégorie: {reclamation.type.replace(/_/g, " ")}
                  </span>
                  <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter leading-none">
                    {reclamation.subject}
                  </h2>
                </div>
              </div>

              {/* Specific phone cited in the reclamation */}
              {reclamation.phone && (
                <div className="flex items-center gap-3 px-5 py-3 bg-amber-50 border border-amber-100 rounded-2xl">
                  <AlertCircle className="text-amber-600" size={18} />
                  <div>
                    <p className="text-[8px] font-black text-amber-600 uppercase">
                      Tel. Concerné
                    </p>
                    <p className="text-xs font-bold text-amber-900 font-mono">
                      {reclamation.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-100 min-h-[200px]">
              <p className="text-gray-700 text-xl font-medium leading-relaxed whitespace-pre-wrap italic">
                "{reclamation.description}"
              </p>
            </div>
          </div>

          {/* Response Area */}
          <div
            className={`bg-white p-10 rounded-[3rem] border-2 shadow-2xl transition-all duration-700 ${
              reclamation.status === "RESOLVED"
                ? "border-emerald-100 shadow-emerald-900/5"
                : reclamation.status === "REJECTED"
                  ? "border-rose-100 shadow-rose-900/5"
                  : "border-blue-50 shadow-blue-900/10"
            }`}
          >
            <h2 className="text-2xl font-black text-gray-900 italic uppercase tracking-tighter mb-8 leading-none">
              Réponse Officielle
            </h2>

            <form
              action={async (formData) => {
                "use server";
                await updateReclamationStatus(reclamation.id, formData);
              }}
              className="space-y-8"
            >
              <div className="relative group">
                <textarea
                  name="response"
                  defaultValue={reclamation.adminResponse || ""}
                  required
                  className="w-full p-10 bg-gray-50/50 border-2 border-gray-100 rounded-[3rem] focus:ring-[1rem] focus:ring-blue-50 focus:border-blue-600 focus:bg-white outline-none min-h-[350px] text-xl font-medium transition-all shadow-inner"
                  placeholder="Tapez la décision finale ici..."
                />
                <div className="absolute bottom-8 right-10 flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase italic">
                  <Fingerprint size={12} /> Signé Admin FMPR
                </div>
              </div>

              <ActionButtons isUpdate={reclamation.status !== "PENDING"} />
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

// LOCAL HELPERS
function DossierItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | null;
  icon: any;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-50 rounded-2xl hover:border-blue-100 transition-all">
      <div className="text-gray-300 bg-gray-50 p-2.5 rounded-xl">{icon}</div>
      <div>
        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
          {label}
        </p>
        <p className="text-[13px] font-bold text-gray-900 font-mono">
          {value || "---"}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
    RESOLVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
  };
  return (
    <div
      className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase italic border ${styles[status]} flex items-center gap-2`}
    >
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      {status}
    </div>
  );
}

function getHistoryStyle(status: Status) {
  switch (status) {
    case "RESOLVED":
      return "bg-emerald-50/30 border-emerald-100 hover:bg-emerald-50/50";
    case "REJECTED":
      return "bg-rose-50/30 border-rose-100 hover:bg-rose-50/50";
    case "PENDING":
      return "bg-amber-50/30 border-amber-100 hover:bg-amber-50/50";
    default:
      return "bg-white border-transparent hover:bg-gray-50";
  }
}
