import React from "react";
import { Stack, Tabs } from "expo-router";
import { StyleSheet, View, StatusBar } from "react-native";
import Header from "../components/header";
import { FontAwesome } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6f839b" barStyle="light-content" />
      <Header/>
      <Tabs
        screenOptions=
        {{
        tabBarStyle: { backgroundColor: "#6f839b" },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#c2c2d6", 
        sceneStyle: { backgroundColor: "#c2c2d6" },
        }}
      >
        <Tabs.Screen
          name="index"
          options=
          {{ title: "Todays spotprices",
             tabBarIcon: ({ color, size }) => (
              <FontAwesome name="bolt" size={size} color={color} /> ),
          }}
        />
        <Tabs.Screen
          name="tomorrow"
          options=
          {{ title: "Tomorrows spotprices",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="calendar" size={size} color={color} /> ),
           }}
        />
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6f839b",
  },
});

