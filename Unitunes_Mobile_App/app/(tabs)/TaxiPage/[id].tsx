import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const backendUrl = 'https://unitunes-backend.vercel.app';
const defaultImage = require('../../../assets/images/default-taxi.png');

export default function TaxiPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [taxiData, setTaxiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTaxiDetails() {
      try {
        console.log(`Fetching taxi list to find taxi with ID: ${id}`);
        const res = await fetch(`${backendUrl}/api/taxi/list`);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        console.log('API response data:', data);
        if (data.success && Array.isArray(data.products)) {
          const foundTaxi = data.products.find((item: any) => item._id === id);
          if (foundTaxi) {
            setTaxiData(foundTaxi);
          } else {
            throw new Error('Taxi not found');
          }
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
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

  // Call Owner
  const handleCall = () => {
    if (taxiData?.mobileNumber) {
      Linking.openURL(`tel:${taxiData.mobileNumber}`);
    }
  };

  // WhatsApp Owner
  const handleWhatsApp = () => {
    if (taxiData?.mobileNumber) {
      const whatsappUrl = `https://wa.me/${taxiData.mobileNumber}`;
      Linking.openURL(whatsappUrl);
    }
  };

  // Open Google Maps for location
  const handleOpenMaps = () => {
    if (taxiData?.location) {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        taxiData.location
      )}`;
      Linking.openURL(mapsUrl);
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

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.detailsContainer}>
          <Image
            source={taxiData.image?.[0] ? { uri: taxiData.image[0] } : defaultImage}
            style={styles.taxiImage}
            resizeMode="cover"
            onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
          />
          <View style={styles.detailsContent}>
            <Text style={styles.title}>{taxiData.driverName || 'Taxi Driver'}</Text>
            <Text style={styles.detailText}>Vehicle Type: {taxiData.vehicleType || 'N/A'}</Text>
            <Text style={styles.detailText}>Location: {taxiData.location || 'N/A'}</Text>
            <Text style={styles.detailText}>Price: Rs {taxiData.price || 'N/A'} / km</Text>
            <Text style={styles.detailText}>
              Experience: {taxiData.experience ? `${taxiData.experience} years` : 'N/A'}
            </Text>
            <Text style={styles.detailText}>
              Availability: {taxiData.availability || 'N/A'}
            </Text>
            <Text style={styles.detailText}>
              Vehicle Number: {taxiData.vehicleNumber || 'N/A'}
            </Text>

            {/* Action Buttons */}
            {taxiData.mobileNumber && (
              <>
                <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
                  <Text style={styles.actionButtonText}>📞 Call Driver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleWhatsApp}>
                  <Text style={styles.actionButtonText}>💬 WhatsApp</Text>
                </TouchableOpacity>
              </>
            )}

            {taxiData.location && (
              <TouchableOpacity style={styles.mapButton} onPress={handleOpenMaps}>
                <Text style={styles.mapButtonText}>📍 View Location on Maps</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
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
  actionButton: {
    backgroundColor: '#FFA726',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  mapButton: {
    backgroundColor: '#43A047',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  mapButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
