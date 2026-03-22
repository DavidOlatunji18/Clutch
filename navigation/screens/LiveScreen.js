import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../ThemeContext'; 
import { API_FOOTBALL_KEY } from '@env';


export default function LiveScreen() {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [groupedMatches, setGroupedMatches] = useState([]);

  useEffect(() => {
    const fetchLiveGames = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
          headers: {
            'x-apisports-key': API_FOOTBALL_KEY,
          },
        });

        const data = await response.json();

        if (data.response && data.response.length > 0) {
          const grouped = data.response.reduce((acc, match) => {
            const key = `${match.league.country} - ${match.league.name}`;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(match);
            return acc;
          }, {});

          const groupedArray = Object.keys(grouped)
            .map((key) => ({
              leagueTitle: key,
              matches: grouped[key],
              country: key.split(' - ')[0],
            }))
            .sort((a, b) => a.country.localeCompare(b.country)); //Sorting by country

          setGroupedMatches(groupedArray);
        } else {
          setGroupedMatches([]);
        }

      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveGames();
  }, []);

  const renderMatch = (match, index, matches) => {
    const minute = match.fixture.status.elapsed !== null ? `${match.fixture.status.elapsed}'` : 'NS';
    const homeTeam = match.teams.home;
    const awayTeam = match.teams.away;
    const homeGoals = match.goals.home;
    const awayGoals = match.goals.away;

    return (
      <View key={match.fixture.id}>
        <View style={[styles.matchRow, { backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5' }]}>
          <Text style={[styles.minute, { color: theme === 'dark' ? '#e6c518' : 'green' }]}>{minute}</Text>

          <View style={styles.teamContainer}>
            <Image source={{ uri: homeTeam.logo }} style={styles.teamLogo} />
            <Text style={[styles.teamName, { color: theme === 'dark' ? 'white' : '#333' }]}>{homeTeam.name}</Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{homeGoals} - {awayGoals}</Text>
          </View>

          <View style={styles.teamContainer}>
            <Image source={{ uri: awayTeam.logo }} style={styles.teamLogo} />
            <Text style={[styles.teamName, { color: theme === 'dark' ? 'white' : '#333' }]}>{awayTeam.name}</Text>
          </View>
        </View>

        {index !== matches.length - 1 && <View style={styles.matchDivider} />}
      </View>
    );
  };

  const renderLeague = ({ item }) => (
    <View style={styles.leagueContainer}>
      <View style={styles.leagueBanner}>
        <Text style={[styles.leagueText, { color: theme === 'dark' ? 'white' : '#333' }]}>
          {item.leagueTitle}
        </Text>
      </View>

      {item.matches.map((match, index) => renderMatch(match, index, item.matches))}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme === 'dark' ? '#121212' : 'white' }]}>
        <ActivityIndicator size="large" color="#e6c518" />
      </View>
    );
  }

  return (
    <FlatList
      data={groupedMatches}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderLeague}
      contentContainerStyle={{
        paddingBottom: 20,
        backgroundColor: theme === 'dark' ? '#121212' : 'white',
      }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leagueContainer: {
    marginBottom: 20,
  },
  leagueBanner: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 10,
  },
  leagueText: {
    fontFamily: 'ModernAntiqua',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  minute: {
    width: 30,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'ModernAntiqua',
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  teamLogo: {
    width: 25,
    height: 25,
    marginRight: 6,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 14,
    flexShrink: 1,
    fontFamily: 'ModernAntiqua',
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e6c518',
    fontFamily: 'ModernAntiqua',
  },
  matchDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    opacity: 0.4,
  },
});
