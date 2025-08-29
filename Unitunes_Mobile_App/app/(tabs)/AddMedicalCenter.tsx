// app/(tabs)/AddMedical.tsx
// Single screen for adding Medical Centers and Medical Posts.
// No image picker (photos optional). Submits as multipart/form-data.

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
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const backendUrl = 'https://unitunes-backend.vercel.app';
const defaultImage = require('../../assets/images/MedicalBuilding.png');

type Center = {
  _id: string;
  centerName: string;
};

export default function AddMedical() {
  const navigation = useNavigation();

  // Toggle between "center" and "post"
  const [activeTab, setActiveTab] = useState<'center' | 'post'>('center');

  // Medical Center form
  const [centerName, setCenterName] = useState('');
  const [address, setAddress] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState(''); // optional
  const [locationUrl, setLocationUrl] = useState(''); // optional

  // Medical Post form
  const [centers, setCenters] = useState<Center[]>([]);
  const [loadingCenters, setLoadingCenters] = useState(true);
  const [centerId, setCenterId] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postContact, setPostContact] = useState(''); // optional
  const [validUntil, setValidUntil] = useState(''); // optional (YYYY-MM-DD)

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Preload centers for the post form
    const loadCenters = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/medicare/list`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setCenters(
            data.map((c: any) => ({
              _id: c._id,
              centerName: c.centerName || 'Unnamed',
            }))
          );
        } else {
          console.error('Unexpected centers response:', data);
        }
      } catch (e) {
        console.error('Error fetching centers:', e);
      } finally {
        setLoadingCenters(false);
      }
    };
    loadCenters();
  }, []);

  // Validation
  const validateCenter = () => {
    if (!centerName.trim()) return 'Center name is required.';
    if (!address.trim()) return 'Address is required.';
    if (!openTime.trim()) return 'Open time is required.';
    if (!closeTime.trim()) return 'Close time is required.';
    if (!contact.trim()) return 'Contact number is required.';
    return '';
  };

  const validatePost = () => {
    if (!centerId) return 'Please select a medical center.';
    if (!postTitle.trim()) return 'Post title is required.';
    if (!postContent.trim()) return 'Post content is required.';
    return '';
  };

  // Submit handlers
  const submitCenter = async () => {
    const err = validateCenter();
    if (err) {
      Alert.alert('Validation', err);
      return;
    }

    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('centerName', centerName);
      fd.append('address', address);
      fd.append('openTime', openTime);
      fd.append('closeTime', closeTime);
      fd.append('contact', contact);
      if (description.trim()) fd.append('description', description);
      if (locationUrl.trim()) fd.append('locationUrl', locationUrl);

      const res = await fetch(`${backendUrl}/api/medicare/add`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd as any,
      });

      const data = await res.json();
      if (data?.success) {
        Alert.alert('Success', 'Medical center added successfully', [
          { text: 'OK', onPress: () => navigation.navigate('MedicalCenterList' as never) },
        ]);
        // Reset
        setCenterName('');
        setAddress('');
        setOpenTime('');
        setCloseTime('');
        setContact('');
        setDescription('');
        setLocationUrl('');
      } else {
        Alert.alert('Error', data?.message || 'Failed to add medical center.');
      }
    } catch (e) {
      console.log('Submit error', e);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitPost = async () => {
    const err = validatePost();
    if (err) {
      Alert.alert('Validation', err);
      return;
    }

    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('centerId', centerId);
      fd.append('title', postTitle);
      fd.append('content', postContent);
      if (postContact.trim()) fd.append('contact', postContact);
      if (validUntil.trim()) fd.append('validUntil', validUntil);

      // Adjust path/fields if your backend differs
      const res = await fetch(`${backendUrl}/api/medicare/post/add`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd as any,
      });

      const data = await res.json();
      if (data?.success) {
        Alert.alert('Success', 'Post created successfully', [
          { text: 'OK', onPress: () => navigation.navigate('MedicalCenterList' as never) },
        ]);
        // Reset
        setCenterId('');
        setPostTitle('');
        setPostContent('');
        setPostContact('');
        setValidUntil('');
      } else {
        Alert.alert('Error', data?.message || 'Failed to create post.');
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
        <Ionicons name="chevron-back" size={28} color="black" onPress={() => navigation.goBack()} />
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
          {/* Local tabs */}
          <View style={styles.segment}>
            <TouchableOpacity
              style={[styles.segmentBtn, activeTab === 'center' && styles.segmentBtnActive]}
              onPress={() => setActiveTab('center')}
            >
              <Text style={styles.segmentText}>Add Center</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segmentBtn, activeTab === 'post' && styles.segmentBtnActive]}
              onPress={() => setActiveTab('post')}
            >
              <Text style={styles.segmentText}>Add Post</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'center' ? (
            <>
              <Text style={styles.formTitle}>Add Medical Center</Text>

              <TextInput
                placeholder="Center name"
                value={centerName}
                onChangeText={setCenterName}
                style={styles.input}
              />

              <TextInput
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
              />

              <View style={styles.row}>
                <TextInput
                  placeholder="Open time (e.g., 08:00)"
                  value={openTime}
                  onChangeText={setOpenTime}
                  style={[styles.input, styles.half, { marginRight: 4 }]}
                />
                <TextInput
                  placeholder="Close time (e.g., 17:00)"
                  value={closeTime}
                  onChangeText={setCloseTime}
                  style={[styles.input, styles.half, { marginLeft: 4 }]}
                />
              </View>

              <TextInput
                placeholder="Contact number"
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
                style={styles.input}
              />

              <TextInput
                placeholder="Google Maps URL (optional)"
                value={locationUrl}
                onChangeText={setLocationUrl}
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

              <TouchableOpacity style={styles.submitButton} onPress={submitCenter} disabled={submitting}>
                {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Submit Medical Center</Text>}
              </TouchableOpacity>

              {/* Preview card */}
              <View style={styles.previewCard}>
                <Image source={defaultImage} style={styles.previewImage} resizeMode="cover" />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{centerName || 'Center name preview'}</Text>
                  <Text style={styles.cardText}>{address || 'Address preview'}</Text>
                  <Text style={styles.cardText}>
                    {(openTime || 'Open')} - {(closeTime || 'Close')}
                  </Text>
                  <Text style={styles.cardText}>Contact: {contact || 'N/A'}</Text>
                  {locationUrl ? <Text style={[styles.cardText, { color: '#3A8EF6' }]}>Location link added</Text> : null}
                  {description ? <Text style={styles.cardText}>{description}</Text> : null}
                </View>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.formTitle}>Create Medical Post</Text>

              <View style={styles.pickerContainer}>
                {loadingCenters ? (
                  <View style={{ paddingVertical: 10 }}>
                    <ActivityIndicator color="#FFA726" />
                  </View>
                ) : (
                  <Picker selectedValue={centerId} onValueChange={(val) => setCenterId(val)}>
                    <Picker.Item label="Select Medical Center" value="" />
                    {centers.map((c) => (
                      <Picker.Item key={c._id} label={c.centerName} value={c._id} />
                    ))}
                  </Picker>
                )}
              </View>

              <TextInput
                placeholder="Post title"
                value={postTitle}
                onChangeText={setPostTitle}
                style={styles.input}
              />

              <TextInput
                placeholder="Post content / announcement details"
                value={postContent}
                onChangeText={setPostContent}
                style={[styles.input, styles.textArea]}
                multiline
              />

              <TextInput
                placeholder="Contact (optional)"
                value={postContact}
                onChangeText={setPostContact}
                keyboardType="phone-pad"
                style={styles.input}
              />

              <TextInput
                placeholder="Valid until (optional, e.g., 2025-12-31)"
                value={validUntil}
                onChangeText={setValidUntil}
                style={styles.input}
              />

              {/* Photos (optional) – no picker used */}
              <Text style={styles.sectionLabel}>Photos (optional)</Text>
              <View style={styles.photosInfoBox}>
                <Ionicons name="information-circle-outline" size={18} color="#FF8F00" style={styles.iconMr} />
                <Text style={styles.photosInfoText}>
                  Photo upload is optional and not enabled on this screen. You can submit details now.
                </Text>
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={submitPost} disabled={submitting}>
                {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Submit Post</Text>}
              </TouchableOpacity>

              {/* Preview card */}
              <View style={styles.previewCard}>
                <Image source={defaultImage} style={styles.previewImage} resizeMode="cover" />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{postTitle || 'Post title preview'}</Text>
                  <Text style={styles.cardText}>
                    Center: {centers.find((c) => c._id === centerId)?.centerName || 'N/A'}
                  </Text>
                  <Text style={styles.cardText}>{postContent || 'Post content preview'}</Text>
                  {postContact ? <Text style={styles.cardText}>Contact: {postContact}</Text> : null}
                  {validUntil ? <Text style={styles.cardText}>Valid until: {validUntil}</Text> : null}
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('MedicalCenterList' as never)}
          >
            <Text style={styles.secondaryText}>View Medical Centers</Text>
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

  // Local tabs
  segment: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  segmentBtnActive: {
    backgroundColor: '#D9D9D9',
  },
  segmentText: { fontWeight: '600', color: '#333' },

  // Form
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
  row: { flexDirection: 'row' },
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

  // Preview card
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