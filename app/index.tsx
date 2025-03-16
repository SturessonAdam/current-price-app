import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";

//TODO:
//move API fetch logic to seperate component
//more components for different API calls?
//fix UI
//grafs/charts for visualazing data
//header with navigation

export default function Index() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.68.108:8080/prices")
    .then((response) => response.json())
    .then((data) => {
      setPrices(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching prices:", error);
      setLoading(false);
    });
  }, []);

  return (
    <View style={{ flex: 1}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={{ flex: 1, maxHeight: 600 }} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Todays spotprices per hour</Text>
          {prices
            .sort((a, b) => new Date(a.time_start).getTime() - new Date(b.time_start).getTime())
            .map((price, index) => {
              const time = new Date(price.time_start).toLocaleTimeString("sv-SE", {
                hour: "2-digit",
                minute: "2-digit",
              });
  
              const priceColor = price.SEK_per_kWh < 0 ? "red" : "black";
  
              return (
                <Text key={index} style={{ fontSize: 20, marginBottom: 5, color: priceColor }}>
                  {time} → {price.SEK_per_kWh.toFixed(5)} SEK/kWh
                </Text>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
}
