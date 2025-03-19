import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
    <Tabs.Screen name="index" options={{ title: "Todays spotprices" }} />
    <Tabs.Screen name="tomorrow" options={{ title: "Tomorrows spotprices" }} />
  </Tabs>
  )
}
