import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";

export default function Index() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.68.108:8080/prices")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data); // Kolla om det finns några priser
      setPrices(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching prices:", error);
      setLoading(false);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    > 
    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      prices.map((price, index) => (
        <Text key={index} style={{ fontSize: 18, marginBottom: 10 }}>
          {new Date(price.time_start).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })}: {Math.round(price.SEK_per_kWh * 100)} öre/kWh
        </Text>
        ))
      )}
    </View>
  );
}
