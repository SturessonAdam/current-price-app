import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
    <Tabs.Screen name="index" options={{ title: "Dagens Elpriser" }} />
    <Tabs.Screen name="tomorrow" options={{ title: "Morgondagens Elpriser" }} />
  </Tabs>
  )
}
