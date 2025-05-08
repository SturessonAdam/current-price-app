import React from "react";
import { Stack, Tabs } from "expo-router";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import Header from "../components/header";
import { FontAwesome } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1f1f24" barStyle="light-content" />
      <Header />
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: "#1f1f24" },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "grey",
          sceneStyle: { backgroundColor: "#1f1f24" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ fontSize: 10, fontFamily: "SpaceMono-Regular", color }}>
                Todays spotprices
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="bolt" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tomorrow"
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ fontSize: 10, fontFamily: "SpaceMono-Regular", color }}>
                Tomorrows spotprices
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="calendar" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f24",
  },
});
