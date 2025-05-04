import Constants from "expo-constants";
import { API_BASE_URL } from "@env";

// const getBaseUrl = () => {
//   const debuggerHost =
//     Constants.expoConfig?.hostUri?.split(":")[0] ||
//     Constants.manifest2?.extra?.debuggerHost?.split(":")[0]; //fallback om inte expoConfig finns

//   return `http://${debuggerHost}:8080`;
// };

// export async function fetchTodaysPrices(region: string) {
//     const baseUrl = getBaseUrl();
//     const response = await fetch(`${baseUrl}/prices?region=${region}`);
//     return await response.json();
// }

// export async function fetchTomorrowsPrices(region: string) {
//     const baseUrl = getBaseUrl();
//     const response = await fetch(`${baseUrl}/prices/tomorrow?region=${region}`);
//     return await response.json();
// }



export async function fetchTodaysPrices(region: string) {
  const response = await fetch(`${API_BASE_URL}/prices?region=${region}`);
  return await response.json();
}

export async function fetchTomorrowsPrices(region: string) {
  const response = await fetch(`${API_BASE_URL}/prices/tomorrow?region=${region}`);
  return await response.json();
}
