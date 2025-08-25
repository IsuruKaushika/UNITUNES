// app/(tabs)/BoardingList.tsx

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
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const defaultImage = require('../../assets/images/Bording_2.png');


const backendUrl = 'https://unitunes-backend.vercel.app';

export default function BoardingList() {
  const router = useRouter();

  const [boardingListData, setBoardingListData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [persons, setPersons] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    async function fetchBoardings() {
      try {
        const res = await fetch(`${backendUrl}/api/boarding/list`);
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setBoardingListData(data.products);
        } else {
          console.error('Invalid response format:', data);
        }
      } catch (err) {
        console.error('Error fetching boarding data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBoardings();
  }, []);

  const applyFilters = () => {
    const filtered = boardingListData.filter(item => {
      return (
        (location === '' || item.address.toLowerCase().includes(location.toLowerCase())) &&
        (persons === '' || parseInt(item.persons) === parseInt(persons)) &&
        (priceRange === '' || parseFloat(item.price) <= parseFloat(priceRange)) &&
        (gender === '' || gender === 'any' || item.gender?.toLowerCase() === gender.toLowerCase())
      );
    });
    setBoardingListData(filtered);
  };

  const handlePress = (id: string) => {
    router.push(`/BoardingID/${id}`); // Fixed: Added backticks for template literal
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

      {/* Filters */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter Options</Text>
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
        <TextInput
          placeholder="No. of persons"
          value={persons}
          onChangeText={setPersons}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Max Price (Rs.)"
          value={priceRange}
          onChangeText={setPriceRange}
          keyboardType="numeric"
          style={styles.input}
        />
        <View style={styles.pickerContainer}>
          <Picker selectedValue={gender} onValueChange={(val) => setGender(val)}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Any" value="any" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={applyFilters}>
          <Text style={styles.filterButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFA726" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {boardingListData.length > 0 ? (
            boardingListData.map(item => (
              <TouchableOpacity key={item._id} style={styles.card} onPress={() => handlePress(item._id)}>
                <Image
                  source={item.image?.[0] ? { uri: item.image[0] } : defaultImage}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.Title}</Text>
                  <Text style={styles.cardText}>{item.address}</Text>
                  <Text style={styles.cardText}>Rs {item.price} / month</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No boarding data found.</Text>
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
  filterContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  filterTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
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
