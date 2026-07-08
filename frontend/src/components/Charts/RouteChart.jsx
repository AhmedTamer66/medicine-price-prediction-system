import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#9333ea",
  "#06b6d4",
];

export default function RouteChart({ data }) {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">

        Drug Routes

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}