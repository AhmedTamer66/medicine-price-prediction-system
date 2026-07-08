export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-md transition hover:shadow-xl">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-800">{value}</h2>
      </div>

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${
          colors[color] || colors.blue
        }`}
      >
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
}