import React from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";




const HomePage = () => {
  const navigation = useNavigation();

  const features = [
    { name: 'Boarding', icon: require('../../assets/images/Bording.jpg'), route: 'BoardingList' },
    { name: 'Taxies', icon: require('../../assets/images/Taxi.jpg'), route: 'Three Wheel' },
    { name: 'Medicare', icon: require('../../assets/images/Medicine.jpg'), route: 'MedicalCenterList' },
    { name: 'Foods & Stationary', icon: require('../../assets/images/Food.jpg'), route: 'Food' },
    { name: 'Renting', icon: require('../../assets/images/Rental.jpg'), route: 'Studemt Service - Fassion' },
    { name: 'Skill Sharing', icon: require('../../assets/images/Skill Sharing.jpg'), route: '' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="menu" size={28} color="black" />
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              style={styles.textInput}
              placeholderTextColor="#888"
            />
          </View>
          {/*Logging Button*/}
          <TouchableOpacity onPress={() => (navigation.navigate as (route: string) => void)('Login-Main1')}>
            <Ionicons name="person" size={28} color="black" />
          </TouchableOpacity>
          </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/Logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Ads Section */}
        <View style={styles.adsContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Ads</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image source={require('../../assets/images/A1.jpeg')} style={styles.adImage} />
            <Image source={require('../../assets/images/A2.jpeg')} style={styles.adImage} />
            <Image source={require('../../assets/images/A3.jpeg')} style={styles.adImage} />
          </ScrollView>
        </View>

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Features</Text>
          </View>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureItem}
                // onPress={() => navigation.navigate(feature.route)} // Navigate to respective page
                onPress={() => (navigation.navigate as (route: string) => void)(feature.route)}
              >
                <View style={styles.featureIconContainer}>
                  <Image source={feature.icon} style={styles.featureIcon} />
                </View>
                <Text style={styles.featureText}>{feature.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FED4A5',
    paddingBottom: 10,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ff9500',
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 0,
    borderWidth: 10,
    borderColor: '#ff9500',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 0,
    position: 'relative',
    backgroundColor: '#fff',
  },
  logo: {
    width: 380,
    height: 400,
    borderRadius: 40,
  },
  adsContainer: {
    marginVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitleContainer: {
    backgroundColor: '#ff9500',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  adImage: {
    width: 150,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  featuresContainer: {
    paddingHorizontal: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 20,
  },
  featureIconContainer: {
    backgroundColor: '#ff95001a',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 6,
  },
  featureIcon: {
    width: 60,
    height: 60,
  },
  featureText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default HomePage;