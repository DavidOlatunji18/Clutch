//Name: David Olatunji

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import background from '../../assets/ronaldobg.jpg';
import { useFonts } from 'expo-font'; 

export default function HomeScreen({ navigation }) { //Added navigation prop
  const [fontsLoaded] = useFonts({
    ModernAntiqua: require('../../assets/fonts/ModernAntiqua-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        imageStyle={styles.image}
        source={background}
        resizeMode="cover"
      >
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeMessage}>CLUTCH</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Main')} //Navigate to MainContainer
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
  },
  welcomeMessage: {
    textAlign: 'center',
    fontSize: 55,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10,
    marginBottom: 20,
    fontFamily: 'ModernAntiqua', 
  },
  button: {
    marginBottom: 40,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#e6c518',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'ModernAntiqua',
  },
});
