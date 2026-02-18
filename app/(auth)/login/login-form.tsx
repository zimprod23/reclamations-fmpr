"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { GraduationCap, Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    // Fetch session to know role
    const response = await fetch("/api/auth/session");
    const session = await response.json();

    if (session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/student/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight italic uppercase">
            Connexion
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">
            Portail Étudiant FMP
          </p>
        </div>

        {registered && (
          <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-bold border border-green-100 italic">
            Compte créé avec succès. Connectez-vous.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 italic">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                required
                name="email"
                type="email"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="etudiant@um5s.ac.ma"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
              <input
                required
                name="password"
                type="password"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Pas encore de compte ?{" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="font-bold text-blue-600 hover:underline"
          >
            Inscrivez-vous
          </button>
        </div>
      </div>
    </div>
  );
}
