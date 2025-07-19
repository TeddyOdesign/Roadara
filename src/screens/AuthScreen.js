import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { supabase } from '../services/supabase';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    
    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert('Error', error.message);
    } else if (isSignUp) {
      Alert.alert('Success', 'Check your email for verification link!');
    }
    
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roadara</Text>
      <Text style={styles.subtitle}>Discover Your Next Adventure</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleAuth}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : (isSignUp ? 'Start Exploring' : 'Welcome Back')}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.switchText}>
          {isSignUp ? 'Already exploring? Sign In' : "New to Roadara? Join Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2E8B57',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
    color: '#666',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: 'white',
    padding: 18,
    marginBottom: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#2E8B57',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    textAlign: 'center',
    color: '#2E8B57',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AuthScreen;
