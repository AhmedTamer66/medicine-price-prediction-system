import { getMedicines } from "./drugService";

export async function getAlerts() {
  const { drugs } = await getMedicines({
    limit: 100,
  });

  const alerts = [];

  drugs.forEach((drug) => {
    if (drug.price_egp > 500) {
      alerts.push({
        type: "High Price",
        severity: "danger",
        message: `${drug.commercial_name_en} costs ${drug.price_egp} EGP`,
      });
    }

    if (drug.route === "UNKNOWN") {
      alerts.push({
        type: "Unknown Route",
        severity: "warning",
        message: `${drug.commercial_name_en} has an unknown administration route`,
      });
    }

    if (
      !drug.scientific_name ||
      drug.scientific_name.trim() === ""
    ) {
      alerts.push({
        type: "Missing Scientific Name",
        severity: "info",
        message: `${drug.commercial_name_en} has no scientific name`,
      });
    }
  });

  return alerts;
}