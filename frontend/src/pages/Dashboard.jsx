import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import DrugTable from "../components/DrugTable";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

import {
  getMedicines,
} from "../services/drugService";

import {
  FaCapsules,
  FaMoneyBillWave,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Dashboard() {

  const navigate = useNavigate();

  // ==========================
  // State
  // ==========================

  const [search, setSearch] = useState("");

  const [manufacturer, setManufacturer] = useState("");

  const [route, setRoute] = useState("");

  const [drugs, setDrugs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [hasMore, setHasMore] = useState(false);

  const limit = 10;

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {
    loadMedicines(1);
  }, []);

  // ==========================
  // Load Medicines
  // ==========================

  const loadMedicines = async (pageNumber = page) => {

    try {

      setLoading(true);

      setError("");

      const response = await getMedicines({

        search,

        manufacturer,

        route,

        page: pageNumber,

        limit,

      });

      setDrugs(response.drugs);

      if (response.pagination) {

        setPage(response.pagination.page);

        setTotalPages(response.pagination.totalPages);

        setHasMore(response.pagination.hasMore);

      }

    } catch (err) {

      console.error(err);

      setError("Couldn't load medicines.");

      setDrugs([]);

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // Search
  // ==========================

  const handleSearch = () => {

    setPage(1);

    loadMedicines(1);

  };

  // ==========================
  // Pagination
  // ==========================

  const handlePrevious = () => {

    if (page <= 1) return;

    const newPage = page - 1;

    setPage(newPage);

    loadMedicines(newPage);

  };

  const handleNext = () => {

    if (!hasMore) return;

    const newPage = page + 1;

    setPage(newPage);

    loadMedicines(newPage);

  };

  // ==========================
  // Statistics
  // ==========================

  const totalMedicines = drugs.length;

  const averagePrice = useMemo(() => {

    if (drugs.length === 0) return "0.00";

    const total = drugs.reduce(

      (sum, drug) => sum + Number(drug.price_egp || 0),

      0

    );

    return (total / drugs.length).toFixed(2);

  }, [drugs]);

  const expensiveMedicines = useMemo(() => {

    return drugs.filter(

      (drug) => Number(drug.price_egp) >= 500

    ).length;

  }, [drugs]);

  const uniqueManufacturers = useMemo(() => {

    return new Set(

      drugs.map((drug) => drug.manufacturer)

    ).size;

  }, [drugs]);

  // ==========================
  // Helpers
  // ==========================

  const handleViewDrug = (drug) => {

    navigate(

      `/drug/${encodeURIComponent(drug.commercial_name_en)}`,

      {

        state: {

          drug,

        },

      }

    );

  };

  const resetFilters = () => {

    setSearch("");

    setManufacturer("");

    setRoute("");

    setPage(1);

    loadMedicines(1);

  };

  // ==========================
  // JSX STARTS HERE
  // ==========================

  return (
    <>
  <Navbar />

  <main className="max-w-7xl mx-auto p-8">

    {/* Header */}

    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-4xl font-bold text-gray-800">

          Medicine Dashboard

        </h1>

        <p className="mt-2 text-gray-500">

          Search, filter and monitor medicines available in the Egyptian database.

        </p>

      </div>

    </div>

    {/* Statistics */}

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Medicines"
        value={totalMedicines}
        color="blue"
        icon={<FaCapsules />}
      />

      <StatCard
        title="Average Price"
        value={`${averagePrice} EGP`}
        color="green"
        icon={<FaMoneyBillWave />}
      />

      <StatCard
        title="Manufacturers"
        value={uniqueManufacturers}
        color="yellow"
        icon={<FaChartLine />}
      />

      <StatCard
        title="Expensive Medicines"
        value={expensiveMedicines}
        color="red"
        icon={<FaExclamationTriangle />}
      />

    </div>

    {/* Search */}

    <SearchBar

      value={search}

      setValue={setSearch}

      onSearch={handleSearch}

    />

    {/* Filters */}

    <Filters

      manufacturer={manufacturer}

      setManufacturer={setManufacturer}

      route={route}

      setRoute={setRoute}

    />

    {/* Filter Buttons */}

    <div className="mt-5 flex flex-wrap gap-3">

      <button

        onClick={handleSearch}

        className="rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white transition hover:bg-blue-800"

      >

        Apply Filters

      </button>

      <button

        onClick={resetFilters}

        className="rounded-lg border border-gray-300 bg-white px-5 py-2 font-semibold transition hover:bg-gray-100"

      >

        Reset Filters

      </button>

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

    {!loading && !error && drugs.length === 0 && (

      <div className="mt-10">

        <EmptyState
          title="No medicines found"
          description="Try another search keyword or remove some filters."
        />

      </div>

    )}

    {/* Drug Table */}

    {!loading && !error && drugs.length > 0 && (

      <>

        <DrugTable

          drugs={drugs}

          onViewDrug={handleViewDrug}

        />

        <Pagination

          page={page}

          totalPages={totalPages}

          onPrevious={handlePrevious}

          onNext={handleNext}

        />

      </>

    )}

  </main>
</>

  );

}