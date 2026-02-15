// ui/skeletons.tsx
export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gray-200 h-12 w-12" />
        <div className="space-y-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-12 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-50">
        <div className="h-3 w-32 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-gray-200 rounded-2xl animate-pulse" />
        <div className="lg:col-span-1 h-64 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}

export function StatusTrackerSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded-lg ml-2" />
      <div className="bg-white border border-gray-100 rounded-3xl p-8 h-48 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-6 w-64 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
          </div>
          <div className="h-10 w-32 bg-gray-100 rounded-xl" />
        </div>
        <div className="h-1 w-full bg-gray-100 rounded mt-auto" />
      </div>
    </div>
  );
}
