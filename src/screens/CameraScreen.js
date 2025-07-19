import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { supabase } from '../services/supabase';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CameraScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera access is required to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const uploadPhoto = async () => {
    if (!selectedImage) return;

    setUploading(true);
    
    try {
      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      
      // TODO: Upload to Supabase Storage and save metadata
      // For now, just simulate upload
      setTimeout(() => {
        Alert.alert('Success', 'Photo shared with the Roadara community!');
        setSelectedImage(null);
        setUploading(false);
      }, 2000);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to upload photo');
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Share Discovery</Text>
        <Text style={styles.headerSubtitle}>Help others find beautiful places</Text>
      </View>
      
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.secondaryButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={uploadPhoto}
              disabled={uploading}
            >
              <Text style={styles.primaryButtonText}>
                {uploading ? 'Sharing...' : 'Share Discovery'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cameraOptions}>
          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Icon name="camera-alt" size={50} color="white" />
            <Text style={styles.cameraButtonText}>Capture Moment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.libraryButton} onPress={pickImage}>
            <Icon name="photo-library" size={30} color="#2E8B57" />
            <Text style={styles.libraryButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <Text style={styles.helpText}>
        Share scenic spots, viewpoints, and hidden gems with fellow explorers
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  imageContainer
