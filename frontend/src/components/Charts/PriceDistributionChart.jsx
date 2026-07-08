import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function PriceDistributionChart({ data }) {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">

        Price Distribution

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis hide />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}