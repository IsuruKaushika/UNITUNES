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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const defaultImage = require('../../assets/images/Bording_2.png'); // fallback image similar to BoardingList

const backendUrl = 'http://192.168.86.81:4000';

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
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setTaxiListData(data.products);
          setFilteredTaxiListData(data.products);
        } else {
          console.error('Invalid response format:', data);
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
      return (
        (location === '' || (item.location && item.location.toLowerCase().includes(location.toLowerCase()))) &&
        (vehicleType === '' || (item.vehicleType && item.vehicleType.toLowerCase().includes(vehicleType.toLowerCase()))) &&
        (priceRange === '' || (item.price && parseFloat(item.price) <= parseFloat(priceRange)))
      );
    });
    setFilteredTaxiListData(filtered);
  };

  const handlePress = (id: string) => {
    router.push(`/TaxiPage/${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="car-outline" size={28} color="black" />
        <Text style={styles.headerTitle}>Available Taxis</Text>
        <Ionicons name="notifications-outline" size={28} color="black" />
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

      {/* Taxi Cards */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFA726" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
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
                  <Text style={styles.cardText}>{item.vehicleType || 'N/A'}</Text>
                  <Text style={styles.cardText}>{item.location || 'N/A'}</Text>
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
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
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
  loader: { marginTop: 20 },
  list: { padding: 16 },
  card: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardText: { color: '#555', marginTop: 4 },
  emptyText: { textAlign: 'center', color: 'gray', marginTop: 20 },
});
