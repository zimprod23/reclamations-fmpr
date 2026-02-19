import { getFilteredReclamations } from "@/lib/data";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Phone,
  Tag,
  FileText,
  Calendar,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Status } from "@prisma/client";
import Search from "@/ui/admin/search";

export default async function ManagePage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const query = (await searchParams)?.query || "";
  const currentPage = Number((await searchParams)?.page) || 1;

  const { reclamations, totalPages, totalCount } =
    await getFilteredReclamations(query, currentPage);

  return (
    <div className="w-full pb-20 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">
            Gestion des <span className="text-blue-600">Réclamations</span>
          </h1>
          <p className="text-gray-400 text-xs font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-blue-600" />
            Portail Administratif FMP
          </p>
        </div>

        <div className="bg-white border-2 border-gray-100 p-4 rounded-[2rem] flex items-center gap-4 shadow-sm">
          <div className="bg-blue-600 p-2 rounded-xl">
            <FileText className="text-white w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase leading-none">
              Total Demandes
            </p>
            <p className="text-xl font-black text-gray-900 leading-tight">
              {totalCount}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <Search />
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Étudiant
                </th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Détails de la demande
                </th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">
                  Contact
                </th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Statut & Date
                </th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reclamations.length > 0 ? (
                reclamations.map((rec) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-blue-50/20 transition-all group"
                  >
                    {/* Student Info */}
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-black text-gray-900 italic uppercase text-sm">
                            {rec.student.name}
                          </div>
                          <div className="text-[10px] font-bold text-gray-400 mt-0.5">
                            CNE:{" "}
                            <span className="text-blue-600">
                              {rec.student.cne}
                            </span>{" "}
                            | APOGÉE: {rec.student.apogeeCode}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Request Details */}
                    <td className="p-6">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Tag className="w-3 h-3 text-blue-500" />
                        <span className="text-[10px] font-black text-blue-600 uppercase italic tracking-tighter bg-blue-50 px-2 py-0.5 rounded">
                          {rec.type.replace(/_/g, " ")}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-gray-700 max-w-[280px] truncate group-hover:text-blue-900 transition-colors">
                        {rec.subject || "Aucun sujet spécifié"}
                      </div>
                    </td>

                    {/* Contact Info (Desktop Only) */}
                    <td className="p-6 hidden lg:table-cell">
                      <div className="flex items-center gap-2 text-gray-500 font-bold text-xs">
                        <Phone className="w-3.5 h-3.5 text-gray-300" />
                        {rec?.phone || "Non renseigné"}
                      </div>
                    </td>

                    {/* Status & Date */}
                    <td className="p-6">
                      <StatusBadge status={rec.status} />
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase mt-2.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(rec.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-6 text-right">
                      <Link
                        href={`/admin/manage/${rec.id}`}
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-gray-900 text-white hover:bg-blue-600 transition-all shadow-lg shadow-gray-200 active:scale-95"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        <span className="text-[10px] font-black uppercase italic">
                          Détails
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <p className="text-gray-400 font-black uppercase italic tracking-widest text-sm">
                      Aucune réclamation trouvée
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-8 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Affichage de la page{" "}
            <span className="text-gray-900">{currentPage}</span> sur{" "}
            <span className="text-gray-900">{totalPages}</span>
          </p>
          <div className="flex items-center gap-3">
            <PaginationButton
              href={`?page=${currentPage - 1}&query=${query}`}
              disabled={currentPage <= 1}
              icon={<ChevronLeft className="w-5 h-5" />}
            />
            <PaginationButton
              href={`?page=${currentPage + 1}&query=${query}`}
              disabled={currentPage >= totalPages}
              icon={<ChevronRight className="w-5 h-5" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
    RESOLVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${styles[status]}`}
    >
      {status === "IN_PROGRESS"
        ? "EN COURS"
        : status === "PENDING"
          ? "ATTENTE"
          : status}
    </span>
  );
}

function PaginationButton({
  href,
  disabled,
  icon,
}: {
  href: string;
  disabled: boolean;
  icon: React.ReactNode;
}) {
  if (disabled)
    return (
      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-200 cursor-not-allowed shadow-sm">
        {icon}
      </div>
    );
  return (
    <Link
      href={href}
      className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-900 hover:border-blue-500 hover:text-blue-600 hover:shadow-xl hover:shadow-blue-50 transition-all shadow-sm active:scale-90"
    >
      {icon}
    </Link>
  );
}
