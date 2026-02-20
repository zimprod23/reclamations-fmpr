// // app/(admin)/admin/dashboard/page.tsx
// import { Suspense } from "react";
// import { DashboardSkeleton } from "@/ui/skeletons";
// import { Card } from "@/ui/admin/cards";
// import { CategoryDistribution, WeeklyInflowChart } from "@/ui/admin/analytics";
// import { getAdminAnalytics } from "@/lib/data";

// export default function Page() {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 tracking-tight italic uppercase">
//           Faculté de Médecine
//         </h1>
//         <p className="text-gray-500 text-sm font-medium">
//           Gestion des flux hospitalo-universitaires
//         </p>
//       </div>

//       <Suspense fallback={<DashboardSkeleton />}>
//         <DashboardDataWrapper />
//       </Suspense>
//     </div>
//   );
// }

// async function DashboardDataWrapper() {
//   // Destructure correctly based on the return type of getAdminAnalytics
//   const { stats, categoryData, weeklyInflow } = await getAdminAnalytics();

//   return (
//     <>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         <Card
//           title="Total Réclamations"
//           value={stats.total}
//           type="total"
//           trend={stats.totalTrend}
//         />
//         <Card title="En Attente" value={stats.pending} type="pending" />
//         <Card title="Traitées" value={stats.resolved} type="resolved" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
//         <div className="lg:col-span-2">
//           {/* Use weeklyInflow as returned from lib/data.ts */}
//           <WeeklyInflowChart rawData={weeklyInflow} />
//         </div>
//         <div className="lg:col-span-1">
//           <CategoryDistribution data={categoryData} />
//         </div>
//       </div>
//     </>
//   );
// }

import { Suspense } from "react";
import { DashboardSkeleton } from "@/ui/skeletons";
import { Card } from "@/ui/admin/cards";
import { CategoryDistribution, WeeklyInflowChart } from "@/ui/admin/analytics";
import { getAdminAnalytics } from "@/lib/data";
import AdminControls from "@/ui/admin/admin-controls"; // Import the new component

export default function Page() {
  return (
    <div className="space-y-10 pb-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">
            Analyse <span className="text-blue-600">FMPR</span>
          </h1>
          <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mt-2">
            Gestion des flux hospitalo-universitaires
          </p>
        </div>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardDataWrapper />
      </Suspense>

      {/* NEW: Administrative Management Section */}
      <div className="pt-10">
        <AdminControls />
      </div>
    </div>
  );
}

async function DashboardDataWrapper() {
  const { stats, categoryData, weeklyInflow } = await getAdminAnalytics();

  return (
    <div className="space-y-10">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 italic">
              Flux Hebdomadaire
            </h3>
          </div>
          <WeeklyInflowChart rawData={weeklyInflow} />
        </div>
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 italic">
              Distribution
            </h3>
          </div>
          <CategoryDistribution data={categoryData} />
        </div>
      </div>
    </div>
  );
}
