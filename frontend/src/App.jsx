import { Routes, Route } from "react-router-dom";
import Alternatives from "./pages/Alternatives";
import Dashboard from "./pages/Dashboard";
import DrugDetails from "./pages/DrugDetails";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
export default function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Dashboard />}
      />
       <Route
        path="/alternatives"
        element={<Alternatives />}
       />
      <Route
        path="/analytics"
        element={<Analytics />}
      />
       <Route
        path="/alerts"
       element={<Alerts />}
       />
      <Route
        path="/drug/:name"
        element={<DrugDetails />}
      />

    </Routes>
  );
} 