//Logic for the api calls

//region is 3 by default
export async function fetchTodaysPrices(region: string = "3") {
    const response = await fetch(`http://192.168.68.103:8080/prices?region=${region}`);
    return await response.json();
}

//region is 3 by default
export async function fetchTomorrowsPrices(region: string = "3") {
    const response = await fetch(`http://192.168.68.103:8080/prices/tomorrow?region=${region}`);
    return await response.json();
}