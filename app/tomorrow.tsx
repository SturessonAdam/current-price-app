import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchTomorrowsPrices } from "./api/api";


export default function tomorrow() {
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function getData() {
      const data = await fetchTomorrowsPrices();
      setPrices(data);
      setLoading(false);
    }
    getData();
  }, []);

    
  return (
    <View style={{ flex: 1, paddingTop: 50}}>
        <Text style={{color: "black"}}>Here should tomorrows spotprices render</Text>
    </View>
  );
}

