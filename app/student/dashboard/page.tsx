// app/(student)/student/dashboard/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { Plus, FileText, ArrowRight, HelpCircle } from "lucide-react";
import { StatusTrackerSkeleton } from "@/ui/skeletons";
import LatestStatus from "@/ui/student/latest-status-ui";
import { LatestStatusWrapper } from "@/ui/student/latest-status";

export default function StudentDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* 1. Hero Section - Loads Instantly */}
      <section className="relative overflow-hidden bg-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-blue-100">
        {/* ... Hero Content ... */}
        <h1 className="text-3xl md:text-4xl font-black mb-4">
          Espace Étudiant 👋
        </h1>
        <Link href="/student/new" className="...">
          Nouvelle réclamation
        </Link>
      </section>

      {/* 2. Status Tracker - Loads with Suspense */}
      <Suspense fallback={<StatusTrackerSkeleton />}>
        <LatestStatusWrapper />
      </Suspense>

      {/* 3. Navigation Shortcuts - Loads Instantly */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ... History and Guide Links ... */}
      </section>
    </div>
  );
}
