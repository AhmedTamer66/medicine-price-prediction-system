import { Link } from "react-router-dom";
import { FaCapsules } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 shadow-lg">

      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

        <Link
          to="/"
          className="flex items-center gap-3 text-white text-2xl font-bold"
        >
          <FaCapsules />

          Medicine Predictor
        </Link>

        <div className="flex gap-8 text-white font-medium">

          <Link
            to="/"
            className="hover:text-blue-200 transition"
          >
            Dashboard
          </Link>
          <Link
           to="/alternatives"
           className="hover:text-blue-200 transition"
          >
            Alternatives
          </Link>
          <Link
           to="/alerts"
           className="hover:text-blue-200 transition"
           >
            Alerts
          </Link> 
          <Link
            to="/analytics"
            className="hover:text-blue-200 transition"
          >
            Analytics
          </Link>

        </div>

      </div>

    </nav>
  );
}