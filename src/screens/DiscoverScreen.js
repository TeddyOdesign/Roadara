import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { supabase } from '../services/supabase';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DiscoverScreen = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedRoutes();
  }, []);

  const loadFeaturedRoutes = async () => {
    // TODO: Load from Supabase
    setRoutes([
      {
        id: 1,
        title: 'Pacific Coast Highway',
        description: 'Stunning coastal views and clifftop vistas along California\'s iconic coastline',
        scenic_score: 9.8,
        distance: 120,
        duration: 180,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        tags: ['coastal', 'sunset', 'photography'],
      },
      {
        id: 2,
        title: 'Blue Ridge Parkway',
        description: 'Mountain peaks and autumn colors through the Appalachian Mountains',
        scenic_score: 9.5,
        distance: 85,
        duration: 120,
        image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
        tags: ['mountains', 'fall foliage', 'hiking'],
      },
      {
        id: 3,
        title: 'Going-to-the-Sun Road',
        description: 'Breathtaking alpine scenery through Glacier National Park',
        scenic_score: 9.7,
        distance: 50,
        duration: 90,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        tags: ['alpine', 'wildlife', 'glacier'],
      },
    ]);
    setLoading(false);
  };

  const renderRoute = ({ item }) => (
    <TouchableOpacity style={styles.routeCard}>
      <Image source={{ uri: item.image_url }} style={styles.routeImage} />
      <View style={styles.routeInfo}>
        <View style={styles.routeHeader}>
          <Text style={styles.routeTitle}>{item.title}</Text>
          <View style={styles.scoreContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.score}>{item.scenic_score}</Text>
          </View>
        </View>
        <Text style={styles.routeDescription}>{item.description}</Text>
        <View style={styles.routeStats}>
          <View style={styles.statItem}>
            <Icon name="straighten" size={16} color="#666" />
            <Text style={styles.statText}>{item.distance} mi</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="schedule" size={16} color="#666" />
            <Text style={styles.statText}>{Math.floor(item.duration / 60)}h {item.duration % 60}m</Text>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>Featured scenic routes curated by our community</Text>
      </View>
      <FlatList
        data={routes}
        renderItem={renderRoute}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  routeCard: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  routeImage: {
    width: '100%',
    height: 160,
  },
  routeInfo: {
    padding: 16,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  score: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  routeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  routeStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#2E8B57',
    fontWeight: '500',
  },
});

export default DiscoverScreen;
