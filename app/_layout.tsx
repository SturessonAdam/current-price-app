import React from "react";
import { Stack, Tabs } from "expo-router";
import Header from "./header";

export default function RootLayout() {
  return (
  <>
    <Header/>
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Todays spotprices" }} />
      <Tabs.Screen name="tomorrow" options={{ title: "Tomorrows spotprices" }} />
    </Tabs>
  </>
  )
}
