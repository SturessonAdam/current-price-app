import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { fetchTodaysPrices } from "./api/api";
import RadioGroup from "react-native-radio-buttons-group";

//TODO:
//improve the ui generally
//grafs/charts for visualazing data - react-native-gifted-charts?
//add a refresh button
//fun price facts
//deploy backend and change in api.ts to prod url


export default function Index() {
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
        const data = await fetchTodaysPrices(selectedRegion);
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
    <View style={{ flex: 1, paddingTop: 50 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
          style={{ flex: 1, maxHeight: 600 }} 
          contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "black" }}>
            Todays spotprices per hour
          </Text>
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
