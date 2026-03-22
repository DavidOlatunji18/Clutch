import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext'; 
import { API_FOOTBALL_KEY } from '@env';


export default function LeagueStatScreen({ route, navigation }) {
  const { leagueId, leagueName, country } = route.params;
  const { theme } = useContext(ThemeContext); 
  const [topScorers, setTopScorers] = useState([]);
  const [topAssists, setTopAssists] = useState([]);
  const [loading, setLoading] = useState(true);

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
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', //background of header
      },
      headerTintColor: theme === 'dark' ? '#e6c518' : '#e6c518', //back arrow color
    });
  }, [navigation, leagueName, country, theme]);
  

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [scorersResponse, assistsResponse] = await Promise.all([
          fetch(`https://v3.football.api-sports.io/players/topscorers?league=${leagueId}&season=2024`, {
            method: 'GET',
            headers: { 'x-apisports-key': API_FOOTBALL_KEY, },
          }),
          fetch(`https://v3.football.api-sports.io/players/topassists?league=${leagueId}&season=2024`, {
            method: 'GET',
            headers: { 'x-apisports-key': API_FOOTBALL_KEY, },
          }),
        ]);

        const scorersData = await scorersResponse.json();
        const assistsData = await assistsResponse.json();

        if (scorersData.response) setTopScorers(scorersData.response.slice(0, 10));
        if (assistsData.response) setTopAssists(assistsData.response.slice(0, 10));
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [leagueId]);

  //Dynamic styles moved inside the component so theme updates when toggled
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
      paddingTop: 10,
    },
    sectionTitle: {
      fontFamily: 'ModernAntiqua',
      fontSize: 18,
      marginVertical: 10,
      textAlign: 'center',
      color: theme === 'dark' ? '#e6e6e6' : '#333',
    },
    playerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 6,
      paddingHorizontal: 10,
    },
    rank: {
      fontFamily: 'ModernAntiqua',
      fontSize: 14,
      width: 20,
      textAlign: 'center',
      color: theme === 'dark' ? '#ccc' : '#555',
    },
    playerName: {
      flex: 3,
      fontFamily: 'ModernAntiqua',
      fontSize: 14,
      color: theme === 'dark' ? '#e6e6e6' : '#333',
    },
    teamLogo: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      marginHorizontal: 10,
    },
    statValue: {
      flex: 1,
      fontFamily: 'ModernAntiqua',
      fontSize: 14,
      textAlign: 'center',
    },
    divider: {
      height: 1,
      backgroundColor: theme === 'dark' ? '#333' : '#ccc',
      marginVertical: 15,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e6c518" />
      </View>
    );
  }

  const renderPlayerItem = ({ item, index, type }) => (
    <View style={styles.playerRow}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <Text style={styles.playerName}>{item.player.name}</Text>
      <Image source={{ uri: item.statistics[0].team.logo }} style={styles.teamLogo} />
      <Text style={[
        styles.statValue,
        { color: type === 'goals' ? '#e6c518' : '#1e90ff' }
      ]}>
        {type === 'goals' ? item.statistics[0].goals.total : item.statistics[0].goals.assists ?? 0}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Top 10 Goal Scorers</Text> 
      <FlatList
        data={topScorers}
        keyExtractor={(item) => item.player.id.toString()}
        renderItem={({ item, index }) => renderPlayerItem({ item, index, type: 'goals' })}
      />
      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>Top 10 Assist Providers</Text>
      <FlatList
        data={topAssists}
        keyExtractor={(item) => item.player.id.toString() + '-assist'}
        renderItem={({ item, index }) => renderPlayerItem({ item, index, type: 'assists' })}
      />
    </View>
  );
}
