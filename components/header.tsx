import { View, Image, StyleSheet  } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
        <Image 
            source={require("../assets/images/CurrentPriceHeader.png")} 
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
      borderBottomWidth: 0.1,
      borderBottomColor: "grey", 
    },
    headerImage: {
      width: "100%",
      height: "100%",
      resizeMode: "stretch",
    },
  });