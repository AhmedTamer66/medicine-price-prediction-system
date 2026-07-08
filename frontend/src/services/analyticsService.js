import { getMedicines } from "./drugService";

export async function getAnalytics() {
  const { drugs } = await getMedicines({
    limit: 100,
  });

  const manufacturers = {};
  const routes = {};

  let totalPrice = 0;

  drugs.forEach((drug) => {
    totalPrice += drug.price_egp;

    manufacturers[drug.manufacturer] =
      (manufacturers[drug.manufacturer] || 0) + 1;

    routes[drug.route] =
      (routes[drug.route] || 0) + 1;
  });

  return {
    drugs,

    averagePrice:
      drugs.length === 0
        ? 0
        : (
            totalPrice /
            drugs.length
          ).toFixed(2),

    manufacturerData: Object.entries(
      manufacturers
    ).map(([name, value]) => ({
      name,
      value,
    })),

    routeData: Object.entries(routes).map(
      ([name, value]) => ({
        name,
        value,
      })
    ),
  };
}