import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WelcomeToUnitunes = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../assets/images/Logg_Back.png')} // Replace with city map background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>UNITUNES</Text>

        <TouchableOpacity
          style={styles.buttonStudent}
          onPress={() => (navigation.navigate as (route: string) => void)('Login_Student')} 
        >
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.buttonProfessional}
          onPress={() => (navigation.navigate as (route: string) => void)('Login_Professional')} 
        >
          <Text style={styles.buttonText}>Professional</Text>
        </TouchableOpacity>

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
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonStudent: {
    width: '90%',
    height: 60,
    backgroundColor: 'rgba(228, 30, 83, 0.93)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonProfessional: {
    width: '90%',
    height: 60,
    backgroundColor: 'rgba(173, 12, 182, 0.93)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeToUnitunes;