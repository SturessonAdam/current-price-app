import React from "react";
import { Stack, Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import Header from "./header";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Header/>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "Todays spotprices" }} />
        <Tabs.Screen name="tomorrow" options={{ title: "Tomorrows spotprices" }} />
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212"
  },
});

