import { Suspense } from "react";
import Link from "next/link";
import {
  Plus,
  FileText,
  ArrowRight,
  HelpCircle,
  History,
  BookOpen,
} from "lucide-react";
import { StatusTrackerSkeleton } from "@/ui/skeletons";
import { LatestStatusWrapper } from "@/ui/student/latest-status";

export default function StudentDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      {/* 1. Hero Section - Loads Instantly */}
      <section className="relative overflow-hidden bg-gray-900 rounded-[3rem] p-8 md:p-14 text-white shadow-2xl shadow-blue-900/20">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Portail Officiel FMPR
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-6 leading-tight">
            Espace <span className="text-blue-500">Étudiant</span> 👋
          </h1>
          <p className="text-gray-400 max-w-md text-lg font-medium mb-10 leading-relaxed">
            Gérez vos réclamations académiques et suivez l'avancement de vos
            dossiers en temps réel.
          </p>
          <Link
            href="/student/new"
            className="inline-flex items-center gap-4 px-8 py-5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase italic tracking-[0.2em] hover:bg-white hover:text-gray-900 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            <Plus size={18} /> Nouvelle réclamation
          </Link>
        </div>

        {/* Decorative Background Element */}
        <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
          <FileText size={400} />
        </div>
      </section>

      {/* 2. Status Tracker - Loads with Suspense */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
            Suivi en direct
          </h2>
        </div>
        <Suspense fallback={<StatusTrackerSkeleton />}>
          <LatestStatusWrapper />
        </Suspense>
      </div>

      {/* 3. Navigation Shortcuts - Restored & Beautified */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* History Shortcut */}
        <Link
          href="/student/history"
          className="group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden"
        >
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                <History size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter mb-1">
                  Mon Historique
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  Consultez l'ensemble de vos demandes passées.
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:translate-x-2 group-hover:bg-blue-50 transition-all duration-500">
              <ArrowRight
                size={18}
                className="text-gray-300 group-hover:text-blue-600"
              />
            </div>
          </div>
          {/* Subtle Accent Line */}
          <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-700" />
        </Link>

        {/* Guide Shortcut */}
        <Link
          href="/student/guide"
          className="group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden"
        >
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <BookOpen size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter mb-1">
                  Guide d'utilisation
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  Comment soumettre une réclamation efficace ?
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:translate-x-2 group-hover:bg-amber-50 transition-all duration-500">
              <ArrowRight
                size={18}
                className="text-gray-300 group-hover:text-amber-500"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-amber-500 group-hover:w-full transition-all duration-700" />
        </Link>
      </section>

      {/* Support Footer */}
      <footer className="pt-10 flex flex-col items-center justify-center text-center space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
          <HelpCircle size={14} /> Besoin d'assistance ?
        </div>
        <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
          Contactez le service technique au{" "}
          <span className="text-blue-600 font-bold underline">
            support@fmpr.ac.ma
          </span>{" "}
          en cas de problème d'accès.
        </p>
      </footer>
    </div>
  );
}
