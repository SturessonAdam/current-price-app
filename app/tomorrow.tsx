import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { fetchTomorrowsPrices } from "../api/api";
import RadioGroup from "react-native-radio-buttons-group";
import RefreshButton from "@/components/refreshButton";
import * as Font from 'expo-font';

export default function Tomorrow() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("3");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const createRadioButtons = (selectedId: string) => [
    { id: "1", label: "SE1", value: "1", color: "#b9c7c5", labelStyle: { color: selectedId === "1" ? "#ffffff" : "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' } },
    { id: "2", label: "SE2", value: "2", color: "#b9c7c5", labelStyle: { color: selectedId === "2" ? "#ffffff" : "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' } },
    { id: "3", label: "SE3", value: "3", color: "#b9c7c5", labelStyle: { color: selectedId === "3" ? "#ffffff" : "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' } },
    { id: "4", label: "SE4", value: "4", color: "#b9c7c5", labelStyle: { color: selectedId === "4" ? "#ffffff" : "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' } },
  ];

  useEffect(() => {
    Font.loadAsync({
      'TitilliumWeb-Regular': require('../assets/fonts/TitilliumWeb-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

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
    
    <View style={{ flex: 1, paddingTop: 50, }}>
      <View style={{ position: "absolute", top: 50, right: 20, zIndex: 10 }}>
          <RefreshButton onPress={() => {
            setLoading(true);
            setError(false);
            fetchTomorrowsPrices(selectedRegion)
              .then(data => setPrices(data))
              .catch(err => {
                console.error(err);
                setError(true);
              })
              .finally(() => setLoading(false));
          }} />
        </View>
      <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
 
        <Text style={{fontFamily: 'TitilliumWeb-Regular', fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#b9c7c5" }}>
          Tomorrows spotprices
        </Text>
        <View style={{ width: "80%", height: 0.5, backgroundColor: "grey", marginVertical: 10 }} />
        {/* <Text style={{ fontSize: 15, marginBottom: 10, color: "white" }}>
          Region
        </Text> */}
        <RadioGroup
          radioButtons={createRadioButtons(selectedRegion)}
          onPress={(value: string) => setSelectedRegion(value)}
          selectedId={selectedRegion}
          layout="row"
        />
        <View style={{ width: "80%", height: 0.5, backgroundColor: "grey", marginVertical: 10 }} />
      </View>
      
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ justifyContent: "center", alignItems: "center", paddingBottom: 20 }}
        >
          {error && <Text style={{ color: "red" }}>{error}</Text>}

          <Text style={{ fontSize: 15, fontFamily: 'TitilliumWeb-Regular', fontWeight: "bold", marginBottom: 10, color: "#b9c7c5" }}>Top 3 cheapest hours:</Text>
          <View style={{ width: '90%', marginBottom: 20 }}>
            {topThreePrices.map((price, index) => {
              const time = new Date(price.time_start).toLocaleTimeString("sv-SE", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <View key={index} style={{
                  backgroundColor: "#2b2b2b",
                  borderRadius: 7,
                  padding: 10,
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#ccc",
                  shadowColor: price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#ccc",
                  shadowOffset: { width: 1, height: 3 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3,
                }}>
                  <Text style={{ fontSize: 18, color: "#e0e0e0", fontFamily: 'TitilliumWeb-Regular' }}>{time}</Text>
                  <Text style={{ fontSize: 18, color: "#e0e0e0", fontFamily: 'TitilliumWeb-Regular' }}>{price.SEK_per_kWh.toFixed(3)} SEK/kWh</Text>
                </View>
              );
            })}
          </View>
          <View style={{ width: "80%", height: 0.5, backgroundColor: "grey", marginVertical: 10 }} />

          <Text style={{ fontSize: 15, fontFamily: 'TitilliumWeb-Regular', fontWeight: "bold", marginBottom: 10, color: "#b9c7c5" }}>All hours:</Text>
          {sortedPrices.map((price, index) => {
            const time = new Date(price.time_start).toLocaleTimeString("sv-SE", {
              hour: "2-digit",
              minute: "2-digit",
            });

            // const priceColor = price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#1f1f24";
            // const backgroundColor = price.SEK_per_kWh < 0.3 ? "#E8F5E9" : price.SEK_per_kWh > 0.8 ? "#FFEBEE" : "#F5F5F5";

            return (
              <View key={index} style={{
                width: '90%',
                backgroundColor: "#2b2b2b",
                borderRadius: 7,
                padding: 10,
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: 1,
                borderColor: price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#ccc",
                shadowColor: price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#ccc",
                shadowOffset: { width: 2, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 3,
              }}>
                <Text style={{ fontSize: 18, color: "#e0e0e0", fontFamily: 'TitilliumWeb-Regular' }}>{time}</Text>
                <Text style={{ fontSize: 18, color: "#e0e0e0", fontFamily: 'TitilliumWeb-Regular' }}>{price.SEK_per_kWh.toFixed(3)} SEK/kWh</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

