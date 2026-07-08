import api from "./api";

export async function getPrediction(
  drugId,
  days = 30
) {

  const { data } = await api.get(
    `/predictions/${encodeURIComponent(drugId)}`,
    {
      params: {
        days,
      },
    }
  );

  return data;
}