import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { fetchTomorrowsPrices } from "./api/api";
import RadioGroup from "react-native-radio-buttons-group";


export default function Tomorrow() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("3");

  const radioButtons = [
    { id: "1", label: "SE1", value: "1" },
    { id: "2", label: "SE2", value: "2" },
    { id: "3", label: "SE3", value: "3" },
    { id: "4", label: "SE4", value: "4" },
  ];  
  
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchTomorrowsPrices(selectedRegion);
        setPrices(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally { 
        setLoading(false);
    }  
  }
    getData();
  }, [selectedRegion]);

    
  return (
    <View style={{ flex: 1, paddingTop: 50, justifyContent: "center", alignItems: "center" }}>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={(value: string) => setSelectedRegion(value)}
        selectedId={selectedRegion}
        layout="row"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={{ flex: 1, maxHeight: 600 }} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "black" }}>Tomorrows spotprices per hour</Text>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
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

