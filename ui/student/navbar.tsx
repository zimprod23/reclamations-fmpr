import Link from "next/link";
import {
  Home,
  PlusCircle,
  History,
  User,
  Bell,
  GraduationCap,
} from "lucide-react";

export default function StudentNavbar() {
  return (
    <>
      {/* DESKTOP HEADER */}
      <nav className="hidden md:flex sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight text-gray-900">
            FMP <span className="text-blue-600">STUDENT</span>
          </span>
        </div>

        <div className="flex items-center gap-8">
          <Link
            href="/student/dashboard"
            className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/student/reclamations"
            className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
          >
            Mes Demandes
          </Link>
          <Link
            href="/student/new"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Nouvelle Réclamation
          </Link>
          <div className="h-8 w-[1px] bg-gray-100" />
          <button className="relative p-2 text-gray-400 hover:text-blue-600">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-full flex items-center justify-center border border-blue-200">
            <User className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM BAR */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] bg-gray-900/90 backdrop-blur-lg rounded-3xl px-6 py-4 flex items-center justify-between shadow-2xl">
        <Link
          href="/student/dashboard"
          className="text-white/60 hover:text-white transition-colors"
        >
          <Home className="w-6 h-6" />
        </Link>
        <Link
          href="/student/reclamations"
          className="text-white/60 hover:text-white transition-colors"
        >
          <History className="w-6 h-6" />
        </Link>
        <Link
          href="/student/new"
          className="bg-blue-600 p-3 rounded-full -mt-12 border-4 border-gray-50 shadow-xl"
        >
          <PlusCircle className="w-7 h-7 text-white" />
        </Link>
        <button className="text-white/60 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
        </button>
        <Link
          href="/student/profile"
          className="text-white/60 hover:text-white transition-colors"
        >
          <User className="w-6 h-6" />
        </Link>
      </nav>
    </>
  );
}
