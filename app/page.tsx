import Link from "next/link";
import {
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  FileSearch,
  UserCircle2,
  Lock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      {/* 1. TOP NAV / LOGO BAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <span className="block text-sm font-black uppercase tracking-tighter leading-none">
                FMPR
              </span>
              <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">
                Reclamations
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200"
          >
            <Lock size={14} /> Connexion
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Background Texture */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text */}
          <div className="relative z-10 space-y-10 animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-widest italic">
              <GraduationCap size={16} /> Faculté de Médecine et de Pharmacie —
              Rabat
            </div>

            <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] text-gray-900">
              Votre voix <br />
              <span className="text-blue-600">Académique</span> <br />
              Compte.
            </h1>

            <p className="text-xl text-gray-500 max-w-lg font-medium leading-relaxed">
              La plateforme officielle de gestion des réclamations pour les
              étudiants de la FMPR. Simplifiez vos démarches administratives en
              quelques clics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/login"
                className="group flex items-center justify-center gap-4 px-10 py-6 bg-blue-600 text-white rounded-[2rem] text-xs font-black uppercase italic tracking-[0.2em] transition-all hover:bg-gray-900 shadow-2xl shadow-blue-200 active:scale-95"
              >
                Commencer{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Right Column: Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            <FeatureCard
              icon={<FileSearch className="text-blue-600" />}
              title="Suivi Digital"
              desc="Suivez l'état de vos demandes en temps réel depuis votre tableau de bord."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-emerald-500" />}
              title="Sécurisé"
              desc="Authentification officielle via vos identifiants académiques."
            />
            <div className="sm:col-span-2">
              <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white flex items-center justify-between group hover:bg-blue-600 transition-colors duration-500">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                    Accès Administration
                  </h3>
                  <p className="text-gray-400 text-sm font-medium group-hover:text-blue-100 transition-colors">
                    Interface réservée au personnel administratif et technique.
                  </p>
                </div>
                <Link
                  href="/admin"
                  className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all"
                >
                  <UserCircle2 size={32} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          © {new Date().getFullYear()} FMPR — UNIVERSITÉ MOHAMMED V DE RABAT
        </p>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
          >
            Aide
          </a>
          <a
            href="#"
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
          >
            Guide
          </a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-black italic uppercase tracking-tighter mb-2 text-gray-900">
        {title}
      </h3>
      <p className="text-sm text-gray-500 font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
