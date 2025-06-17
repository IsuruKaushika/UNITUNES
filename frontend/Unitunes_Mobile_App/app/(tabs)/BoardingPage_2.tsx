import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';

const PropertyDetails = () => {
  const openWhatsApp = () => {
    const phoneNumber = '+94714770692';
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch(() => alert('WhatsApp is not installed'));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.headerIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            {/* Placeholder for logo */}
            <View style={styles.logoPlaceholder} />
            <Text style={styles.headerTitle}>
              UNI<Text style={styles.headerTitleHighlight}>TUNES</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.headerIcon}>≡</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Gallery */}
      <View style={styles.gallery}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x200' }} // Replace with actual image URL
          style={styles.galleryImage}
        />
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100x80' }} // Replace with actual image URL
            style={styles.thumbnail}
          />
          <Image
            source={{ uri: 'https://via.placeholder.com/100x80' }} // Replace with actual image URL
            style={styles.thumbnail}
          />
          <Image
            source={{ uri: 'https://via.placeholder.com/100x80' }} // Replace with actual image URL
            style={styles.thumbnail}
          />
        </View>
      </View>

      {/* Property Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>Rs 9,000 /month (Negotiable)</Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Owner name: </Text>Amantha Chaturanga
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Property type: </Text>Portion
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Address: </Text>300/1, Ruwana, Wakwella.
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Contact number: </Text>+94 714 770 692
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Beds: </Text>01
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Baths: </Text>01
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Features: </Text>Private entrance
        </Text>
        <Text style={styles.detailLabel}>Description</Text>
        <Text style={styles.description}>
          • with furniture and all facilities{'\n'}
          • gents only{'\n'}
          • 5min to University{'\n'}
          • 100m to Wakwella Road
        </Text>
      </View>

      {/* WhatsApp Button */}
      <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
        <Text style={styles.whatsappText}>Contact via WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFA733',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 40, // Adjust for status bar
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  headerIcon: {
    fontSize: 24,
    color: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    width: 80, // Adjust based on actual logo size
    height: 80,
    backgroundColor: '#fff', // Placeholder for logo
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  headerTitleHighlight: {
    color: '#fff',
  },
  gallery: {
    padding: 20,
  },
  galleryImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 5,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginTop: 5,
  },
  whatsappButton: {
    backgroundColor: '#FFA733',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  whatsappText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PropertyDetails;