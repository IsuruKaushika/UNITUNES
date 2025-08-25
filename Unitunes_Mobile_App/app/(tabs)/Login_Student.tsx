// StudentLogin.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Replace this with your root stack param list
type RootStackParamList = {
  StudentLogin: undefined;
  Create_Student: undefined;
  BoardingList: undefined;
  // ...other screens
};

const StudentLogin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('https://unitunes-backend.vercel.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok && data.success) {
        Alert.alert('Success', 'Logged in!');
        // ← Navigate to the BoardingList screen
        navigation.navigate('index');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      Alert.alert('Error', 'Unable to connect to server');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Logg_Back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Student Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Create_Student')}>
          <Text style={styles.registerText}>Register here</Text>
        </TouchableOpacity>

        {/*
        <View style={styles.googleContainer}>
          <Ionicons name="logo-google" size={20} color="#fff" />
          <Text style={styles.googleText}> or continue with</Text>
        </View>
        */}


      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: {
    flex: 1,
    paddingTop: 300,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: { fontSize: 50, fontWeight: 'bold', color: '#fff', marginBottom: 30 },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#fff',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#800080',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  registerText: { color: '#fff', fontSize: 14, marginBottom: 20 },
  googleContainer: { flexDirection: 'row', alignItems: 'center' },
  googleText: { color: '#fff', fontSize: 14, marginLeft: 5 },
});

export default StudentLogin;
