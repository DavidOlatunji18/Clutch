import React, { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import LiveScreen from './screens/LiveScreen';
import LeagueScreen from './screens/LeagueScreen';
import StatScreen from './screens/StatScreen';

const liveName = "Live";
const leagueName = "Leagues";
const statName = "Stats";

const Tab = createBottomTabNavigator();

function MainContainer() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  const isDark = theme === 'dark';

  return (
    <>
      <Tab.Navigator
        initialRouteName={liveName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === liveName) {
              iconName = focused ? 'football' : 'football-outline';
            } else if (rn === leagueName) {
              iconName = focused ? 'trophy' : 'trophy-outline';
            } else if (rn === statName) {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e6c518',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 15, fontFamily: 'ModernAntiqua' },
          tabBarStyle: { padding: 20, height: 85, backgroundColor: isDark ? '#111' : '#fff' },
          headerStyle: { backgroundColor: isDark ? '#111' : '#fff' },
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: 'ModernAntiqua',
            fontSize: 24,
            color: '#e6c518',
            marginLeft: 10,
          },
          headerRight: () => (
            <Ionicons 
              name="settings-outline" 
              size={24} 
              color="#e6c518" 
              style={{ marginRight: 20 }}
              onPress={() => setModalVisible(true)}
            />
          ),
        })}
      >
        <Tab.Screen name={liveName} component={LiveScreen} />
        <Tab.Screen name={leagueName} component={LeagueScreen} />
        <Tab.Screen name={statName} component={StatScreen} />
      </Tab.Navigator>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={{
            backgroundColor: isDark ? '#1a1a1a' : 'white',
            padding: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
            <Text style={{
              fontFamily: 'ModernAntiqua',
              fontSize: 18,
              marginBottom: 20,
              textAlign: 'center',
              color: '#e6c518',
            }}>
              Select Theme
            </Text>

            {/* Light Mode */}
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                toggleTheme('light');
                setModalVisible(false);
              }}
            >
              <Ionicons 
                name={theme === 'light' ? 'radio-button-on' : 'radio-button-off'} 
                size={24} 
                color="#e6c518" 
              />
              <Text style={{
                fontFamily: 'ModernAntiqua',
                fontSize: 16,
                marginLeft: 10,
                color: isDark ? '#e6e6e6' : '#333',
              }}>
                Light Mode
              </Text>
            </TouchableOpacity>

            {/* Dark Mode */}
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                toggleTheme('dark');
                setModalVisible(false);
              }}
            >
              <Ionicons 
                name={theme === 'dark' ? 'radio-button-on' : 'radio-button-off'} 
                size={24} 
                color="#e6c518" 
              />
              <Text style={{
                fontFamily: 'ModernAntiqua',
                fontSize: 16,
                marginLeft: 10,
                color: isDark ? '#e6e6e6' : '#333',
              }}>
                Dark Mode
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 15 }}>
              <Text style={{
                color: '#e6c518',
                fontFamily: 'ModernAntiqua',
                fontSize: 18,
                textAlign: 'center',
              }}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default MainContainer;
