import { FaCapsules } from "react-icons/fa";

export default function EmptyState() {
  return (
    <div className="py-20 text-center">

      <FaCapsules
        className="mx-auto text-6xl text-blue-600"
      />

      <h2 className="mt-4 text-2xl font-semibold">

        No Medicines Found

      </h2>

      <p className="mt-2 text-gray-500">

        Try another search.

      </p>

    </div>
  );
}