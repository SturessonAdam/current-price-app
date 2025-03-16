import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={{ maxHeight: 400 }} contentContainerStyle={{ alignItems: "center" }}>
          {prices
            .sort((a, b) => new Date(a.time_start).getTime() - new Date(b.time_start).getTime())
            .map((price, index) => {
              const time = new Date(price.time_start).toLocaleTimeString("sv-SE", {
                hour: "2-digit",
                minute: "2-digit",
              });
  
              const priceColor = price.SEK_per_kWh < 0 ? "red" : "black";
  
              return (
                <Text key={index} style={{ fontSize: 18, marginBottom: 10, color: priceColor }}>
                  {time} → {price.SEK_per_kWh.toFixed(5)} SEK/kWh
                </Text>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
}
