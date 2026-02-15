"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Mail,
  Phone,
  Key,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

// 1. Precise TypeScript Interface
interface FormData {
  mainCategory: string;
  subIssue: string;
  details: {
    email: string;
    phone: string;
    message: string;
  };
}

export default function NewReclamationWizard() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    mainCategory: "",
    subIssue: "",
    details: { email: "", phone: "", message: "" },
  });

  // --- Handlers ---
  const handleNext = () => {
    setError("");
    setStep((s) => s + 1);
  };
  const handlePrev = () => {
    setError("");
    setStep((s) => s - 1);
  };

  const validateAndSubmit = () => {
    const { email, message, phone } = formData.details;

    if (formData.mainCategory === "AUTRE") {
      if (message.length < 15)
        return setError("Description trop courte (min. 15 car.)");
    } else {
      if (!email.includes("@"))
        return setError("Email institutionnel invalide.");
      if (formData.subIssue === "LOST_PHONE" && phone.length < 10)
        return setError("Numéro de téléphone invalide.");
    }

    console.log("🚀 Data ready for Prisma:", formData);
    alert("Succès ! Connexion à la base de données en cours...");
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start md:justify-center p-4 sm:p-6 lg:p-8 bg-slate-50/30">
      {/* --- PROGRESS HEADER --- */}
      <div className="w-full max-w-4xl mb-6 md:mb-10 px-2">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight italic uppercase">
              Nouvelle Demande
            </h1>
            <p className="hidden md:block text-gray-500 text-sm font-medium">
              Faculté de Médecine et de Pharmacie
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] md:text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">
              Étape {step} / 3
            </span>
          </div>
        </div>
        <div className="h-2 w-full bg-gray-200/50 rounded-full overflow-hidden border border-gray-100">
          <motion.div
            className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </div>
      </div>

      {/* --- MAIN INTERACTION CARD --- */}
      <div className="w-full max-w-4xl bg-white rounded-3xl md:rounded-[3rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-14 lg:p-20">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
            >
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: Categories */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                className="space-y-6 md:space-y-10"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                  De quoi s'agit-il ?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[
                    {
                      id: "MAIL",
                      label: "Mail Institutionnel",
                      desc: "Accès, mot de passe, authentification",
                      icon: <Mail />,
                      color: "bg-blue-600",
                    },
                    {
                      id: "BOURSE",
                      label: "Bourse Ministérielle",
                      desc: "Minhaty, dossier social, virements",
                      icon: <ShieldCheck />,
                      color: "bg-emerald-600",
                    },
                    {
                      id: "AUTRE",
                      label: "Autre Problème",
                      desc: "Stages, notes, administration",
                      icon: <HelpCircle />,
                      color: "bg-indigo-600",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setFormData({ ...formData, mainCategory: item.id });
                        item.id === "AUTRE" ? setStep(3) : handleNext();
                      }}
                      className="flex items-center md:flex-col md:items-start p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] bg-gray-50 border-2 border-transparent hover:bg-white hover:border-blue-500 hover:shadow-2xl transition-all text-left relative group"
                    >
                      <div
                        className={`p-3 md:p-4 rounded-xl ${item.color} text-white mr-4 md:mr-0 md:mb-6 group-hover:scale-110 transition-transform`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-black text-base md:text-2xl text-gray-900 uppercase tracking-tight">
                          {item.label}
                        </p>
                        <p className="hidden md:block text-gray-400 text-sm mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <ChevronRight className="ml-auto md:absolute md:bottom-10 md:right-10 w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Sub-Issues */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                className="space-y-6 md:space-y-8"
              >
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft size={14} /> RETOUR
                </button>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight uppercase italic">
                  Précisez la situation
                </h2>
                <div className="grid gap-3">
                  {[
                    { id: "LOST_PHONE", label: "Numéro de téléphone perdu" },
                    { id: "FORGOT_PWD", label: "Mot de passe oublié" },
                    { id: "NO_ACCOUNT", label: "Compte non activé" },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setFormData({ ...formData, subIssue: sub.id });
                        handleNext();
                      }}
                      className="w-full p-5 rounded-xl md:rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:text-blue-600 font-bold text-gray-700 text-left transition-all"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Final Details */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 md:space-y-10"
              >
                <button
                  onClick={() =>
                    formData.mainCategory === "AUTRE"
                      ? setStep(1)
                      : handlePrev()
                  }
                  className="text-xs font-black text-gray-400 flex items-center gap-1 hover:text-blue-600"
                >
                  <ArrowLeft size={14} /> RETOUR
                </button>

                <div className="space-y-6 md:space-y-8">
                  {formData.mainCategory === "AUTRE" ? (
                    <div className="space-y-3">
                      <label className="text-sm md:text-lg font-black text-gray-900 uppercase italic ml-1 tracking-wide">
                        Votre message
                      </label>
                      <textarea
                        rows={7}
                        className="w-full p-5 md:p-8 bg-gray-50 rounded-2xl md:rounded-[2.5rem] border-2 border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none text-base md:text-xl text-gray-700 leading-relaxed resize-none"
                        placeholder="Expliquez-nous tout en détail..."
                        value={formData.details.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            details: {
                              ...formData.details,
                              message: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:gap-8">
                      <div className="space-y-3">
                        <label className="text-xs md:text-lg font-black text-gray-900 uppercase italic ml-1">
                          Email institutionnel
                        </label>
                        <input
                          type="email"
                          placeholder="nom.p@um5s.ac.ma"
                          className="w-full p-4 md:p-6 bg-gray-50 rounded-xl md:rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none text-sm md:text-lg transition-all"
                          value={formData.details.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              details: {
                                ...formData.details,
                                email: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      {formData.subIssue === "LOST_PHONE" && (
                        <div className="space-y-3">
                          <label className="text-xs md:text-lg font-black text-gray-900 uppercase italic ml-1">
                            Ancien numéro
                          </label>
                          <input
                            type="tel"
                            placeholder="06 -- -- -- --"
                            className="w-full p-4 md:p-6 bg-gray-50 rounded-xl md:rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none text-sm md:text-lg transition-all"
                            value={formData.details.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                details: {
                                  ...formData.details,
                                  phone: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={validateAndSubmit}
                    className="w-full md:w-max px-12 md:px-20 py-4 md:py-6 bg-blue-600 text-white rounded-xl md:rounded-full font-black text-sm md:text-xl hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                  >
                    <Send
                      size={20}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                    ENVOYER MA DEMANDE
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-8 md:mt-12 text-gray-400 font-bold text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-center">
        FMP RABAT • SERVICE DIGITALISATION
      </p>
    </div>
  );
}
