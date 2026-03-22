import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { leagues } from './leagues'; 
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext'; 

export default function StatScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); //Get current theme

  //Sorting leagues in alphabetical order
  const sortedLeagues = leagues.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#121212' : '#fff' }]}>
      <FlatList
        data={sortedLeagues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.leagueItem, { backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f9f9f9' }]}
            onPress={() =>
              navigation.navigate('LeagueStats', {
                leagueId: item.id,
                leagueName: item.name,
                country: item.country,
              })
            }
          >
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <Text style={[styles.leagueText, { color: theme === 'dark' ? '#e6c518' : '#e6c518' }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  leagueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
    fontFamily: 'ModernAntiqua',
  },
  separator: {
    height: 10,
  },
});
