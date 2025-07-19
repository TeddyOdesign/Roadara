import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Your Mapbox token
MapboxGL.setAccessToken('pk.eyJ1IjoidGVkZHlvYnJpZW4iLCJhIjoiY21kOXJhb3BmMGE3ZDJ4cHphdzE5ZjRlOCJ9.CvcrhBHWUp0aYglUXYivng');

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [scenicSpots, setScenicSpots] = useState([]);
  const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    getCurrentLocation();
    loadScenicSpots();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow location access to find scenic routes');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      longitude: currentLocation.coords.longitude,
      latitude: currentLocation.coords.latitude,
    });
  };

  const loadScenicSpots = async () => {
    // TODO: Load from Supabase
    // For now, mock data
    setScenicSpots([
      {
        id: 1,
        coordinates: [-122.4194, 37.7749],
        title: 'Golden Gate Bridge',
        scenic_score: 9.2,
      },
      {
        id: 2,
        coordinates: [-122.4683, 37.8199],
        title: 'Alcatraz Island View',
        scenic_score: 8.7,
      },
    ]);
  };

  const findScenicRoute = () => {
    setIsRouting(true);
    // TODO: Implement scenic routing algorithm
    Alert.alert('Coming Soon', 'Scenic route finding is being developed!');
    setIsRouting(false);
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Icon name="explore" size={48} color="#2E8B57" />
        <Text style={styles.loadingText}>Finding your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={10}
          centerCoordinate={[location.longitude, location.latitude]}
        />
        <MapboxGL.UserLocation />
        
        {/* Render scenic spots */}
        {scenicSpots.map((spot) => (
          <MapboxGL.PointAnnotation
            key={spot.id}
            id={`spot-${spot.id}`}
            coordinate={spot.coordinates}
          >
            <View style={styles.markerContainer}>
              <Icon name="photo-camera" size={20} color="#2E8B57" />
            </View>
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Roadara</Text>
        <Text style={styles.headerSubtitle}>Find your scenic route</Text>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={findScenicRoute}
        disabled={isRouting}
      >
        <Icon 
          name={isRouting ? "hourglass-empty" : "explore"} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  map: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  markerContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#2E8B57',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#2E8B57',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default MapScreen;
