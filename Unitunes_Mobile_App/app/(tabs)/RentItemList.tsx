// app/(tabs)/RentalItemList.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const backendUrl = 'https://unitunes-backend.vercel.app';
const defaultImage = require('../../assets/images/Rental.jpg'); // Replace with a default rental item image

export default function RentalItemList() {
  const [rentItems, setRentItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchRentItems() {
      try {
        const res = await fetch(`${backendUrl}/api/renting/list`); // Updated endpoint ----------------------------------------------------------
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setRentItems(data.products);
        } else {
          console.error('Invalid response format:', data);
        }
      } catch (err) {
        console.error('Error fetching rent item data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRentItems();
  }, []);

  const handlePress = (id: string) => {
    router.push(`/RentalItemDetail/${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="black" onPress={() => {}} />
        <View style={styles.titleWrapper}>
          <Image source={require('../../assets/images/UnitunesLogo_2.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>
            UNI<Text style={styles.headerTitleHighlight}>TUNES</Text>
          </Text>
        </View>
        <Ionicons name="notifications-outline" size={28} color="black" onPress={() => {}} />
      </View>

      {/* List */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFA726" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          <Text style={styles.pageTitle}>Rental Items</Text>
          <Text style={styles.pageSubtitle}>Tap an item for details</Text>
          {rentItems.length > 0 ? (
            rentItems.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.card}
                onPress={() => handlePress(item._id)}
              >
                <Image
                  source={item.image?.[0] ? { uri: item.image[0] } : defaultImage}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name || 'Item Name'}</Text>
                  <Text style={styles.cardText}>
                    Contact: {item.contact || 'Not available'}
                  </Text>
                  <Text style={styles.cardText}>
                    Location: {item.location || 'Not available'}
                  </Text>
                  <Text style={styles.cardText}>
                    Price: Rs {item.price || 'N/A'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No rental items available.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#FFA733',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: { alignItems: 'center' },
  logo: { width: 80, height: 80 },
  headerTitle: { fontSize: 30, fontWeight: 'bold', marginTop: 8 },
  headerTitleHighlight: { color: '#FFF' },
  loader: { marginTop: 20 },
  list: { padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  pageSubtitle: { fontSize: 16, color: '#FFA500', marginBottom: 20 },
  card: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: { width: 100, height: 100 },
  cardContent: { flex: 1, padding: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardText: { color: '#555', marginTop: 4 },
  emptyText: { textAlign: 'center', color: 'gray', marginTop: 20 },
});
