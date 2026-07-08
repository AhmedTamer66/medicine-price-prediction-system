import { Link } from "react-router-dom";

export default function DrugTable({ drugs }) {
  if (!drugs.length) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-lg">

      <table className="min-w-full">

        <thead className="bg-blue-700 text-white">

          <tr>

            <th className="p-4 text-left">Commercial Name</th>

            <th className="text-left">Scientific Name</th>

            <th className="text-left">Manufacturer</th>

            <th className="text-left">Drug Class</th>

            <th className="text-left">Route</th>

            <th className="text-left">Price</th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {drugs.map((drug, index) => (

            <tr
              key={index}
              className="border-b hover:bg-blue-50 transition"
            >

              <td className="p-4 font-semibold">

                {drug.commercial_name_en}

              </td>

              <td>{drug.scientific_name}</td>

              <td>{drug.manufacturer}</td>

              <td>{drug.drug_class}</td>

              <td>{drug.route}</td>

              <td className="font-bold text-green-700">

                {drug.price_egp} EGP

              </td>

              <td>

                <Link
                  to={`/drug/${drug.commercial_name_en}`}
                  state={{ drug }}
                  className="font-semibold text-blue-700 hover:underline"
                >

                  View

                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}