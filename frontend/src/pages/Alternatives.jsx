import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import AlternativeCard from "../components/AlternativeCard";

import { getMedicines } from "../services/drugService";

import {
  FaFilter,
  FaBroom,
  FaExchangeAlt,
} from "react-icons/fa";

export default function Alternatives() {

  // ==========================
  // State
  // ==========================

  const [search, setSearch] = useState("");

  const [alternatives, setAlternatives] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedDrug, setSelectedDrug] = useState(null);

  const [manufacturer, setManufacturer] = useState("");

  const [route, setRoute] = useState("");

  // ==========================
  // Load Alternatives
  // ==========================

  const loadAlternatives = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await getMedicines({

        page: 1,

        limit: 50,

      });

      setAlternatives(response.drugs || []);

    } catch (err) {

      console.error(err);

      setError("Couldn't load medicines.");

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // Search Medicines
  // ==========================

  const searchAlternatives = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await getMedicines({

        search,

        manufacturer,

        route,

        page: 1,

        limit: 50,

      });

      setAlternatives(response.drugs || []);

    } catch (err) {

      console.error(err);

      setAlternatives([]);

      setError("Search failed.");

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // Clear Filters
  // ==========================

  const clearFilters = () => {

    setSearch("");

    setManufacturer("");

    setRoute("");

    setSelectedDrug(null);

    loadAlternatives();

  };

  // ==========================
  // Helper Functions
  // ==========================

  const filterAlternatives = () => {

    return alternatives.filter((drug) => {

      const manufacturerMatch =

        manufacturer === "" ||

        drug.manufacturer
          ?.toLowerCase()
          .includes(manufacturer.toLowerCase());

      const routeMatch =

        route === "" ||

        drug.route
          ?.toLowerCase()
          .includes(route.toLowerCase());

      return manufacturerMatch && routeMatch;

    });

  };

  const formatPrice = (price) => {

    if (price === null || price === undefined)

      return "--";

    return `${Number(price).toFixed(2)} EGP`;

  };

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {

    loadAlternatives();

  }, []);

  const filteredAlternatives = filterAlternatives();

  // ==========================
  // JSX STARTS HERE
  // ==========================

  return (
    <>
  <Navbar />

  <main className="mx-auto max-w-7xl p-8">

    {/* Header */}

    <div className="mb-10">

      <h1 className="text-4xl font-bold text-gray-800">

        Alternative Medicines

      </h1>

      <p className="mt-2 text-gray-500">

        Search medicines and explore alternative drugs available in the database.

      </p>

    </div>

    {/* Search */}

    <SearchBar
      value={search}
      setValue={setSearch}
      onSearch={searchAlternatives}
    />

    {/* Filters */}

    <div className="mt-8 rounded-xl bg-white p-6 shadow">

      <div className="mb-5 flex items-center gap-2">

        <FaFilter className="text-blue-700" />

        <h2 className="text-xl font-semibold">

          Filters

        </h2>

      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        {/* Manufacturer */}

        <input
          type="text"
          placeholder="Manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
        />

        {/* Route */}

        <input
          type="text"
          placeholder="Route"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className="rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
        />

        {/* Search */}

        <button
          onClick={searchAlternatives}
          className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >

          Search

        </button>

        {/* Clear */}

        <button
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
        >

          <FaBroom />

          Clear Filters

        </button>

      </div>

    </div>

    {/* Loading */}

    {loading && (

      <div className="mt-10">

        <Loading />

      </div>

    )}

    {/* Error */}

    {!loading && error && (

      <div className="mt-10">

        <ErrorMessage message={error} />

      </div>

    )}

    {/* Empty */}

    {!loading && !error && filteredAlternatives.length === 0 && (

      <div className="mt-10">

        <EmptyState
          title="No Alternatives Found"
          description="Try another medicine name or change the filters."
        />

      </div>

    )}

    {/* Alternatives Grid */}

    {!loading && !error && filteredAlternatives.length > 0 && (

      <div className="mt-10">

        <div className="mb-6 flex items-center gap-2">

          <FaExchangeAlt className="text-2xl text-blue-700" />

          <h2 className="text-2xl font-bold">

            Available Medicines

          </h2>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

            {filteredAlternatives.length}

          </span>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAlternatives.map((drug, index) => (

  <div
    key={index}
    className="transition duration-300 hover:-translate-y-1 hover:shadow-xl"
  >

    <AlternativeCard
      drug={drug}
      selectedDrug={selectedDrug}
      onSelect={() => setSelectedDrug(drug)}
      formatPrice={formatPrice}
    />

  </div>

))}

        </div>

      </div>

    )}

    {/* Selected Medicine */}

    {selectedDrug && (

      <div className="mt-12 rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">

              Selected Medicine

            </h2>

            <p className="mt-1 text-gray-500">

              Compare and inspect the selected medicine.

            </p>

          </div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

            Compare Prices

          </span>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>

            <p className="text-sm text-gray-500">

              Commercial Name

            </p>

            <h3 className="mt-1 text-xl font-bold">

              {selectedDrug.commercial_name_en}

            </h3>

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Arabic Name

            </p>

            <h3 className="mt-1 text-xl font-bold">

              {selectedDrug.commercial_name_ar || "--"}

            </h3>

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Scientific Name

            </p>

            <p className="mt-1">

              {selectedDrug.scientific_name}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Manufacturer

            </p>

            <p className="mt-1">

              {selectedDrug.manufacturer}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Route

            </p>

            <p className="mt-1">

              {selectedDrug.route}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">

              Current Price

            </p>

            <p className="mt-1 text-2xl font-bold text-green-700">

              {formatPrice(selectedDrug.price_egp)}

            </p>

          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <button
            onClick={() =>
              window.location.href = `/drug/${encodeURIComponent(
                selectedDrug.commercial_name_en
              )}`
            }
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            View Details
          </button>

          <button
            onClick={() => setSelectedDrug(null)}
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
          >
            Close
          </button>

        </div>

      </div>

    )}

  </main>

</>

);

}
        