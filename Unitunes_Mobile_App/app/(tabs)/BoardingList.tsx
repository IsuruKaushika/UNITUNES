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
  Modal,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const defaultImage = require('../../assets/images/Bording_2.png');
const backendUrl = 'http://192.168.122.81:8081';

export default function BoardingList() {
  const router = useRouter();

  const [boardingListData, setBoardingListData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [persons, setPersons] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [gender, setGender] = useState('');

  // State for Add Boarding Modal
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newBoarding, setNewBoarding] = useState({
    Title: '',
    address: '',
    price: '',
    persons: '',
    gender: '',
    image: '', // For simplicity, image URL as string. (You can use expo-image-picker for real images)
  });
  const [adding, setAdding] = useState(false);

  // Fetch boardings
  useEffect(() => {
    fetchBoardings();
  }, []);

  async function fetchBoardings() {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/boarding/list`);
      const text = await res.text(); // read raw response as text
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

  const applyFilters = () => {
    // You may want to keep a copy of the original data for filtering.
    // For demo, refetching all data before filtering.
    fetchBoardings().then(() => {
      setBoardingListData(prev =>
        prev.filter(item => {
          return (
            (location === '' || item.address.toLowerCase().includes(location.toLowerCase())) &&
            (persons === '' || parseInt(item.persons, 10) === parseInt(persons, 10)) &&
            (priceRange === '' || parseFloat(item.price) <= parseFloat(priceRange)) &&
            (gender === '' || gender === 'any' || item.gender?.toLowerCase() === gender.toLowerCase())
          );
        })
      );
    });
  };

  const handlePress = (id: string) => {
    router.push(`/BoardingPage_2/${id}`);
  };

  // Add Boarding Place
  const handleAddBoarding = async () => {
    // Basic validation
    if (
      !newBoarding.Title ||
      !newBoarding.address ||
      !newBoarding.price ||
      !newBoarding.persons ||
      !newBoarding.gender
    ) {
      Alert.alert('Please fill all fields');
      return;
    }

    setAdding(true);
    try {
      const res = await fetch(`${backendUrl}/api/boardingModels/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBoarding,
          image: newBoarding.image ? [newBoarding.image] : [],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAddModalVisible(false);
        setNewBoarding({
          Title: '',
          address: '',
          price: '',
          persons: '',
          gender: '',
          image: '',
        });
        fetchBoardings(); // Refresh list
        Alert.alert('Boarding added!');
      } else {
        Alert.alert('Failed to add boarding', data.message || 'Unknown error');
      }
    } catch (e) {
      Alert.alert('Error', 'Could not add boarding');
    } finally {
      setAdding(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="black" onPress={() => { /* open drawer */ }} />
        <View style={styles.titleWrapper}>
          <Image source={require('../../assets/images/UnitunesLogo_2.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>
            UNI<Text style={styles.headerTitleHighlight}>TUNES</Text>
          </Text>
        </View>
        <Ionicons name="notifications-outline" size={28} color="black" onPress={() => { /* ... */ }} />
      </View>

      {/* Add Boarding Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Boarding</Text>
      </TouchableOpacity>

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
          <Picker selectedValue={gender} onValueChange={setGender}>
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

      {/* Boarding Cards */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFA726" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {boardingListData.length > 0 ? (
            boardingListData.map(item => (
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

      {/* Add Boarding Modal */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Boarding</Text>
            <TextInput
              placeholder="Title"
              style={styles.input}
              value={newBoarding.Title}
              onChangeText={val => setNewBoarding({ ...newBoarding, Title: val })}
            />
            <TextInput
              placeholder="Address"
              style={styles.input}
              value={newBoarding.address}
              onChangeText={val => setNewBoarding({ ...newBoarding, address: val })}
            />
            <TextInput
              placeholder="Price (Rs.)"
              style={styles.input}
              value={newBoarding.price}
              keyboardType="numeric"
              onChangeText={val => setNewBoarding({ ...newBoarding, price: val })}
            />
            <TextInput
              placeholder="No. of persons"
              style={styles.input}
              value={newBoarding.persons}
              keyboardType="numeric"
              onChangeText={val => setNewBoarding({ ...newBoarding, persons: val })}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newBoarding.gender}
                onValueChange={val => setNewBoarding({ ...newBoarding, gender: val })}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Any" value="any" />
              </Picker>
            </View>
            <TextInput
              placeholder="Image URL (optional)"
              style={styles.input}
              value={newBoarding.image}
              onChangeText={val => setNewBoarding({ ...newBoarding, image: val })}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[styles.filterButton, { flex: 1, marginRight: 8 }]}
                onPress={handleAddBoarding}
                disabled={adding}
              >
                <Text style={styles.filterButtonText}>{adding ? 'Adding...' : 'Add'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: '#ccc', flex: 1 }]}
                onPress={() => setAddModalVisible(false)}
                disabled={adding}
              >
                <Text style={[styles.filterButtonText, { color: '#333' }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#FFA733',
    paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  titleWrapper: { alignItems: 'center' },
  logo: { width: 80, height: 80 },
  headerTitle: { fontSize: 30, fontWeight: 'bold', marginTop: 8 },
  headerTitleHighlight: { color: '#FFF' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA726',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 0,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  filterContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16, padding: 16, margin: 16
  },
  filterTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 10, marginBottom: 10
  },
  pickerContainer: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    marginBottom: 10
  },
  filterButton: {
    backgroundColor: '#FFA726', borderRadius: 10,
    paddingVertical: 10, alignItems: 'center'
  },
  filterButtonText: { color: '#fff', fontWeight: 'bold' },
  loader: { marginTop: 20 },
  list: { padding: 16 },
  card: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12, marginBottom: 16, overflow: 'hidden'
  },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardText: { color: '#555', marginTop: 4 },
  emptyText: { textAlign: 'center', color: 'gray', marginTop: 20 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center', alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '90%',
    elevation: 5
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});
