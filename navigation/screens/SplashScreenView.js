import { Image, StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import Icon from "../../assets/IMG_0340.jpg";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={Icon} style={styles.image} />
      
      {/* Fake Loading Spinner */}
      <ActivityIndicator size="large" color="#e6c518" style={styles.loading} />
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 1.0,
    height: width * 1.0,
    resizeMode: "contain",
  },
  loading: {
    position: 'absolute',
    bottom: 150, 
  },
});

