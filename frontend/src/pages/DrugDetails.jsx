import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getPrediction } from "../services/predictionService";

import {
  FaArrowLeft,
  FaCapsules,
  FaFlask,
  FaIndustry,
  FaSyringe,
  FaMoneyBillWave,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

export default function DrugDetails() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const drug = state?.drug;

  // ==========================
  // State
  // ==========================

  const [prediction, setPrediction] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [forecastDays, setForecastDays] = useState(30);

  // ==========================
  // Prediction Loader
  // ==========================

  const loadPrediction = async (days = forecastDays) => {

    if (!drug) return;

    try {

      setLoading(true);

      setError("");

      const response = await getPrediction(

        drug.commercial_name_en,

        days

      );

      setPrediction(response.forecast || []);

    } catch (err) {

      console.error(err);

      setPrediction([]);

      setError("Couldn't load prediction.");

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // Navigation
  // ==========================

  const goBack = () => {

    navigate(-1);

  };

  // ==========================
  // Helpers
  // ==========================

  const formatPrice = (price) => {

    if (price === null || price === undefined) {

      return "--";

    }

    return `${Number(price).toFixed(2)} EGP`;

  };

  const formatRoute = (route) => {

    if (!route) return "--";

    return route
      .replaceAll("_", " ")
      .replaceAll(".", " ");

  };

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {

    if (drug) {

      loadPrediction(forecastDays);

    }

  }, []);

  // ==========================
  // Missing Navigation State
  // ==========================

  if (!drug) {

    return (

      <>
        <Navbar />

        <div className="mx-auto mt-20 max-w-3xl px-6">

          <ErrorMessage message="Medicine information was not found." />

          <button
            onClick={goBack}
            className="mt-6 rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800"
          >
            Go Back
          </button>

        </div>

      </>

    );

  }

  // ==========================
  // JSX STARTS HERE
  // ==========================

  return (
    <>
  <Navbar />

  <main className="max-w-7xl mx-auto p-8">

    {/* Back Button */}

    <button
      onClick={goBack}
      className="mb-8 flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-white transition hover:bg-blue-800"
    >
      <FaArrowLeft />
      Back
    </button>

    {/* Header */}

    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <div className="flex items-center gap-4">

        <div className="rounded-full bg-blue-100 p-5 text-4xl text-blue-700">

          <FaCapsules />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-gray-800">

            {drug.commercial_name_en}

          </h1>

          <p className="mt-2 text-xl text-gray-500">

            {drug.commercial_name_ar || "Arabic name unavailable"}

          </p>

          <p className="mt-3 text-gray-600">

            {drug.scientific_name}

          </p>

        </div>

      </div>

    </div>

    {/* Information Cards */}

    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

      <div className="rounded-xl bg-white p-6 shadow">

        <div className="mb-3 flex items-center gap-3">

          <FaIndustry className="text-2xl text-blue-700" />

          <h2 className="text-lg font-bold">

            Manufacturer

          </h2>

        </div>

        <p className="text-gray-700">

          {drug.manufacturer}

        </p>

      </div>

      <div className="rounded-xl bg-white p-6 shadow">

        <div className="mb-3 flex items-center gap-3">

          <FaFlask className="text-2xl text-green-700" />

          <h2 className="text-lg font-bold">

            Drug Class

          </h2>

        </div>

        <p className="text-gray-700">

          {drug.drug_class}

        </p>

      </div>

      <div className="rounded-xl bg-white p-6 shadow">

        <div className="mb-3 flex items-center gap-3">

          <FaSyringe className="text-2xl text-yellow-600" />

          <h2 className="text-lg font-bold">

            Route

          </h2>

        </div>

        <p className="text-gray-700">

          {formatRoute(drug.route)}

        </p>

      </div>

      <div className="rounded-xl bg-white p-6 shadow">

        <div className="mb-3 flex items-center gap-3">

          <FaMoneyBillWave className="text-2xl text-green-700" />

          <h2 className="text-lg font-bold">

            Current Price

          </h2>

        </div>

        <p className="text-2xl font-bold text-green-700">

          {formatPrice(drug.price_egp)}

        </p>

      </div>

    </div>

    {/* Prediction */}

    <div className="mt-10 rounded-2xl bg-white p-8 shadow">

      <div className="mb-6 flex items-center gap-3">

        <FaChartLine className="text-2xl text-blue-700" />

        <h2 className="text-2xl font-bold">

          Price Prediction

        </h2>

      </div>

      <div className="mb-8 flex flex-wrap items-center gap-4">

        <div className="flex items-center gap-2">

          <FaCalendarAlt className="text-blue-700" />

          <span className="font-medium">

            Forecast Period

          </span>

        </div>

        <select
          value={forecastDays}
          onChange={(e) => setForecastDays(Number(e.target.value))}
          className="rounded-lg border p-3"
        >
          <option value={7}>7 Days</option>
          <option value={30}>30 Days</option>
          <option value={60}>60 Days</option>
          <option value={90}>90 Days</option>
        </select>

        <button
          onClick={() => loadPrediction(forecastDays)}
          className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Predict
        </button>

      </div>

      {/* Loading */}

      {loading && (

        <Loading />

      )}

      {/* Error */}

      {!loading && error && (

        <ErrorMessage message={error} />

      )}

      {/* Empty */}

      {!loading && !error && prediction.length === 0 && (

        <div className="rounded-xl border border-dashed p-8 text-center">

          <h3 className="text-xl font-semibold">

            No Prediction Available

          </h3>

          <p className="mt-2 text-gray-500">

            Click Predict to generate a price forecast.

          </p>

        </div>

      )}

      {/* Prediction Table */}

      {!loading && !error && prediction.length > 0 && (

        <div className="overflow-hidden rounded-xl border">

          <table className="min-w-full">

            <thead className="bg-blue-700 text-white">

              <tr>

                <th className="p-4 text-left">

                  Date

                </th>

                <th className="text-left">

                  Predicted Price

                </th>

                <th className="text-left">

                  Lower Bound

                </th>

                <th className="text-left">

                  Upper Bound

                </th>

              </tr>

            </thead>

            <tbody>

              {prediction.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-blue-50"
                >

                  <td className="p-4">

                    {item.date}

                  </td>

                  <td className="font-semibold text-green-700">

                    {formatPrice(item.predicted_price)}

                  </td>

                  <td>

                    {formatPrice(item.lower_bound)}

                  </td>

                  <td>

                    {formatPrice(item.upper_bound)}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  </main>

</>

);

}