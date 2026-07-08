import Navbar from "../components/Navbar";
import {
  FaExclamationTriangle,
  FaArrowUp,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Price Increase Expected",
    message: "Panadol is predicted to increase by 15% next month.",
    date: "Today",
  },
  {
    id: 2,
    type: "danger",
    title: "High Price Alert",
    message: "Augmentin exceeded its average market price.",
    date: "Yesterday",
  },
  {
    id: 3,
    type: "info",
    title: "New Prediction Available",
    message: "Predictions have been updated successfully.",
    date: "2 days ago",
  },
  {
    id: 4,
    type: "success",
    title: "Alternative Found",
    message: "A cheaper alternative was found for Voltaren.",
    date: "3 days ago",
  },
];

function getIcon(type) {
  switch (type) {
    case "danger":
      return <FaExclamationTriangle className="text-red-600 text-2xl" />;

    case "warning":
      return <FaArrowUp className="text-yellow-500 text-2xl" />;

    case "success":
      return <FaCheckCircle className="text-green-600 text-2xl" />;

    default:
      return <FaInfoCircle className="text-blue-600 text-2xl" />;
  }
}

function getBorder(type) {
  switch (type) {
    case "danger":
      return "border-red-500";

    case "warning":
      return "border-yellow-500";

    case "success":
      return "border-green-500";

    default:
      return "border-blue-500";
  }
}

export default function Alerts() {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-2">
          Alerts
        </h1>

        <p className="text-gray-600 mb-8">
          Important notifications about medicine prices and predictions.
        </p>

        <div className="space-y-5">

          {alerts.map((alert) => (

            <div
              key={alert.id}
              className={`bg-white shadow-md rounded-xl border-l-8 ${getBorder(
                alert.type
              )} p-6 flex justify-between items-start`}
            >

              <div className="flex gap-4">

                {getIcon(alert.type)}

                <div>

                  <h2 className="font-bold text-lg">
                    {alert.title}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    {alert.message}
                  </p>

                </div>

              </div>

              <span className="text-sm text-gray-500">
                {alert.date}
              </span>

            </div>

          ))}

        </div>

      </main>
    </>
  );
}