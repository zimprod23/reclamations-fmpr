const categoryData = [
  { label: "Examens", value: 45, color: "bg-blue-500" },
  { label: "Stages/CHU", value: 30, color: "bg-purple-500" },
  { label: "Administratif", value: 25, color: "bg-amber-500" },
];

// ui/dashboard/analytics.tsx

// ui/dashboard/analytics.tsx

export function WeeklyInflowChart() {
  const data = [
    { day: "Lun", value: 12 },
    { day: "Mar", value: 18 },
    { day: "Mer", value: 25 },
    { day: "Jeu", value: 10 },
    { day: "Fri", value: 32 },
    { day: "Sam", value: 5 },
    { day: "Dim", value: 2 },
  ];

  const maxValue = 40;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Flux Hebdomadaire
        </h3>
        <p className="text-2xl font-black text-gray-900">
          Activité des Étudiants
        </p>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 w-full flex items-end justify-between gap-3 px-2 border-b border-gray-100">
        {/* Horizontal Background Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-full border-t border-gray-50 border-dashed"
            />
          ))}
        </div>

        {/* Bars */}
        {data.map((item) => {
          // Calculate percentage height
          const barHeight = `${(item.value / maxValue) * 100}%`;

          return (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center justify-end group relative z-10 h-full"
            >
              {/* Tooltip - forced visible on hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20 shadow-xl">
                {item.value} récl.
              </div>

              {/* The Bar - forced color and height */}
              <div
                style={{ height: barHeight }}
                className="w-full max-w-[35px] bg-blue-600 rounded-t-md transition-all duration-300 group-hover:bg-blue-400 group-hover:scale-x-105 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.2)]"
              >
                {/* Subtle gradient overlay for depth */}
                <div className="w-full h-full bg-gradient-to-t from-black/10 to-transparent rounded-t-md" />
              </div>

              {/* Day Label */}
              <span className="text-[10px] font-bold text-gray-400 mt-3 mb-[-24px] uppercase tracking-tighter">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
      {/* Legend Padding */}
      <div className="h-6" />
    </div>
  );
}
export function CategoryDistribution() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-500 uppercase mb-6">
        Types de Problèmes
      </h3>
      <div className="space-y-4">
        {categoryData.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{item.label}</span>
              <span className="text-gray-500">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className={`${item.color} h-full`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
