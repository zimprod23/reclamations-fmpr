// app/(admin)/admin/dashboard/page.tsx
import { Suspense } from "react";
import { DashboardSkeleton } from "@/ui/skeletons";
import { Card } from "@/ui/admin/cards";
import { CategoryDistribution, WeeklyInflowChart } from "@/ui/admin/analytics";
import { getAdminAnalytics } from "@/lib/data";

export default function Page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight italic uppercase">
          Faculté de Médecine
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Gestion des flux hospitalo-universitaires
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardDataWrapper />
      </Suspense>
    </div>
  );
}

async function DashboardDataWrapper() {
  // Destructure correctly based on the return type of getAdminAnalytics
  const { stats, categoryData, weeklyInflow } = await getAdminAnalytics();

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Total Réclamations"
          value={stats.total}
          type="total"
          trend={stats.totalTrend}
        />
        <Card title="En Attente" value={stats.pending} type="pending" />
        <Card title="Traitées" value={stats.resolved} type="resolved" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          {/* Use weeklyInflow as returned from lib/data.ts */}
          <WeeklyInflowChart rawData={weeklyInflow} />
        </div>
        <div className="lg:col-span-1">
          <CategoryDistribution data={categoryData} />
        </div>
      </div>
    </>
  );
}
