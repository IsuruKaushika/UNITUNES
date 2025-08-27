// app/(tabs)/AddBoardings.tsx
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
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const backendUrl = 'https://unitunes-backend.vercel.app';
const defaultImage = require('../../assets/images/Bording_2.png');

export default function AddBoardings() {
  const router = useRouter();

  // Form fields (all required except photos)
  const [Title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [Rooms, setRooms] = useState('');
  const [bathRooms, setBathRooms] = useState('');
  const [gender, setGender] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!Title.trim()) return 'Title is required.';
    if (!address.trim()) return 'Address is required.';
    if (!price.trim() || isNaN(Number(price))) return 'Valid price is required.';
    if (!Rooms.trim() || isNaN(Number(Rooms))) return 'Valid Rooms count is required.';
    if (!bathRooms.trim() || isNaN(Number(bathRooms))) return 'Valid Bathrooms count is required.';
    if (!owner.trim()) return 'Owner name is required.';
    if (!contact.trim()) return 'Contact number is required.';
    if (!gender.trim()) return 'Gender is required.';
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
      fd.append('Title', Title);
      fd.append('owner', owner);
      fd.append('address', address);
      fd.append('contact', contact);
      fd.append('description', description);
      fd.append('price', price);
      fd.append('Rooms', Rooms);
      fd.append('bathRooms', bathRooms);
      fd.append('gender', gender);

      // No images appended because photos are optional and we're not using picker modules.

      const res = await fetch(`${backendUrl}/api/boarding/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // Do not set Content-Type manually for FormData (boundary will be added automatically)
        },
        body: fd as any,
      });

      const data = await res.json();
      if (data?.success) {
        Alert.alert('Success', 'Boarding Added Successfully', [
          { text: 'OK', onPress: () => router.replace('/(tabs)/BoardingList') },
        ]);
        // Reset form
        setTitle('');
        setOwner('');
        setAddress('');
        setContact('');
        setDescription('');
        setPrice('');
        setRooms('');
        setBathRooms('');
        setGender('');
      } else {
        Alert.alert('Error', data?.message || 'Failed to add boarding.');
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
      {/* Header (similar to BoardingList) */}
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
          <Text style={styles.formTitle}>Add Boarding</Text>

          <TextInput
            placeholder="Title"
            value={Title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

          <TextInput
            placeholder="Price (Rs. per month)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />

          <View style={styles.row}>
            <TextInput
              placeholder="Rooms"
              value={Rooms}
              onChangeText={setRooms}
              keyboardType="numeric"
              style={[styles.input, styles.half]}
            />
            <TextInput
              placeholder="Bathrooms"
              value={bathRooms}
              onChangeText={setBathRooms}
              keyboardType="numeric"
              style={[styles.input, styles.half]}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Picker selectedValue={gender} onValueChange={val => setGender(val)}>
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Any" value="any" />
            </Picker>
          </View>

          <TextInput
            placeholder="Owner name"
            value={owner}
            onChangeText={setOwner}
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
            <Ionicons name="information-circle-outline" size={18} color="#FF8F00" />
            <Text style={styles.photosInfoText}>
              Photo upload is optional and not enabled on this screen. You can submit details now.
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={onSubmit} disabled={submitting}>
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Submit Boarding</Text>
            )}
          </TouchableOpacity>

          {/* Preview card (matches list look) */}
          <View style={styles.previewCard}>
            <Image source={defaultImage} style={styles.previewImage} resizeMode="cover" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{Title || 'Title preview'}</Text>
              <Text style={styles.cardText}>{address || 'Address preview'}</Text>
              <Text style={styles.cardText}>
                {price ? `Rs ${price} / month` : 'Price preview'}
              </Text>
              <Text style={styles.cardText}>Gender: {gender || 'N/A'}</Text>
              <Text style={styles.cardText}>
                Rooms: {Rooms || 'N/A'} | Bathrooms: {bathRooms || 'N/A'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)/BoardingList')}
          >
            <Text style={styles.secondaryText}>View Boarding List</Text>
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
  row: { flexDirection: 'row', gap: 8 },
  half: { flex: 1 },

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
    gap: 8,
    backgroundColor: '#FFF8E1',
    borderColor: '#FFCC80',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
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