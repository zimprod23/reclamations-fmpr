export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded" />

      {/* Skeleton for Request */}
      <div className="bg-white border border-gray-100 p-8 rounded-3xl h-64 shadow-sm">
        <div className="h-4 w-24 bg-gray-100 rounded mb-6" />
        <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-2/3 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Skeleton for Response */}
      <div className="h-48 bg-gray-100 rounded-3xl" />
    </div>
  );
}
