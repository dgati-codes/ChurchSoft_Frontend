function StatCard({ title, value, subtitle, icon, onClick,color }) {

   const map = {
    green: "border-green-400",
    blue: "border-blue-400",
    purple: "border-purple-400",
    orange: "border-orange-400",
  };
  return (
    <div
      onClick={onClick}
      className={`bg-white shadow ${map[color]} rounded-xl p-4 flex flex-col gap-1 border border-[#E5E5E5] cursor-pointer hover:shadow-md transition`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>

        {icon && <span className="text-xl">{icon}</span>}
      </div>

      {typeof value === "string" || typeof value === "number" ? (
        <p className="text-2xl font-bold">{value}</p>
      ) : (
        <div className="min-h-8 flex items-center">{value}</div>
      )}

      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}

export default StatCard;