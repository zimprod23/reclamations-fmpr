import { reclamations, users } from "@/lib/placeholder-data";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  User,
  FileText,
  Send,
  GraduationCap,
  CreditCard,
  Paperclip,
  FileIcon,
  X,
} from "lucide-react";
import Link from "next/link";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reclamation = reclamations.find((r) => r.id === id);
  const student = users.find((u) => u.id === reclamation?.studentId);

  if (!reclamation || !student) notFound();

  return (
    // Removed max-w-4xl to allow full use of the layout's p-12 padding
    <div className="w-full space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/manage"
          className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la gestion
        </Link>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            reclamation.status === "PENDING"
              ? "bg-amber-100 text-amber-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          Status: {reclamation.status}
        </span>
      </div>

      {/* Main Grid: Responsive stack on mobile, 3-columns on desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Section: Student Profile Card */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {student.name}
              </h2>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 text-sm">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <p>
                  <span className="text-gray-500">Apogée:</span>{" "}
                  <span className="font-mono font-medium">
                    {student.apogeeCode}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <p>
                  <span className="text-gray-500">CNE:</span>{" "}
                  <span className="font-mono font-medium">{student.cne}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <p>
                  <span className="text-gray-500">CIN:</span>{" "}
                  <span className="font-mono font-medium">{student.cin}</span>
                </p>
              </div>
            </div>

            <a
              href={student.studentCardUrl}
              target="_blank"
              className="mt-8 block w-full text-center py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-all"
            >
              Voir la carte d'étudiant
            </a>
          </div>
        </div>

        {/* Right Section: Content & Action */}
        <div className="xl:col-span-3 space-y-8">
          {/* Reclamation Content */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  Détails de l'objet
                </h2>
                <h1 className="text-2xl font-bold text-gray-900">
                  {reclamation.subject}
                </h1>
              </div>
              <FileText className="w-8 h-8 text-gray-200" />
            </div>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {reclamation.description}
              </p>
            </div>
          </div>

          {/* Admin Response Section */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm ring-1 ring-blue-50">
            <h2 className="text-lg font-bold text-gray-900 mb-4 font-sans">
              Réponse officielle
            </h2>

            <div className="relative">
              <textarea
                className="w-full p-5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none min-h-[200px] text-base transition-all bg-gray-50/50"
                placeholder="Saisissez les conclusions de l'administration..."
              ></textarea>

              {/* Attachment Preview (UI Placeholder) */}
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-blue-700">
                  <FileIcon className="w-4 h-4" />
                  <span className="font-medium">decision_commission.pdf</span>
                  <button className="hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
              {/* File Upload Button */}
              <label className="flex items-center gap-2 px-4 py-2 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg transition-colors group">
                <Paperclip className="w-5 h-5 group-hover:text-blue-600" />
                <span className="text-sm font-medium">
                  Joindre un document (PDF, JPG)
                </span>
                <input type="file" className="hidden" />
              </label>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="px-6 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-center">
                  Rejeter la demande
                </button>
                <button className="flex items-center justify-center gap-2 px-10 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all">
                  <Send className="w-4 h-4" />
                  Envoyer et clôturer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
