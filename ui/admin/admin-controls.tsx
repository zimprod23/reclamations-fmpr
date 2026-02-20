"use client";

import {
  Trash2,
  Archive,
  FileDown,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  flushReclamations,
  archiveHandledDemands,
} from "@/lib/actions/reclamations";
import { useState } from "react";

export default function AdminControls() {
  const [loading, setLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const showFeedback = (type: "success" | "error", msg: string) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 4000); // Hide after 4s
  };

  // 1. Logic for Programmatic Excel Download
  const handleExport = async () => {
    setLoading("export");
    showFeedback("success", "Génération du fichier Excel...");

    try {
      const response = await fetch("/api/reclamations");

      if (!response.ok) throw new Error("Export failed");

      // Create a blob from the response
      const blob = await response.blob();

      // Create a temporary link element to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `FMPR_Export_${new Date().toISOString().split("T")[0]}.xlsx`;

      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showFeedback("success", "Téléchargement réussi !");
    } catch (e) {
      console.error(e);
      showFeedback("error", "Erreur lors du téléchargement");
    } finally {
      setLoading(null);
    }
  };

  const handleFlush = async () => {
    if (
      confirm("🚨 ACTION CRITIQUE: Voulez-vous supprimer TOUTES les données ?")
    ) {
      setLoading("flush");
      try {
        await flushReclamations();
        showFeedback("success", "Base de données vidée avec succès");
      } catch (e) {
        showFeedback("error", "Erreur lors de la suppression");
      }
      setLoading(null);
    }
  };

  const handleArchive = async () => {
    setLoading("archive");
    try {
      const result = await archiveHandledDemands();
      showFeedback("success", result.message);
    } catch (e) {
      showFeedback("error", "Erreur d'archivage");
    }
    setLoading(null);
  };

  return (
    <div className="relative bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 shadow-sm overflow-hidden">
      {/* Toast Notification Pop-up */}
      {feedback && (
        <div
          className={`absolute top-0 left-0 right-0 p-3 text-center text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-top duration-300 z-20 ${
            feedback.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-rose-500 text-white"
          }`}
        >
          {feedback.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-8 pt-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-amber-500" size={20} />
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 italic">
            Zone de Maintenance & Archivage
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Archive Action */}
        <button
          onClick={handleArchive}
          disabled={!!loading}
          className="flex items-center justify-between p-5 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-2xl transition-all group disabled:opacity-50"
        >
          <div className="flex items-center gap-3">
            {loading === "archive" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Archive size={18} />
            )}
            <span className="text-[10px] font-black uppercase italic">
              Archiver Traitées
            </span>
          </div>
          <CheckCircle2
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </button>

        {/* Export Action (Fixed Button) */}
        <button
          onClick={handleExport}
          disabled={!!loading}
          className="flex items-center justify-between p-5 bg-gray-50 hover:bg-emerald-600 hover:text-white rounded-2xl transition-all group disabled:opacity-50"
        >
          <div className="flex items-center gap-3">
            {loading === "export" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <FileDown size={18} />
            )}
            <span className="text-[10px] font-black uppercase italic">
              Exporter Excel
            </span>
          </div>
          <FileDown
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </button>

        {/* Flush Action */}
        <button
          onClick={handleFlush}
          disabled={!!loading}
          className="flex items-center justify-between p-5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-2xl transition-all group disabled:opacity-50"
        >
          <div className="flex items-center gap-3">
            {loading === "flush" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
            <span className="text-[10px] font-black uppercase italic">
              Vider la Base
            </span>
          </div>
          <Trash2
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </button>
      </div>
    </div>
  );
}
