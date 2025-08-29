// app/(tabs)/AddTaxi.tsx
// Note: Photos are optional and this screen submits without photos.

import React, { useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const backendUrl = 'https://unitunes-backend.vercel.app';
const defaultImage = require('../../assets/images/default-taxi.png');

export default function AddTaxi() {
  const router = useRouter();

  // Form fields (all required except photos and description)
  const [driverName, setDriverName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(''); // Rs. per km
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!driverName.trim()) return 'Driver name is required.';
    if (!vehicleType.trim()) return 'Vehicle type is required.';
    if (!location.trim()) return 'Location is required.';
    if (!price.trim() || isNaN(Number(price))) return 'Valid price (per km) is required.';
    if (!contact.trim()) return 'Contact number is required.';
    return '';
  };

  const onSubmit = async () => {
    const err = validate();
    if (err) {
      Alert.alert('Validation', err);
      return;
    }

    try {
      setSubmitting(true);

      // Send as multipart/form-data (even without photos) so backend (multer) reads fields from req.body
      const fd = new FormData();
      fd.append('driverName', driverName);
      fd.append('vehicleType', vehicleType);
      fd.append('location', location);
      fd.append('price', price);
      fd.append('contact', contact);
      if (description.trim()) fd.append('description', description);

      const res = await fetch(`${backendUrl}/api/taxi/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // Do not set Content-Type manually for FormData (boundary will be added automatically)
        },
        body: fd as any,
      });

      const data = await res.json();
      if (data?.success) {
        Alert.alert('Success', 'Taxi added successfully', [
          { text: 'OK', onPress: () => router.replace('/(tabs)/Three Wheel') },
        ]);
        // Reset form
        setDriverName('');
        setVehicleType('');
        setLocation('');
        setPrice('');
        setContact('');
        setDescription('');
      } else {
        Alert.alert('Error', data?.message || 'Failed to add taxi.');
      }
    } catch (e) {
      console.log('Submit error', e);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={28} color="black" onPress={() => router.back()} />
        <View style={styles.titleWrapper}>
          <Image source={require('../../assets/images/UnitunesLogo_2.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>
            UNI<Text style={styles.headerTitleHighlight}>TUNES</Text>
          </Text>
        </View>
        <Ionicons name="notifications-outline" size={28} color="black" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add Taxi</Text>

          <TextInput
            placeholder="Driver name"
            value={driverName}
            onChangeText={setDriverName}
            style={styles.input}
          />

          <View style={styles.pickerContainer}>
            <Picker selectedValue={vehicleType} onValueChange={(val) => setVehicleType(val)}>
              <Picker.Item label="Select Vehicle Type" value="" />
              <Picker.Item label="Car" value="car" />
              <Picker.Item label="Van" value="van" />
              <Picker.Item label="SUV" value="suv" />
              <Picker.Item label="Tuk" value="tuk" />
              <Picker.Item label="Bike" value="bike" />
              <Picker.Item label="Bus" value="bus" />
            </Picker>
          </View>

          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />

          <TextInput
            placeholder="Price per km (Rs.)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Contact number"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.textArea]}
            multiline
          />

          {/* Photos (optional) – no picker used */}
          <Text style={styles.sectionLabel}>Photos (optional)</Text>
          <View style={styles.photosInfoBox}>
            <Ionicons name="information-circle-outline" size={18} color="#FF8F00" style={styles.iconMr} />
            <Text style={styles.photosInfoText}>
              Photo upload is optional and not enabled on this screen. You can submit details now.
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={onSubmit} disabled={submitting}>
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Submit Taxi</Text>
            )}
          </TouchableOpacity>

          {/* Preview card (matches TaxiList look) */}
          <View style={styles.previewCard}>
            <Image source={defaultImage} style={styles.previewImage} resizeMode="cover" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{driverName || 'Driver name preview'}</Text>
              <Text style={styles.cardText}>
                Vehicle: {vehicleType ? vehicleType.toUpperCase() : 'N/A'}
              </Text>
              <Text style={styles.cardText}>Location: {location || 'N/A'}</Text>
              <Text style={styles.cardText}>
                {price ? `Rs ${price} / km` : 'Price preview'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)/Three Wheel')}
          >
            <Text style={styles.secondaryText}>View Taxi List</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Header
  header: {
    backgroundColor: '#FFA733',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: { alignItems: 'center' },
  logo: { width: 60, height: 60 },
  headerTitle: { fontSize: 30, fontWeight: 'bold', marginTop: 8 },
  headerTitleHighlight: { color: '#FFF' },

  formContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },

  sectionLabel: { fontWeight: 'bold', color: '#444', marginTop: 6, marginBottom: 8 },

  photosInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderColor: '#FFCC80',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  iconMr: { marginRight: 8 },
  photosInfoText: { color: '#6b4f00', flex: 1 },

  submitButton: {
    backgroundColor: '#FFA726',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: { color: '#fff', fontWeight: 'bold' },

  // Preview card (similar to TaxiList card)
  previewCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    marginTop: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  previewImage: { width: '100%', height: 160 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardText: { color: '#555', marginTop: 4 },

  secondaryButton: {
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  secondaryText: { color: '#FFA733', fontWeight: 'bold' },
});