import React, { useEffect, useState, useMemo } from 'react';
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

  // --- Helpers to be resilient to field name differences from backend ---

  // title/name
  const titleText = useMemo(
    () =>
      boardingData?.boardingName ||
      boardingData?.Title ||
      boardingData?.name ||
      'Boarding House',
    [boardingData]
  );

  // phone
  const rawPhone: string | undefined = useMemo(
    () =>
      boardingData?.mobileNumber ||
      boardingData?.contact ||
      boardingData?.phoneNumber ||
      boardingData?.phone,
    [boardingData]
  );

  // location/address
  const locationText: string | undefined = useMemo(
    () =>
      boardingData?.location ||
      boardingData?.address ||
      boardingData?.Location ||
      boardingData?.area,
    [boardingData]
  );

  // coordinates & map url
  const latitude =
    boardingData?.latitude ??
    boardingData?.lat ??
    boardingData?.coords?.lat ??
    boardingData?.geo?.lat;
  const longitude =
    boardingData?.longitude ??
    boardingData?.lng ??
    boardingData?.lon ??
    boardingData?.coords?.lng ??
    boardingData?.geo?.lng;
  const mapUrl =
    boardingData?.mapUrl ||
    boardingData?.mapsUrl ||
    boardingData?.googleMapsUrl ||
    boardingData?.locationUrl;

  const formatPhoneForWhatsApp = (phone: string) => {
    // Sanitize to digits
    let digits = (phone || '').replace(/\D/g, '');
    // If looks like a local number starting with 0 and is 10 digits (e.g., Sri Lanka),
    // convert to 94xxxxxxxxx. Adjust if your backend already stores E.164.
    if (digits.length === 10 && digits.startsWith('0')) {
      digits = `94${digits.slice(1)}`;
    }
    return digits;
  };

  const handleCall = () => {
    if (!rawPhone) return;
    Linking.openURL(`tel:${rawPhone}`).catch((e) =>
      console.log('Dialer open failed:', e)
    );
  };

  const handleWhatsApp = () => {
    if (!rawPhone) return;
    const waNumber = formatPhoneForWhatsApp(rawPhone);
    const url = `https://wa.me/${waNumber}`;
    Linking.openURL(url).catch((e) => console.log('WhatsApp open failed:', e));
  };

  const handleOpenMaps = () => {
    // Priority: explicit URL → coordinates → location/address string
    if (mapUrl) {
      Linking.openURL(mapUrl).catch((e) => console.log('Map URL open failed:', e));
      return;
    }

    if (latitude != null && longitude != null) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${latitude},${longitude}`
      )}`;
      Linking.openURL(url).catch((e) => console.log('Maps open failed:', e));
      return;
    }

    if (locationText) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        locationText
      )}`;
      Linking.openURL(url).catch((e) => console.log('Maps open failed:', e));
    }
  };

  // Build a details list from common fields (only show if exists)
  const detailRows: Array<{ label: string; value: any }> = useMemo(() => {
    const rows: Array<{ label: string; value: any }> = [];

    const maybePush = (label: string, value: any) => {
      if (value !== undefined && value !== null && value !== '') {
        rows.push({ label, value });
      }
    };

    maybePush('Location', locationText);
    maybePush('Address', boardingData?.address);
    maybePush('Price (per month)', boardingData?.price);
    maybePush('Persons', boardingData?.persons);
    maybePush('Gender', boardingData?.gender);
    maybePush('Description', boardingData?.description);
    maybePush('Distance', boardingData?.distance);
    maybePush('Email', boardingData?.email);
    maybePush('Contact', rawPhone);
    if (latitude != null && longitude != null) {
      maybePush('Coordinates', `${latitude}, ${longitude}`);
    }

    // If there are extra fields like amenities/facilities lists:
    const amenities = boardingData?.amenities || boardingData?.facilities;
    if (Array.isArray(amenities) && amenities.length > 0) {
      maybePush('Facilities', amenities.join(', '));
    }

    return rows;
  }, [
    boardingData,
    locationText,
    rawPhone,
    latitude,
    longitude,
  ]);

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

  if (!boardingData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Boarding Details</Text>
          <View style={{ width: 28 }} />
        </View>
        <Text style={styles.errorText}>No data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Boarding Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.detailsContainer}>
          <Image
            source={boardingData.image?.[0] ? { uri: boardingData.image[0] } : defaultImage}
            style={styles.boardingImage}
            resizeMode="cover"
            onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
          />

          <View style={styles.detailsContent}>
            <Text style={styles.title}>{titleText}</Text>

            {detailRows.map((row, idx) => (
              <View key={`${row.label}-${idx}`} style={styles.row}>
                <Text style={styles.rowLabel}>{row.label}:</Text>
                <Text style={styles.rowValue}>
                  {row.label.toLowerCase().includes('price') ? `Rs ${row.value}` : String(row.value)}
                </Text>
              </View>
            ))}

            {/* Action buttons */}
            {(rawPhone || locationText || latitude != null || longitude != null || mapUrl) && (
              <View style={styles.actions}>
                {rawPhone && (
                  <>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFA726' }]} onPress={handleCall}>
                      <Ionicons name="call" size={18} color="#fff" />
                      <Text style={styles.actionText}>Call Owner</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#25D366' }]} onPress={handleWhatsApp}>
                      <Ionicons name="logo-whatsapp" size={18} color="#fff" />
                      <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                  </>
                )}

                {(mapUrl || latitude != null || longitude != null || locationText) && (
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#E74C3C' }]} onPress={handleOpenMaps}>
                    <Ionicons name="location" size={18} color="#fff" />
                    <Text style={styles.actionText}>Open in Google Maps</Text>
                  </TouchableOpacity>
                )}
              </View>
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
  boardingImage: { width: '100%', height: 250, borderRadius: 12 },
  detailsContent: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },

  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  rowLabel: {
    width: 150,
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  rowValue: {
    flex: 1,
    fontSize: 15,
    color: '#555',
  },

  loader: { marginTop: 20 },
  errorText: { textAlign: 'center', color: 'red', marginTop: 20, fontSize: 16 },

  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  actionText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
