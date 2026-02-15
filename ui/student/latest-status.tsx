// This component is the only one that "waits"
import { fetchLatestReclamation } from "@/lib/data-simulation";
import { Activity, PlusCircle } from "lucide-react";
import Link from "next/link";

export async function LatestStatusWrapper() {
  const latest = await fetchLatestReclamation();

  if (!latest) {
    return (
      <section className="bg-white border border-dashed border-gray-200 rounded-3xl p-10 text-center space-y-4">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <Activity className="w-8 h-8 text-gray-300" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Aucune demande en cours
          </h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1">
            Toutes vos demandes apparaîtront ici pour un suivi en temps réel.
          </p>
        </div>
        <Link
          href="/student/new"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Soumettre votre première réclamation{" "}
          <PlusCircle className="w-4 h-4" />
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          État de votre dernière demande
        </h2>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">
              {latest.subject}
            </h3>
            <p className="text-gray-500 text-sm italic">Soumis récemment</p>
          </div>

          <div className="px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl text-amber-700 font-bold text-sm uppercase tracking-tight">
            {latest.status.replace("_", " ")}
          </div>
        </div>

        {/* Progress Line */}
        <div className="mt-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2" />
          <div
            className={`absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 transition-all ${latest.status === "RESOLVED" ? "w-full" : "w-1/2"}`}
          />

          <div className="relative flex justify-between">
            {["Envoyé", "Vérification", "Réponse"].map((label, i) => {
              const isActive =
                i === 0 ||
                (i === 1 && latest.status !== "PENDING") ||
                (i === 2 && latest.status === "RESOLVED");
              return (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-4 border-white shadow-sm ${isActive ? "bg-blue-600" : "bg-gray-200"} z-10`}
                  />
                  <span
                    className={`text-[10px] mt-2 font-black uppercase tracking-wider ${isActive ? "text-blue-600" : "text-gray-400"}`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
