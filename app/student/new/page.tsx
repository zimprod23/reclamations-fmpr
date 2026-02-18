"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Mail,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
  // ChevronRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  step1Schema,
  step2Schema,
  finalReclamationSchema,
} from "@/lib/validations";
import { submitReclamationAction } from "@/lib/actions/reclamations";

export default function NewReclamationWizard() {
  const { data: session } = useSession();
  const router = useRouter();
  const studentId = session?.user?.id;

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    mainCategory: "",
    subIssue: "",
    details: { email: "", phone: "", message: "" },
  });

  const handleNext = () => {
    setDirection(1);
    setError("");
    setStep((s) => s + 1);
  };
  const handlePrev = () => {
    setDirection(-1);
    setError("");
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setError("");
    try {
      if (step === 1) {
        step1Schema.parse({ mainCategory: formData.mainCategory });
        if (formData.mainCategory === "AUTRE") {
          setDirection(1);
          setStep(3);
        } else handleNext();
        return;
      }

      if (step === 2) {
        step2Schema.parse({ subIssue: formData.subIssue });
        handleNext();
        return;
      }

      if (step === 3) {
        finalReclamationSchema.parse(formData);
        setLoading(true);
        const res = await submitReclamationAction(formData, studentId);
        if (res.error) setError(res.error);
        else router.push("/student/dashboard?success=true");
      }
    } catch (err: any) {
      setError(err.issues ? err.issues[0].message : "Erreur de validation");
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 20 : -20, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 20 : -20, opacity: 0 }),
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start md:justify-center p-4 sm:p-6 lg:p-8 bg-slate-50/30">
      {/* PROGRESS HEADER */}
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
          <span className="text-[10px] md:text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">
            Étape {step} / 3
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-200/50 rounded-full border border-gray-100 overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="w-full max-w-4xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-12 lg:p-16">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
            >
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6 md:space-y-8"
              >
                <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
                  Sélectionnez une catégorie :
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {[
                    {
                      id: "MAIL",
                      label: "Mail Institutionnel",
                      desc: "Accès, mot de passe",
                      icon: <Mail size={24} />,
                      color: "bg-blue-600",
                    },
                    {
                      id: "BOURSE",
                      label: "Bourse Ministérielle",
                      desc: "Minhaty, virements",
                      icon: <ShieldCheck size={24} />,
                      color: "bg-emerald-600",
                    },
                    {
                      id: "AUTRE",
                      label: "Autre Problème",
                      desc: "Service Scolarité",
                      icon: <HelpCircle size={24} />,
                      color: "bg-indigo-600",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setFormData({ ...formData, mainCategory: item.id });
                        if (item.id === "AUTRE") {
                          setDirection(1);
                          setStep(3);
                        } else handleNext();
                      }}
                      className="flex items-center md:flex-col md:items-start p-5 md:p-8 rounded-2xl md:rounded-[2rem] bg-gray-50 border-2 border-transparent hover:bg-white hover:border-blue-500 hover:shadow-xl transition-all text-left group"
                    >
                      <div
                        className={`p-3 rounded-xl ${item.color} text-white mr-4 md:mr-0 md:mb-5 group-hover:scale-105 transition-transform`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm md:text-lg text-gray-900 uppercase tracking-tight">
                          {item.label}
                        </p>
                        <p className="hidden md:block text-gray-400 text-xs mt-1 font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-[0.2em]"
                >
                  <ArrowLeft size={14} /> Retour
                </button>
                <h2 className="text-lg md:text-xl font-bold text-gray-800 uppercase italic">
                  Précisez le problème
                </h2>
                <div className="grid gap-2">
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
                      className="w-full p-5 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:text-blue-600 font-bold text-gray-700 text-left transition-all bg-white text-sm md:text-base"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6 md:space-y-8"
              >
                <button
                  onClick={() =>
                    formData.mainCategory === "AUTRE"
                      ? setStep(1)
                      : handlePrev()
                  }
                  className="text-[10px] font-black text-gray-400 flex items-center gap-1 hover:text-blue-600 uppercase tracking-[0.2em]"
                >
                  <ArrowLeft size={14} /> Retour
                </button>

                <div className="space-y-6">
                  {formData.mainCategory === "AUTRE" ? (
                    <textarea
                      rows={6}
                      placeholder="Détaillez votre demande ici..."
                      className="w-full p-6 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none text-base text-gray-700 resize-none transition-all"
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
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                          Email institutionnel
                        </label>
                        <input
                          type="email"
                          placeholder="votre.nom@um5s.ac.ma"
                          className="w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none text-sm transition-all font-medium"
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
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            Nouveau numéro
                          </label>
                          <input
                            type="tel"
                            placeholder="06 -- -- -- --"
                            className="w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none text-sm transition-all font-medium"
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
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-xs md:text-sm tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase"
                  >
                    <Send size={16} />
                    {loading ? "Traitement..." : "Envoyer ma demande"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-8 text-gray-400 font-bold text-[9px] tracking-[0.4em] uppercase text-center">
        FMP RABAT • SUPPORT
      </p>
    </div>
  );
}
