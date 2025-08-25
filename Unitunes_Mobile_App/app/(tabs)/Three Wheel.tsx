// app/(tabs)/TaxiList.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const backendUrl = 'https://unitunes-backend.vercel.app';
const defaultImage = require('../../assets/images/default-taxi.png');

export default function TaxiList() {
  const router = useRouter();

  const [taxiListData, setTaxiListData] = useState<any[]>([]);
  const [filteredTaxiListData, setFilteredTaxiListData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    async function fetchTaxis() {
      try {
        const res = await fetch(`${backendUrl}/api/taxi/list`);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setTaxiListData(data.products);
          setFilteredTaxiListData(data.products);
        } else {
          console.error('Unexpected taxi API response:', data);
        }
      } catch (err) {
        console.error('Error fetching taxi data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTaxis();
  }, []);

  const applyFilters = () => {
    const filtered = taxiListData.filter(item => {
      const matchLocation =
        location === '' || (item.location ? item.location.toLowerCase().includes(location.toLowerCase()) : false);

      const matchVehicle =
        vehicleType === '' || (item.vehicleType ? item.vehicleType.toLowerCase().includes(vehicleType.toLowerCase()) : false);

      const matchPrice =
        priceRange === '' || (item.price ? parseFloat(item.price) <= parseFloat(priceRange) : false);

      return matchLocation && matchVehicle && matchPrice;
    });

    setFilteredTaxiListData(filtered);

    if (filtered.length === 0) {
      Alert.alert('No Results', 'No taxis found matching the filters.');
    }
  };

  const handlePress = (id: string) => {
    router.push(`/TaxiPage/${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="black" onPress={() => {}} />
        <View style={styles.titleWrapper}>
          <Image
            source={require('../../assets/images/UnitunesLogo_2.png')}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>
            UNI<Text style={styles.headerTitleHighlight}>TUNES</Text>
          </Text>
        </View>
        <Ionicons name="notifications-outline" size={28} color="black" onPress={() => {}} />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
        <TextInput
          placeholder="Vehicle Type (e.g. Van, Car)"
          value={vehicleType}
          onChangeText={setVehicleType}
          style={styles.input}
        />
        <TextInput
          placeholder="Max Price (Rs.)"
          value={priceRange}
          onChangeText={setPriceRange}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.filterButton} onPress={applyFilters}>
          <Text style={styles.filterButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Taxi List */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFA726" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          <Text style={styles.pageTitle}>Available Taxis</Text>
          <Text style={styles.pageSubtitle}>Tap a taxi for details</Text>
          {filteredTaxiListData.length > 0 ? (
            filteredTaxiListData.map(item => (
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
                  <Text style={styles.cardTitle}>{item.driverName || 'Taxi Driver'}</Text>
                  <Text style={styles.cardText}>Vehicle: {item.vehicleType || 'N/A'}</Text>
                  <Text style={styles.cardText}>Location: {item.location || 'N/A'}</Text>
                  <Text style={styles.cardText}>Rs {item.price || 'N/A'} / km</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No taxi listings available.</Text>
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
  filterContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#FFA726',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  filterButtonText: { color: '#fff', fontWeight: 'bold' },
  list: { padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  pageSubtitle: { fontSize: 16, color: '#FFA500', marginBottom: 20 },
  card: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardText: { color: '#555', marginTop: 4 },
  emptyText: { textAlign: 'center', color: 'gray', marginTop: 20 },
});
