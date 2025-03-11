import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.characterImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.statusContainer}>
          <View 
            style={[
              styles.statusDot, 
              { backgroundColor: item.status === 'Alive' ? '#4AB696' : item.status === 'Dead' ? '#D63D2E' : '#508B7A' }
            ]} 
          />
          <Text style={styles.status}>
            {item.status} - {item.species}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4AB696" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25332F',
    padding: 16,
  },
  listContainer: {
    paddingVertical: 8,
  },
  card: {
    backgroundColor: '#486159',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  characterImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  status: {
    fontSize: 14,
    color: '#ffffff',
  },
  locationLabel: {
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  locationName: {
    fontSize: 14,
    color: '#ffffff',
  },
});
