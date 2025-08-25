import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const backendUrl = 'https://unitunes-backend.vercel.app';
const defaultImage = require('../../assets/images/GroceryGoods.png');

export default function ShopsList() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShops() {
      try {
        const res = await fetch(`${backendUrl}/api/shop/list`);
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setShops(data.products);
        } else {
          console.error('Invalid response format:', data);
        }
      } catch (err) {
        console.error('Error fetching shop data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchShops();
  }, []);

  const handleWhatsApp = (phone: string) => {
    const formattedNumber = phone.replace(/\D/g, ''); // remove non-numeric characters
    const url = `https://wa.me/${formattedNumber}`;
    Linking.openURL(url).catch((err) => console.error('Error opening WhatsApp:', err));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UNITUNES</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFA726" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Shops & Delivery Services</Text>
          <Text style={styles.subtitle}>Contact shop owners via WhatsApp</Text>
          {shops.length > 0 ? (
            shops.map((item) => (
              <View key={item._id} style={styles.item}>
                <Image
                  source={item.image?.[0] ? { uri: item.image[0] } : defaultImage}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.shopName || 'Shop Name'}</Text>
                  <Text style={styles.itemContact}>{item.contact || 'No contact available'}</Text>
                </View>
                {item.contact && (
                  <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() => handleWhatsApp(item.contact)}
                  >
                    <Text style={styles.buttonText}>WhatsApp</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No shops available.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingBottom: 10 },
  headerContainer: {
    height: 150,
    backgroundColor: '#FFA733',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconButton: { padding: 8 },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 80,
  },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#FFA500', marginBottom: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  itemImage: { width: 80, height: 80, marginRight: 15, borderRadius: 8 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemContact: { fontSize: 16, color: '#555' },
  contactButton: {
    backgroundColor: '#25D366', // WhatsApp green
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  loader: { marginTop: 20 },
  emptyText: { textAlign: 'center', color: 'gray', marginTop: 20 },
});
