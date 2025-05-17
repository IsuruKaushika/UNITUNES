import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const StudentLogin = () => {

<<<<<<< HEAD
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://192.168.79.81:4000/api/user/stulogin', {
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
=======
  const navigation = useNavigation();
>>>>>>> parent of 1361cb5 (Update01-17/05)

  return (
    <ImageBackground
      source={require('../../assets/images/Logg_Back.png')} // Replace with city map background image
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
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
        />
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => (navigation.navigate as (route: string) => void)('Create_Student')}>
          <Text style={styles.registerText}>Register here</Text>
        </TouchableOpacity>

        <View style={styles.googleContainer}>
          <Ionicons name="logo-google" size={20} color="#fff" />
          <Text style={styles.googleText}> or continue with</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '50%',
  },
  container: {
    flex: 1,
    paddingTop: 300,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },
  googleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default StudentLogin;