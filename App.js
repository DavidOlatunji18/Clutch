import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from "react";

import SplashScreen from './navigation/screens/SplashScreenView';
import LeagueTableScreen from './navigation/screens/LeagueTableScreen';
import LeagueStatScreen from './navigation/screens/LeagueStatScreen';
import HomeScreen from './navigation/screens/HomeScreen';
import MainContainer from './navigation/MainContainer';
import { ThemeProvider } from './navigation/ThemeContext'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 1000);
  }, []);

  if (isShowSplash) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* Home screen (Landing) */}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />

          {/* Main Bottom Tab Screens */}
          <Stack.Screen 
            name="Main" 
            component={MainContainer} 
            options={{ headerShown: false }} 
          />

          {/* League Table Page */}
          <Stack.Screen 
            name="LeagueTable" 
            component={LeagueTableScreen} 
            options={({ route }) => ({
              title: `${route.params?.leagueName} - ${route.params?.country}`,
              headerBackTitle: 'Back',
              headerTitleStyle: {
                fontFamily: "ModernAntiqua",
                fontSize: 20,
                color: "#e6c518",
              },
              headerTintColor: "#e6c518",
            })}
          />

          {/* League Stats Page (Top Scorers & Assists) */}
          <Stack.Screen 
            name="LeagueStats" 
            component={LeagueStatScreen} 
            options={({ route }) => ({
              title: `${route.params?.leagueName} - ${route.params?.country}`,
              headerBackTitle: 'Back',
              headerTitleStyle: {
                fontFamily: "ModernAntiqua",
                fontSize: 20,
                color: "#e6c518",
              },
              headerTintColor: "#e6c518",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider> 
  );
}
