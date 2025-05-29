import Constants from "expo-constants";
const { API_BASE_URL } = Constants.expoConfig?.extra ?? {};


export async function fetchTodaysPrices(region: string) {
  const response = await fetch(`${API_BASE_URL}/prices?region=${region}`);
  return await response.json();
}

export async function fetchTomorrowsPrices(region: string) {
  const response = await fetch(`${API_BASE_URL}/prices/tomorrow?region=${region}`);
  return await response.json();
}

export async function fetchTodaysFunFacts(region: string) {
  const response = await fetch(`${API_BASE_URL}/funfacts?region=${region}`);
  return await response.json();
}