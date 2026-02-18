// app/(student)/student/profile/page.tsx
import { fetchStudentInfo } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User, Mail, Fingerprint, Hash } from "lucide-react";

export default async function StudentProfile() {
  const session = await getServerSession(authOptions);
  const studentId = (session as any)?.user?.id;

  if (!studentId) {
    return (
      <p className="text-center mt-20 text-red-500 font-bold">
        Vous n'êtes pas connecté.
      </p>
    );
  }

  const student = await fetchStudentInfo(studentId);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8">
      <section className="bg-gradient-to-tr from-blue-50 to-white rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-100 text-gray-900">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="bg-blue-600 w-24 h-24 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg">
            <User className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight italic uppercase">
              {student.name}
            </h1>
            <p className="text-gray-500 font-semibold text-sm uppercase tracking-wide">
              Étudiant FMP
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard icon={<Mail />} label="Email" value={student.email} />
        <ProfileCard icon={<Fingerprint />} label="CIN" value={student.cin} />
        <ProfileCard icon={<Hash />} label="CNE / Massar" value={student.cne} />
        <ProfileCard icon={<Hash />} label="Code Apogée" value={student.apogeeCode} />
      </section>
    </div>
  );
}

// Reusable card for profile info
function ProfileCard({ icon, label, value }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="text-blue-600 w-6 h-6">{icon}</div>
      <div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-wide">{label}</p>
        <p className="font-bold text-gray-900 text-sm md:text-base">{value}</p>
      </div>
    </div>
  );
}
