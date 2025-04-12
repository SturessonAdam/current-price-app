
export async function fetchTodaysPrices(region: string) {
    const response = await fetch(`http://192.168.68.108:8080/prices?region=${region}`);
    return await response.json();
}

export async function fetchTomorrowsPrices(region: string) {
    const response = await fetch(`http://192.168.68.108:8080/prices/tomorrow?region=${region}`);
    return await response.json();
}