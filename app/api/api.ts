//Logic for the api calls

//region is 3 by default
export async function fetchTodaysPrices() {
    const response = await fetch("http://192.168.68.108:8080/prices");
    return await response.json();
}

//region is 3 by default
export async function fetchTomorrowsPrices() {
    const response = await fetch("http://192.168.68.108:8080/prices/tomorrow");
    return await response.json();
}
  