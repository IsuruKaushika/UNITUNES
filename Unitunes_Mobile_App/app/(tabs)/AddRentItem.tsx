// app/(tabs)/AddRentItem.tsx
// Note: No image picker modules are used. Photos are optional and this screen submits without photos.

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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const backendUrl = 'https://unitunes-backend.vercel.app';
const defaultImage = require('../../assets/images/Rental.jpg');

export default function AddRentItem() {
  const router = useRouter();

  // Form fields (all required except photos)
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!name.trim()) return 'Item name is required.';
    if (!location.trim()) return 'Location is required.';
    if (!contact.trim()) return 'Contact number is required.';
    if (!price.trim() || isNaN(Number(price))) return 'Valid price is required.';
    if (!description.trim()) return 'Description is required.';
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

      // Send as multipart/form-data (even without photos) so backend (multer) reads text fields from req.body
      const fd = new FormData();
      fd.append('name', name);
      fd.append('location', location);
      fd.append('contact', contact);
      fd.append('price', price);
      fd.append('description', description);

      const res = await fetch(`${backendUrl}/api/rent/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // Do not set Content-Type manually for FormData
        },
        body: fd as any,
      });

      const data = await res.json();
      if (data?.success) {
        Alert.alert('Success', 'Rental item added successfully', [
          { text: 'OK', onPress: () => router.replace('/(tabs)/RentItemList') },
        ]);
        // Reset form
        setName('');
        setLocation('');
        setContact('');
        setPrice('');
        setDescription('');
      } else {
        Alert.alert('Error', data?.message || 'Failed to add rental item.');
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
        {/* Form container */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add Rental Item</Text>

          <TextInput
            placeholder="Item name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />

          <TextInput
            placeholder="Price (Rs.)"
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
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.textArea]}
            multiline
          />

          {/* Photos (optional) – no picker used */}
          <Text style={styles.sectionLabel}>Photos (optional)</Text>
          <View style={styles.photosInfoBox}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#FF8F00"
              style={styles.iconMr}
            />
            <Text style={styles.photosInfoText}>
              Photo upload is optional and not enabled on this screen. You can submit details now.
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={onSubmit} disabled={submitting}>
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Submit Rental Item</Text>
            )}
          </TouchableOpacity>

          {/* Preview card (matches list look) */}
          <View style={styles.previewCard}>
            <Image source={defaultImage} style={styles.previewImage} resizeMode="cover" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{name || 'Item name preview'}</Text>
              <Text style={styles.cardText}>Contact: {contact || 'N/A'}</Text>
              <Text style={styles.cardText}>Location: {location || 'N/A'}</Text>
              <Text style={styles.cardText}>
                {price ? `Price: Rs ${price}` : 'Price preview'}
              </Text>
              <Text style={styles.cardText}>
                {description ? description : 'Description preview'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)/RentItemList')}
          >
            <Text style={styles.secondaryText}>View Rental Items</Text>
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

  // Preview card (similar to list card)
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