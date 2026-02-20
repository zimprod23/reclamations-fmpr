import { Suspense } from "react";
import Link from "next/link";
import {
  Plus,
  ArrowRight,
  HelpCircle,
  History,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";
import { StatusTrackerSkeleton } from "@/ui/skeletons";
import { LatestStatusWrapper } from "@/ui/student/latest-status";

export default function StudentDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10 animate-in fade-in duration-500">
      {/* 1. COMPACT COMMAND BAR (Replaces the large Hero) */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-900 rounded-[2rem] p-6 md:p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
        <div className="flex items-center gap-5 relative z-10">
          <div className="hidden sm:flex w-14 h-14 bg-blue-600 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/20">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                Système Connecté
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter leading-none">
              Espace <span className="text-blue-500">Étudiant</span>
            </h1>
          </div>
        </div>

        <Link
          href="/student/new"
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-white hover:text-gray-900 text-white rounded-xl text-[11px] font-black uppercase italic tracking-[0.2em] transition-all active:scale-95 whitespace-nowrap z-10 shadow-xl shadow-blue-600/10"
        >
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          Nouvelle réclamation
        </Link>

        {/* Subtle background texture */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      </section>

      {/* 2. STATUS TRACKER - Center Stage */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-blue-600 rounded-full" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              Statut de la demande
            </h2>
          </div>
        </div>
        <Suspense fallback={<StatusTrackerSkeleton />}>
          <LatestStatusWrapper />
        </Suspense>
      </div>

      {/* 3. NAVIGATION GRID - Restored & Scaled Down */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* History Card */}
        <Link
          href="/student/history"
          className="group flex items-center justify-between bg-white p-6 rounded-[1.5rem] border border-gray-100 hover:border-blue-200 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-900/5"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
              <History size={24} />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 uppercase italic tracking-tight leading-none mb-1">
                Mon Historique
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter opacity-80">
                Parcourir mes archives
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-blue-50 transition-colors">
            <ArrowRight
              size={16}
              className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
            />
          </div>
        </Link>

        {/* Guide Card */}
        <Link
          href="/student/guide"
          className="group flex items-center justify-between bg-white p-6 rounded-[1.5rem] border border-gray-100 hover:border-amber-200 transition-all shadow-sm hover:shadow-xl hover:shadow-amber-900/5"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-inner">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 uppercase italic tracking-tight leading-none mb-1">
                Guide d'usage
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter opacity-80">
                Assistance & Démarches
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-amber-50 transition-colors">
            <ArrowRight
              size={16}
              className="text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
            />
          </div>
        </Link>
      </section>

      {/* SUPPORT FOOTER */}
      <footer className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <HelpCircle size={14} className="text-gray-300" />
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 italic">
            Aide technique : support@fmpr.ac.ma
          </span>
        </div>
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">
          Faculté de Médecine et de Pharmacie — Rabat
        </p>
      </footer>
    </div>
  );
}
