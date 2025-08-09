import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const backendUrl = 'http://192.168.86.81:4000';
const defaultImage = require('../../../assets/images/default-taxi.png'); // Adjust path if needed

export default function TaxiPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [taxiData, setTaxiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTaxiDetails() {
      try {
        const res = await fetch(`${backendUrl}/api/taxi/list/${id}`);
        if (!res.ok) {
          throw new Error(res.status === 404 ? 'Taxi not found' : `HTTP error: ${res.status}`);
        }

        const data = await res.json();
        if (data.success && data.product) {
          setTaxiData(data.product);
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load taxi details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTaxiDetails();
    } else {
      setError('Invalid taxi ID');
      setLoading(false);
    }
  }, [id]);

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
          <Text style={styles.headerTitle}>Taxi Details</Text>
          <View style={{ width: 28 }} />
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Taxi Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.detailsContainer}>
        <Image
          source={taxiData.image?.[0] ? { uri: taxiData.image[0] } : defaultImage}
          style={styles.taxiImage}
          resizeMode="cover"
        />
        <View style={styles.detailsContent}>
          <Text style={styles.title}>{taxiData.driverName || 'Taxi Driver'}</Text>
          <Text style={styles.detailText}>Vehicle Type: {taxiData.vehicleType || 'N/A'}</Text>
          <Text style={styles.detailText}>Location: {taxiData.location || 'N/A'}</Text>
          <Text style={styles.detailText}>Price: Rs {taxiData.price || 'N/A'} / km</Text>
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
  taxiImage: { width: '100%', height: 250, borderRadius: 12 },
  detailsContent: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  detailText: { fontSize: 16, color: '#555', marginBottom: 8 },
  loader: { marginTop: 20 },
  errorText: { textAlign: 'center', color: 'red', marginTop: 20, fontSize: 16 },
});