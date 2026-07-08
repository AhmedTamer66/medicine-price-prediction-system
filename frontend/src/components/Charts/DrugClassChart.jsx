import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DrugClassChart({ data }) {

  return (

    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold">

        Top Drug Classes

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            hide
          />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}