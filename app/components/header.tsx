import { View, Image, StyleSheet  } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
        <Image 
            source={require("../../assets/images/CurrentPrice.png")} 
            style={styles.headerImage}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
      position: "absolute",
      top: 0,
      width: "100%",
      height: 100, 
      zIndex: 10, 
    },
    headerImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
  });