import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { leagues } from './leagues';
import { ThemeContext } from '../ThemeContext'; 

export default function LeagueScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  
  //Sorting leagues in alphabetical order
  const sortedLeagues = leagues.sort((a, b) => a.name.localeCompare(b.name));

  //Dynamic styles based on theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#fff',
      padding: 10,
    },
    leagueItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f9f9f9',
      borderRadius: 8,
    },
    logo: {
      width: 30,
      height: 30,
      marginRight: 15,
      resizeMode: 'contain',
    },
    leagueText: {
      fontSize: 16,
      fontWeight: '800',
      color: '#e6c518', 
      fontFamily: 'ModernAntiqua',
    },
    separator: {
      height: 10,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedLeagues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.leagueItem}
            onPress={() =>
              navigation.navigate('LeagueTable', {
                leagueId: item.id,
                leagueName: item.name,
                country: item.country,
              })
            }
          >
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <Text style={styles.leagueText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
