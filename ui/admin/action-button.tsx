"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Send, AlertCircle } from "lucide-react";

export default function ActionButtons({ isUpdate }: { isUpdate: boolean }) {
  const { pending } = useFormStatus();
  const [selectedAction, setSelectedAction] = useState("RESOLVE");

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-50 pt-10">
      {/* Hidden input to pass the button choice to the Server Action */}
      <input type="hidden" name="action" value={selectedAction} />

      <button
        type="submit"
        disabled={pending}
        onClick={() => setSelectedAction("REJECT")}
        className="flex items-center gap-2 px-8 py-4 text-[11px] font-black uppercase italic text-rose-500 hover:bg-rose-50 rounded-2xl transition-all tracking-[0.2em] disabled:opacity-50"
      >
        <AlertCircle size={16} />
        {pending && selectedAction === "REJECT"
          ? "Traitement..."
          : "Rejeter la demande"}
      </button>

      <button
        type="submit"
        disabled={pending}
        onClick={() => setSelectedAction("RESOLVE")}
        className="w-full md:w-auto flex items-center justify-center gap-4 px-14 py-6 bg-blue-600 text-white rounded-[2.5rem] text-[11px] font-black uppercase italic tracking-[0.3em] hover:bg-gray-900 hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-95 shadow-xl shadow-blue-100 disabled:bg-gray-400"
      >
        {pending && selectedAction === "RESOLVE" ? (
          <span className="animate-pulse">Transmission...</span>
        ) : (
          <>
            <Send size={18} />
            {isUpdate ? "Mettre à jour la décision" : "Valider et Signer"}
          </>
        )}
      </button>
    </div>
  );
}
