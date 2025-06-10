import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { fetchTodaysFunFacts, fetchTodaysPrices } from "../api/api";
import * as Font from 'expo-font';
import RefreshButton from "@/components/refreshButton";
import { RefreshControl } from "react-native";
import RadioButtons from "@/components/radiobuttons";
import { formatFunFactLabel } from "../utils/formatFunFactLabel";

//TODO:

//priority:
//- restructure project, component for price card

//fun price facts
//light/dark mode ?
//translation and render the pricses in euro aswell


export default function Index() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("3");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [funFacts, setFunFacts] = useState<any[]>([]);

  useEffect(() => {
    Font.loadAsync({
      'TitilliumWeb-Regular': require('../assets/fonts/TitilliumWeb-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

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

    useEffect(() => {
    async function getData() {
      try {
        const data = await fetchTodaysFunFacts(selectedRegion);
        setFunFacts(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally { 
        setLoading(false);
      }  
    }
    getData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError(false);
    fetchTodaysPrices(selectedRegion)
      .then((data) => setPrices(data))
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const sortedPrices = prices.slice().sort((a, b) => new Date(a.time_start).getTime() - new Date(b.time_start).getTime());
  const topThreePrices = prices.slice().sort((a, b) => a.SEK_per_kWh - b.SEK_per_kWh).slice(0, 3);

  return (
    
    <View style={{ flex: 1, paddingTop: 50, }}>
      <View style={{ position: "absolute", top: 50, right: 20, zIndex: 10 }}>
        <RefreshButton onPress={handleRefresh} />
        </View>
      <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
 
        <Text style={{fontFamily: 'TitilliumWeb-Regular', fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#b9c7c5" }}>
          Todays spotprices
        </Text>
        <View style={{ width: "80%", height: 0.5, backgroundColor: "grey", marginVertical: 10 }} />
        {/* <Text style={{ fontSize: 15, marginBottom: 10, color: "white" }}>
          Region
        </Text> */}
        <RadioButtons
          selectedRegion={selectedRegion}
          onChange={setSelectedRegion}
        />
        <View style={{ width: "80%", height: 0.5, backgroundColor: "grey", marginVertical: 10 }} />
      </View>
      
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView 
          style={{ flex: 1 }} 
            refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} tintColor="#b9c7c5" />
            }
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
                  borderColor: price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#b9c7c5",
                  shadowColor: price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#b9c7c5",
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3,
                }}>
                  <Text style={{ fontSize: 18, color: "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' }}>{time}</Text>
                  <Text style={{ fontSize: 18, color: "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' }}>{price.SEK_per_kWh.toFixed(3)} SEK/kWh</Text>
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
                borderColor: price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#b9c7c5",
                shadowColor: price.SEK_per_kWh < 0.3 ? "#4CAF50" : price.SEK_per_kWh > 0.8 ? "#F44336" : "#b9c7c5",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 3,
              }}>
                <Text style={{ fontSize: 18, color: "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' }}>{time}</Text>
                <Text style={{ fontSize: 18, color: "#b9c7c5", fontFamily: 'TitilliumWeb-Regular' }}>{price.SEK_per_kWh.toFixed(3)} SEK/kWh</Text>
              </View>
            );
          })}
   
          <View style={{ width: "80%", height: 0.5, backgroundColor: "grey", marginVertical: 10, marginTop: 30 }} />

          <Text style={{ fontSize: 15, fontFamily: 'TitilliumWeb-Regular', fontWeight: "bold",  color: "#b9c7c5" }}>Fun facts:</Text>
            <View style={{ marginVertical: 20, width: "90%" }}>
            {Object.entries(funFacts).map(([key, val]) => (
              <View
                key={key}
                style={{
                  backgroundColor: "#2b2b2b",
                  borderRadius: 7,
                  padding: 10,
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#b9c7c5",
                  shadowColor: "#b9c7c5",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontFamily: 'TitilliumWeb-Regular',
                  color: "#b9c7c5",
                }}>
                  {formatFunFactLabel(key)}
                </Text>
                <Text style={{
                  fontSize: 16,
                  fontFamily: 'TitilliumWeb-Regular',
                  color: "#b9c7c5",
                }}>
                  {val.toFixed(2)} kr
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
