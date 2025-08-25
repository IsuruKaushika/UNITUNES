import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const backendUrl = 'https://unitunes-backend.vercel.app';
const defaultImage = require('../../../assets/images/Bording_2.png');

export default function BoardingPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [boardingData, setBoardingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBoardingDetails() {
      try {
        console.log(`Fetching boarding list to find boarding with ID: ${id}`);
        const res = await fetch(`${backendUrl}/api/boarding/list`);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        console.log('API response data:', data);
        if (data.success && Array.isArray(data.products)) {
          const foundBoarding = data.products.find((item: any) => item._id === id);
          if (foundBoarding) {
            setBoardingData(foundBoarding);
          } else {
            throw new Error('Boarding not found');
          }
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load boarding details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBoardingDetails();
    } else {
      setError('Invalid boarding ID');
      setLoading(false);
    }
  }, [id]);

  const handleCall = () => {
    if (boardingData.mobileNumber) {
      Linking.openURL(`tel:${boardingData.mobileNumber}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFA726" style={styles.loader} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Boarding Details</Text>
          <View style={{ width: 28 }} />
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/*
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        */}

        <Text style={styles.headerTitle}>Boarding Detail</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.detailsContainer}>
        <Image
          source={boardingData.image?.[0] ? { uri: boardingData.image[0] } : defaultImage}
          style={styles.boardingImage}
          resizeMode="cover"
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
        />
        <View style={styles.detailsContent}>
          <Text style={styles.title}>{boardingData.boardingName || 'Boarding House'}</Text>
          <Text style={styles.detailText}>Location: {boardingData.location || 'N/A'}</Text>
          <Text style={styles.detailText}>Price: Rs {boardingData.price || 'N/A'} / month</Text>
          {boardingData.mobileNumber && (
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Text style={styles.callButtonText}>Call Owner</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
  detailsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    margin: 16,
  },
  boardingImage: { width: '100%', height: 250, borderRadius: 12 },
  detailsContent: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  detailText: { fontSize: 16, color: '#555', marginBottom: 8 },
  loader: { marginTop: 20 },
  errorText: { textAlign: 'center', color: 'red', marginTop: 20, fontSize: 16 },
  callButton: {
    backgroundColor: '#FFA726',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  callButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
