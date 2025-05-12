import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BakeryScreen = () => {
  // Placeholder data for bakery items
  const bakeryItems = [
    { id: '1', name: 'Rice & Curry', image: require('../../assets/images/MealsImages.png'), contact: '074-0234567' },
    { id: '2', name: 'Kottu', image: require('../../assets/images/MealsImages.png'), contact: '074-0234567' },
    { id: '3', name: 'Parata', image: require('../../assets/images/MealsImages.png'), contact: '074-0234567' },
    { id: '4', name: 'Hoppers', image: require('../../assets/images/MealsImages.png'), contact: '074-0234567' },
  ];

  return (
    
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconButton}>
          {/* Replace with an actual icon from your library */}
          <Text style={styles.headerIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UNITUNES</Text>
        <TouchableOpacity style={styles.iconButton}>
          {/* Replace with an actual icon (e.g. a notification or menu icon) */}
          <Text style={styles.headerIcon}>⋮</Text>
        </TouchableOpacity>
      </View>



      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Bakery</Text>
        <Text style={styles.subtitle}>Delivery service</Text>
        {bakeryItems.map((item) => (
          <View key={item.id} style={styles.item}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>S.U Senanayake</Text>
              <Text style={styles.itemContact}>{item.contact}</Text>
            </View>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.buttonText}>Contact via WhatsApp</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 10,
    
  },
  headerContainer: {
    height: 150,
    backgroundColor: '#FFA733',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 8,
  },
  headerIcon: {
    fontSize: 30,
    color: '#000',
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 80,
  },

  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContact: {
    fontSize: 16,
    color: '#555',
  },
  contactButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BakeryScreen;
