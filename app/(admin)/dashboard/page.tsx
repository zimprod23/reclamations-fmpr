// app/(admin)/admin/dashboard/page.tsx
import { Suspense } from "react";
import { DashboardSkeleton } from "@/ui/skeletons";
import { reclamations } from "@/lib/placeholder-data";
import { Card } from "@/ui/admin/cards";
import { CategoryDistribution, WeeklyInflowChart } from "@/ui/admin/analytics";
// ... other imports

export default function Page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Faculté de Médecine
        </h1>
        <p className="text-gray-500 text-sm">
          Gestion des flux hospitalo-universitaires
        </p>
      </div>

      {/* Wrap the data-heavy parts in Suspense. 
         When you start fetching real data from Prisma inside these components, 
         the skeleton will show up automatically.
      */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardDataWrapper />
      </Suspense>
    </div>
  );
}

// We create a small wrapper to handle the data logic
async function DashboardDataWrapper() {
  // Imagine this is a Prisma call: const reclamations = await getReclamations();
  const total = reclamations.length;
  const pending = reclamations.filter((r) => r.status === "PENDING").length;
  const resolved = reclamations.filter((r) => r.status === "RESOLVED").length;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Total Réclamations" value={total} type="total" />
        <Card title="En Attente" value={pending} type="pending" />
        <Card title="Traitées" value={resolved} type="resolved" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyInflowChart />
        </div>
        <div className="lg:col-span-1">
          <CategoryDistribution />
        </div>
      </div>
    </>
  );
}
