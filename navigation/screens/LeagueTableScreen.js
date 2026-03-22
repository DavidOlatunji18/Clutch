import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext'; 
import { API_FOOTBALL_KEY } from '@env';


export default function LeagueTableScreen({ route, navigation }) {
  const { leagueId, leagueName, country } = route.params;
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ 
            fontFamily: 'ModernAntiqua', 
            fontSize: 20, 
            color: theme === 'dark' ? '#e6c518' : '#e6c518'  
          }}>
            {leagueName}
          </Text>
          <Text style={{ 
            fontFamily: 'ModernAntiqua', 
            fontSize: 14, 
            color: theme === 'dark' ? '#aaa' : '#888' 
          }}>
            {country}
          </Text>
        </View>
      ),
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', //dark background
      },
      headerTintColor: theme === 'dark' ? '#e6c518' : '#e6c518', //back arrow color
    });
  }, [navigation, leagueName, country, theme]); 

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=2024`, {
          method: 'GET',
          headers: {
            'x-apisports-key': API_FOOTBALL_KEY,
          },
        });

        const data = await response.json();
        if (data.response.length > 0) {
          setStandings(data.response[0].league.standings[0]);
        } else {
          console.error('No standings found.');
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [leagueId]);

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#121212' : 'white',
    },
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : 'white',
      paddingHorizontal: 10,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#eee',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginBottom: 5,
    },
    headerText: {
      fontFamily: 'ModernAntiqua',
      fontSize: 13,
      textAlign: 'center',
      color: theme === 'dark' ? '#e6c518' : '#333',
    },
    rankAndTeam: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: theme === 'dark' ? '#333' : '#f1f1f1',
    },
    cell: {
      fontFamily: 'ModernAntiqua',
      color: theme === 'dark' ? '#eee' : '#333',
      fontSize: 13,
      textAlign: 'center',
    },
    teamCell: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 5,
    },
    logo: {
      width: 20,
      height: 20,
      marginRight: 5,
      resizeMode: 'contain',
    },
    teamName: {
      fontFamily: 'ModernAntiqua',
      fontSize: 13,
      color: theme === 'dark' ? '#eee' : '#333',
    },
    pointsCell: {
      color: '#e6c518', //Keep points gold in both light and dark mode
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e6c518" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.rankAndTeam}>
          <Text style={[styles.headerText, { width: 25 }]}>#</Text>
          <Text style={[styles.headerText, { marginLeft: 5 }]}>Team</Text>
        </View>
        <Text style={[styles.headerText, { width: 30 }]}>P</Text>
        <Text style={[styles.headerText, { width: 30 }]}>W</Text>
        <Text style={[styles.headerText, { width: 30 }]}>D</Text>
        <Text style={[styles.headerText, { width: 30 }]}>L</Text>
        <Text style={[styles.headerText, { width: 40 }]}>GD</Text>
        <Text style={[styles.headerText, { width: 40 }]}>PTS</Text>
      </View>

      {/* Teams List */}
      <FlatList
        data={standings}
        keyExtractor={(item) => item.team.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.rankAndTeam}>
              <Text style={[styles.cell, { width: 25 }]}>{item.rank}</Text>
              <View style={styles.teamCell}>
                <Image source={{ uri: item.team.logo }} style={styles.logo} />
                <Text style={styles.teamName}>{item.team.name}</Text>
              </View>
            </View>
            <Text style={[styles.cell, { width: 30 }]}>{item.all.played}</Text>
            <Text style={[styles.cell, { width: 30 }]}>{item.all.win}</Text>
            <Text style={[styles.cell, { width: 30 }]}>{item.all.draw}</Text>
            <Text style={[styles.cell, { width: 30 }]}>{item.all.lose}</Text>
            <Text style={[styles.cell, { width: 40 }]}>{item.goalsDiff}</Text>
            <Text style={[styles.cell, styles.pointsCell, { width: 40 }]}>{item.points}</Text>
          </View>
        )}
      />
    </View>
  );
}
