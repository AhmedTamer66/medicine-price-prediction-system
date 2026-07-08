import { Link } from "react-router-dom";
import {
  FaCapsules,
  FaIndustry,
  FaMoneyBillWave,
  FaFlask,
} from "react-icons/fa";

export default function AlternativeCard({
  drug,
  selectedDrug,
  onSelect,
  formatPrice,
}) {
  const selected =
    selectedDrug?.commercial_name_en === drug.commercial_name_en;

  return (
    <div
      className={`rounded-xl bg-white p-6 shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        selected ? "ring-2 ring-blue-600" : ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCapsules className="text-2xl text-blue-700" />

          <h3 className="font-bold text-gray-800">
            {drug.commercial_name_en}
          </h3>
        </div>

        <button
          onClick={onSelect}
          className="rounded bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-200"
        >
          Compare
        </button>
      </div>

      <p className="mb-3 text-sm text-gray-500">
        {drug.commercial_name_ar || "--"}
      </p>

      <div className="space-y-3">

        <div className="flex items-center gap-2">
          <FaFlask className="text-green-600" />
          <span className="text-sm">{drug.scientific_name}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaIndustry className="text-yellow-600" />
          <span className="text-sm">{drug.manufacturer}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-green-700" />
          <span className="font-bold text-green-700">
            {formatPrice(drug.price_egp)}
          </span>
        </div>

      </div>

      <div className="mt-6">

        <Link
          to={`/drug/${encodeURIComponent(drug.commercial_name_en)}`}
          state={{ drug }}
          className="block rounded-lg bg-blue-700 py-2 text-center font-semibold text-white transition hover:bg-blue-800"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}