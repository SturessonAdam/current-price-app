import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { fetchTomorrowsPrices } from "../api/api";
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

  const sortedPrices = prices.slice().sort((a, b) => new Date(a.time_start).getTime() - new Date(b.time_start).getTime());
  const topThreePrices = prices.slice().sort((a, b) => a.SEK_per_kWh - b.SEK_per_kWh).slice(0, 3);

  return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={(value: string) => setSelectedRegion(value)}
            selectedId={selectedRegion}
            layout="row"
          />
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView 
            style={{ flex: 1 }} 
            contentContainerStyle={{ justifyContent: "center", alignItems: "center", paddingBottom: 20 }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "black" }}>
              Tomorrows spot prices
            </Text>
  
            {error && <Text style={{ color: "red" }}>{error}</Text>}
  
            <View style={{ width: '90%', marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>🔝 Top 3 cheapest hours:</Text>
              {topThreePrices.map((price, index) => {
                const time = new Date(price.time_start).toLocaleTimeString("sv-SE", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <View key={index} style={{
                    backgroundColor: "#E8F5E9",
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                  }}>
                    <Text style={{ fontSize: 18, color: "#2E7D32" }}>{time}</Text>
                    <Text style={{ fontSize: 18, color: "#2E7D32" }}>{price.SEK_per_kWh.toFixed(3)} SEK/kWh</Text>
                  </View>
                );
              })}
            </View>
            <View style={{ width: "80%", height: 1, backgroundColor: "black", marginVertical: 10 }} />

            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>All hours:</Text>
            {sortedPrices.map((price, index) => {
              const time = new Date(price.time_start).toLocaleTimeString("sv-SE", {
                hour: "2-digit",
                minute: "2-digit",
              });
  
              const priceColor = price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#333";
              const backgroundColor = price.SEK_per_kWh < 0.3 ? "#E8F5E9" : price.SEK_per_kWh > 0.8 ? "#FFEBEE" : "#F5F5F5";
  
              return (
                <View key={index} style={{
                  width: '90%',
                  backgroundColor: backgroundColor,
                  borderRadius: 10,
                  padding: 10,
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3,
                }}>
                  <Text style={{ fontSize: 18, color: "#333" }}>{time}</Text>
                  <Text style={{ fontSize: 18, color: priceColor }}>{price.SEK_per_kWh.toFixed(3)} SEK/kWh</Text>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
  

