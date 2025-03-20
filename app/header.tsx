import { Image } from "react-native";

export default function Header() {
  return (
    <Image 
        source={require("../assets/images/CurrentPrice.png")} 
        style={{ width: "100%", height: 100, resizeMode: "contain" }} 
    />
  );
}