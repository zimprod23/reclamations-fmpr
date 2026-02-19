"use client";

interface CategoryItem {
  label: string;
  value: number;
  color: string;
}

export function CategoryDistribution({ data }: { data: CategoryItem[] }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full">
      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
        Distribution par Type
      </h3>
      <div className="space-y-5">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-gray-600 uppercase italic">
                  {item.label}
                </span>
                <span className="text-gray-900">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden border border-gray-100">
                <div
                  className={`${item.color} h-full transition-all duration-1000`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 italic">
            Aucune donnée disponible
          </p>
        )}
      </div>
    </div>
  );
}

export function WeeklyInflowChart({
  rawData,
}: {
  rawData: { createdAt: Date }[];
}) {
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Format data for chart
  const chartData = days.map((dayName, index) => {
    const count = rawData.filter(
      (d) => new Date(d.createdAt).getDay() === index,
    ).length;
    return { day: dayName, value: count };
  });

  const maxValue = Math.max(...chartData.map((d) => d.value), 5);

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="mb-8">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Flux Hebdomadaire
        </h3>
        <p className="text-xl font-black text-gray-900 italic uppercase">
          Activité Récente
        </p>
      </div>

      <div className="relative h-48 w-full flex items-end justify-between gap-2 px-2">
        {chartData.map((item, idx) => {
          const height = `${(item.value / maxValue) * 100}%`;
          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center group relative h-full justify-end"
            >
              {/* Tooltip */}
              <div className="absolute -top-8 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                {item.value}
              </div>
              {/* Bar */}
              <div
                style={{ height }}
                className="w-full max-w-[40px] bg-blue-600 rounded-t-xl transition-all duration-500 group-hover:bg-blue-400 shadow-lg shadow-blue-100"
              />
              <span className="text-[9px] font-black text-gray-400 mt-2 uppercase italic">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
