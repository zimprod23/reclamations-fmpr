import {
  ClipboardList,
  Clock,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const iconMap = {
  total: { icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50" },
  pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  resolved: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
};

export function Card({
  title,
  value,
  type,
  trend, // New prop: actual percentage change
}: {
  title: string;
  value: number | string;
  type: "total" | "pending" | "resolved";
  trend?: number;
}) {
  const { icon: Icon, color, bg } = iconMap[type];
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className={`p-3 ${bg} rounded-2xl`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>

        {trend !== undefined && trend !== 0 && (
          <span
            className={`flex items-center text-[10px] font-black px-2.5 py-1 rounded-full italic uppercase ${
              isPositive
                ? "text-emerald-600 bg-emerald-50"
                : "text-red-600 bg-red-50"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {isPositive ? `+${trend}%` : `${trend}%`}
          </span>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-[10px] font-black text-gray-400 tracking-[0.15em] uppercase">
          {title}
        </h3>
        <p className="text-4xl font-black text-gray-900 mt-1 tracking-tighter">
          {value}
        </p>
      </div>
    </div>
  );
}
