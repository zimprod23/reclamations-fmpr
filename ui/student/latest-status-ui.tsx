"use client";

import { Activity, PlusCircle, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Define the type based on your Prisma model to fix "Property does not exist"
interface Reclamation {
  id: string;
  subject: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";
  createdAt: Date;
  type: string; // Adjusted based on your error log
}

interface LatestStatusProps {
  latest: Reclamation | null;
}

export default function LatestStatus({ latest }: LatestStatusProps) {
  // 1. Handling the "Null" state safely (Fixes 'latest is possibly null' errors)
  if (!latest) {
    return (
      <section className="bg-white border-2 border-dashed border-gray-100 rounded-[2rem] p-8 md:p-12 text-center space-y-5">
        <div className="bg-blue-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto">
          <Activity className="w-8 h-8 text-blue-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">
            Aucune demande en cours
          </h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Vous n'avez pas de réclamation active pour le moment.
          </p>
        </div>
        <Link
          href="/student/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          Nouvelle demande <PlusCircle className="w-4 h-4" />
        </Link>
      </section>
    );
  }

  // 2. Status Mapping for the Progress Bar
  const statusMap = {
    PENDING: 0,
    IN_PROGRESS: 1,
    RESOLVED: 2,
    REJECTED: 2,
  };

  const currentStep = statusMap[latest.status] ?? 0;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2 italic">
          <Activity className="w-5 h-5 text-blue-600" />
          Suivi en temps réel
        </h2>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-blue-900/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {latest.type}
            </div>
            <h3 className="text-2xl font-black text-gray-900 leading-tight italic uppercase">
              {latest.subject}
            </h3>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <Clock size={14} />
              <span>
                Soumis le{" "}
                {format(new Date(latest.createdAt), "PPP", { locale: fr })}
              </span>
            </div>
          </div>

          <div
            className={`self-start md:self-center px-5 py-2 rounded-2xl font-black text-xs uppercase tracking-widest border-2 ${
              latest.status === "RESOLVED"
                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                : latest.status === "PENDING"
                  ? "bg-amber-50 text-amber-700 border-amber-100"
                  : "bg-blue-50 text-blue-700 border-blue-100"
            }`}
          >
            {latest.status.replace("_", " ")}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mt-12 relative px-2">
          {/* Base Line */}
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-100 -translate-y-1/2 rounded-full" />

          {/* Animated Progress Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 2) * 100}%` }}
            transition={{ duration: 1, ease: "circOut" }}
            className="absolute top-1/2 left-0 h-1.5 bg-blue-600 -translate-y-1/2 rounded-full"
          />

          <div className="relative flex justify-between">
            {["Envoyé", "Traitement", "Terminé"].map((label, i) => {
              const isPassed = i <= currentStep;
              return (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-4 border-white shadow-md transition-colors duration-500 ${
                      isPassed ? "bg-blue-600" : "bg-gray-200"
                    } z-10`}
                  />
                  <span
                    className={`text-[10px] mt-4 font-black uppercase tracking-[0.2em] ${
                      isPassed ? "text-blue-600" : "text-gray-400"
                    }`}
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
