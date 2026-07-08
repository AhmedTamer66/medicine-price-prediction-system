import { useState, useEffect, useMemo } from "react";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import StatCard from "../components/StatCard";

import ManufacturerChart from "../components/charts/ManufacturerChart";
import RouteChart from "../components/charts/RouteChart";
import DrugClassChart from "../components/charts/DrugClassChart";
import PriceRangeChart from "../components/charts/PriceRangeChart";
import PriceDistributionChart from "../components/charts/PriceDistributionChart";

import { getMedicines } from "../services/drugService";

import {
  FaCapsules,
  FaMoneyBillWave,
  FaIndustry,
  FaArrowUp,
} from "react-icons/fa";

export default function Analytics() {

  // ==========================
  // State
  // ==========================

  const [drugs, setDrugs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================
  // Load Medicines
  // ==========================

  const loadMedicines = async () => {

    try {

      setLoading(true);

      setError("");

      // Load many medicines for analytics
      const response = await getMedicines({

        page: 1,

        limit: 100,

      });

      setDrugs(response.drugs || []);

    } catch (err) {

      console.error(err);

      setError("Couldn't load analytics.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadMedicines();

  }, []);

  // ==========================
  // Helper Functions
  // ==========================

  const groupByManufacturer = (list) => {

    const map = {};

    list.forEach((drug) => {

      const key = drug.manufacturer || "Unknown";

      map[key] = (map[key] || 0) + 1;

    });

    return Object.entries(map)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

  };

  const groupByRoute = (list) => {

    const map = {};

    list.forEach((drug) => {

      const key = drug.route || "Unknown";

      map[key] = (map[key] || 0) + 1;

    });

    return Object.entries(map).map(([name, value]) => ({

      name,

      value,

    }));

  };

  const groupByClass = (list) => {

    const map = {};

    list.forEach((drug) => {

      const key = drug.drug_class || "Unknown";

      map[key] = (map[key] || 0) + 1;

    });

    return Object.entries(map)
      .map(([name, count]) => ({

        name,

        count,

      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

  };

  const groupByPriceRange = (list) => {

    const ranges = {

      "0-50": 0,

      "51-100": 0,

      "101-250": 0,

      "251-500": 0,

      "500+": 0,

    };

    list.forEach((drug) => {

      const price = Number(drug.price_egp);

      if (price <= 50)

        ranges["0-50"]++;

      else if (price <= 100)

        ranges["51-100"]++;

      else if (price <= 250)

        ranges["101-250"]++;

      else if (price <= 500)

        ranges["251-500"]++;

      else

        ranges["500+"]++;

    });

    return Object.entries(ranges).map(([range, count]) => ({

      range,

      count,

    }));

  };

  // ==========================
  // Statistics
  // ==========================

  const totalMedicines = drugs.length;

  const totalManufacturers = useMemo(() => {

    return new Set(

      drugs.map((drug) => drug.manufacturer)

    ).size;

  }, [drugs]);

  const averagePrice = useMemo(() => {

    if (!drugs.length)

      return 0;

    const total = drugs.reduce(

      (sum, drug) => sum + Number(drug.price_egp || 0),

      0

    );

    return (total / drugs.length).toFixed(2);

  }, [drugs]);

  const maxPrice = useMemo(() => {

    if (!drugs.length)

      return 0;

    return Math.max(

      ...drugs.map((drug) => Number(drug.price_egp))

    );

  }, [drugs]);

  const minPrice = useMemo(() => {

    if (!drugs.length)

      return 0;

    return Math.min(

      ...drugs.map((drug) => Number(drug.price_egp))

    );

  }, [drugs]);

  // ==========================
  // Chart Data
  // ==========================

  const manufacturerData = useMemo(() =>

    groupByManufacturer(drugs),

    [drugs]

  );

  const routeData = useMemo(() =>

    groupByRoute(drugs),

    [drugs]

  );

  const classData = useMemo(() =>

    groupByClass(drugs),

    [drugs]

  );

  const priceRangeData = useMemo(() =>

    groupByPriceRange(drugs),

    [drugs]

  );

  const priceDistributionData = useMemo(() => {

    return drugs
      .map((drug) => ({

        name: drug.commercial_name_en,

        price: Number(drug.price_egp),

      }))
      .sort((a, b) => a.price - b.price)
      .slice(0, 50);

  }, [drugs]);

  // ==========================
  // JSX STARTS HERE
  // ==========================

  return (
    <>
  <Navbar />

  <main className="mx-auto max-w-7xl p-8">

    {/* Page Header */}

    <div className="mb-10">

      <h1 className="text-4xl font-bold text-gray-800">

        Analytics Dashboard

      </h1>

      <p className="mt-2 text-gray-500">

        Statistics and insights from the medicine database.

      </p>

    </div>

    {/* Loading */}

    {loading && <Loading />}

    {/* Error */}

    {!loading && error && (

      <ErrorMessage message={error} />

    )}

    {/* Empty State */}

    {!loading && !error && drugs.length === 0 && (

      <EmptyState
        title="No Analytics Available"
        description="No medicine data could be loaded."
      />

    )}

    {/* Analytics */}

    {!loading && !error && drugs.length > 0 && (

      <>

        {/* Statistics */}

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Medicines"
            value={totalMedicines}
            icon={<FaCapsules />}
            color="blue"
          />

          <StatCard
            title="Average Price"
            value={`${averagePrice} EGP`}
            icon={<FaMoneyBillWave />}
            color="green"
          />

          <StatCard
            title="Manufacturers"
            value={totalManufacturers}
            icon={<FaIndustry />}
            color="yellow"
          />

          <StatCard
            title="Highest Price"
            value={`${maxPrice} EGP`}
            icon={<FaArrowUp />}
            color="red"
          />

        </div>

        {/* Price Summary */}

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow">

            <h3 className="text-lg font-semibold">

              Average Price

            </h3>

            <p className="mt-3 text-3xl font-bold text-green-700">

              {averagePrice} EGP

            </p>

          </div>

          <div className="rounded-xl bg-white p-6 shadow">

            <h3 className="text-lg font-semibold">

              Minimum Price

            </h3>

            <p className="mt-3 text-3xl font-bold text-blue-700">

              {minPrice} EGP

            </p>

          </div>

          <div className="rounded-xl bg-white p-6 shadow">

            <h3 className="text-lg font-semibold">

              Maximum Price

            </h3>

            <p className="mt-3 text-3xl font-bold text-red-700">

              {maxPrice} EGP

            </p>

          </div>

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 gap-8">

          <ManufacturerChart
            data={manufacturerData}
          />

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

            <RouteChart
              data={routeData}
            />

            <DrugClassChart
              data={classData}
            />

          </div>

          <PriceDistributionChart
            data={priceDistributionData}
          />

          <PriceRangeChart
            data={priceRangeData}
          />

        </div>

      </>

    )}

  </main>

</>

);

}