import api from "./api";

export async function getMedicines({
  search = "",
  manufacturer = "",
  route = "",
  page = 1,
  limit = 10,
} = {}) {

  const params = {
    page,
    limit,
  };

  if (search)
    params.search = search;

  if (manufacturer)
    params.manufacturer = manufacturer;

  if (route)
    params.route = route;

  const { data } = await api.get("/drugs", {
    params,
  });

  return {
    drugs: data.data || [],
    pagination: data.pagination || {},
  };
}

export async function getDrug(name) {

  const { data } = await api.get("/drugs", {
    params: {
      search: name,
      page: 1,
      limit: 1,
    },
  });

  return data.data?.[0];
}