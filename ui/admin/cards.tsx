import { ClipboardList, Clock, CheckCircle2, TrendingUp } from "lucide-react";

const iconMap = {
  total: ClipboardList,
  pending: Clock,
  resolved: CheckCircle2,
};

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "total" | "pending" | "resolved";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
        <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <TrendingUp className="h-3 w-3 mr-1" />
          +12%
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 tracking-wide uppercase">
          {title}
        </h3>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
