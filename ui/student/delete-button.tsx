"use client";

import { useState } from "react";
import { Trash2, X, Check } from "lucide-react";
import { deleteReclamationAction } from "@/lib/actions/reclamations";
import { useRouter } from "next/navigation";

export default function DeleteReclamationButton({
  id,
  studentId,
}: {
  id: string;
  studentId: string;
}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    const res = await deleteReclamationAction(id, studentId);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.error);
      setLoading(false);
      setIsConfirming(false);
    }
  };

  return (
    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
      {!isConfirming ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsConfirming(true);
          }}
          className="p-2.5 rounded-xl text-gray-300 hover:text-red-600 hover:bg-red-50 transition-all active:scale-90"
        >
          <Trash2 size={18} />
        </button>
      ) : (
        <div className="flex items-center gap-1 bg-red-600 p-1 rounded-full shadow-lg shadow-red-200 animate-in fade-in zoom-in duration-200">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-white text-red-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent animate-spin rounded-full" />
            ) : (
              <Check size={14} />
            )}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsConfirming(false);
            }}
            className="text-white p-1.5 hover:opacity-70"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
