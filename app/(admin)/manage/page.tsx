import { reclamations, users } from "@/lib/placeholder-data";
import ArchivePanel from "@/ui/admin/archieve-panel";
import { Search, Eye, Filter } from "lucide-react";
import Link from "next/link";

export default function ManagePage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestion des Réclamations
        </h1>
        <div className="flex gap-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {reclamations.length} Total
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher par CNE, Apogée ou Nom..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filtrer
        </button>
      </div>

      {/* Demands Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Étudiant
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Sujet
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Date
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Statut
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reclamations.map((rec) => {
              const student = users.find((u) => u.id === rec.studentId);

              return (
                <tr
                  key={rec.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {student?.name}
                    </div>
                    <div className="text-xs text-gray-500 flex gap-2 mt-1">
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded">
                        CNE: {student?.cne}
                      </span>
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded">
                        Apogée: {student?.apogeeCode}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-700 max-w-[200px] truncate">
                    {rec.subject}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(rec.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={rec.status} />
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/manage/${rec.id}`} // This points to your new dynamic route
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Détails
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pt-8 border-t border-gray-100">
          <ArchivePanel />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    RESOLVED: "bg-emerald-100 text-emerald-700",
    REJECTED: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.PENDING}`}
    >
      {status}
    </span>
  );
}
