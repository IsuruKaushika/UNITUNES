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
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  StudentLogin: undefined;
  Create_Student: undefined;
  index: undefined; // Homepage after login
};

const backendUrl = 'https://unitunes-backend.vercel.app';

const StudentLogin = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/user/stulogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Student Login response:', data);

      if (response.ok && data.success) {
        // ✅ Save login flag
        await AsyncStorage.setItem('loggedIn', 'true');
        await AsyncStorage.setItem('userRole', 'student');

        Alert.alert('Login Successful!', 'Welcome back!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('index'),
          },
        ]);
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      Alert.alert('Error', 'Unable to connect to the server');
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
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(prev => !prev)}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

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
    paddingTop: 200,
    paddingBottom: 90,
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
  passwordContainer: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  eyeButton: {
    padding: 6,
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