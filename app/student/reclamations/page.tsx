import { fetchStudentReclamations } from "@/lib/data-simulation";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";

export default async function HistoryPage() {
  // This call will now trigger the 'loading.tsx' in this folder
  const myReclamations = await fetchStudentReclamations();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
          Historique des Demandes
        </h2>
        <p className="text-gray-500">
          Consultez l'état de vos recours académiques.
        </p>
      </div>

      <div className="grid gap-4">
        {myReclamations.map((rec) => (
          <Link
            key={rec.id}
            href={`/student/reclamations/${rec.id}`}
            className="group"
          >
            <div className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center justify-between hover:border-blue-500 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${rec.status === "RESOLVED" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                >
                  {rec.status === "RESOLVED" ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 group-hover:text-blue-600">
                    {rec.subject}
                  </h4>
                  <p className="text-xs text-gray-400">
                    ID: {rec.id.slice(0, 8)}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
