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
const defaultImage = require('../../../assets/images/GroceryGoods.png');

export default function ShopDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [shopData, setShopData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShopDetails() {
      try {
        console.log(`Fetching shop list to find shop with ID: ${id}`);
        const res = await fetch(`${backendUrl}/api/shop/list`);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        console.log('API response data:', data);
        if (data.success && Array.isArray(data.products)) {
          const foundShop = data.products.find((item: any) => item._id === id);
          if (foundShop) setShopData(foundShop);
          else throw new Error('Shop not found');
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load shop details');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchShopDetails();
    else {
      setError('Invalid shop ID');
      setLoading(false);
    }
  }, [id]);

  // --- Helpers ---
  const titleText = useMemo(
    () => shopData?.shopName || shopData?.Title || shopData?.name || 'Shop',
    [shopData]
  );

  const rawPhone: string | undefined = useMemo(
    () => shopData?.contact || shopData?.phoneNumber || shopData?.mobileNumber || shopData?.phone,
    [shopData]
  );

  const locationText: string | undefined = useMemo(
    () => shopData?.location || shopData?.address || shopData?.area,
    [shopData]
  );

  const latitude =
    shopData?.latitude ?? shopData?.lat ?? shopData?.coords?.lat ?? shopData?.geo?.lat;
  const longitude =
    shopData?.longitude ?? shopData?.lng ?? shopData?.coords?.lng ?? shopData?.geo?.lng;
  const mapUrl = shopData?.mapUrl || shopData?.mapsUrl || shopData?.googleMapsUrl || shopData?.locationUrl;

  const formatPhoneForWhatsApp = (phone: string) => {
    let digits = (phone || '').replace(/\D/g, '');
    if (digits.length === 10 && digits.startsWith('0')) digits = `94${digits.slice(1)}`;
    return digits;
  };

  const handleCall = () => {
    if (!rawPhone) return;
    Linking.openURL(`tel:${rawPhone}`).catch((e) => console.log('Dialer open failed:', e));
  };

  const handleWhatsApp = () => {
    if (!rawPhone) return;
    const waNumber = formatPhoneForWhatsApp(rawPhone);
    Linking.openURL(`https://wa.me/${waNumber}`).catch((e) => console.log('WhatsApp open failed:', e));
  };

  const handleOpenMaps = () => {
    if (mapUrl) {
      Linking.openURL(mapUrl).catch((e) => console.log('Map URL open failed:', e));
      return;
    }
    if (latitude != null && longitude != null) {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`)
        .catch((e) => console.log('Maps open failed:', e));
      return;
    }
    if (locationText) {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`)
        .catch((e) => console.log('Maps open failed:', e));
    }
  };

  const detailRows: Array<{ label: string; value: any }> = useMemo(() => {
    const rows: Array<{ label: string; value: any }> = [];
    const maybePush = (label: string, value: any) => {
      if (value !== undefined && value !== null && value !== '') rows.push({ label, value });
    };

    maybePush('Location', locationText);
    maybePush('Address', shopData?.address);
    maybePush('Category', shopData?.category);
    maybePush('Price Range', shopData?.priceRange);
    maybePush('Description', shopData?.description);
    maybePush('Contact', rawPhone);
    maybePush('Email', shopData?.email);
    if (latitude != null && longitude != null) maybePush('Coordinates', `${latitude}, ${longitude}`);
    return rows;
  }, [shopData, locationText, rawPhone, latitude, longitude]);

  if (loading) return <View style={styles.container}><ActivityIndicator size="large" color="#FFA726" /></View>;
  if (error || !shopData) return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop Details</Text>
        <View style={{ width: 28 }} />
      </View>
      <Text style={styles.errorText}>{error || 'No data found.'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.detailsContainer}>
          <Image
            source={shopData.image?.[0] ? { uri: shopData.image[0] } : defaultImage}
            style={styles.shopImage}
            resizeMode="cover"
            onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
          />

          <View style={styles.detailsContent}>
            <Text style={styles.title}>{titleText}</Text>

            {detailRows.map((row, idx) => (
              <View key={`${row.label}-${idx}`} style={styles.row}>
                <Text style={styles.rowLabel}>{row.label}:</Text>
                <Text style={styles.rowValue}>{String(row.value)}</Text>
              </View>
            ))}

            {(rawPhone || locationText || latitude != null || longitude != null || mapUrl) && (
              <View style={styles.actions}>
                {rawPhone && (
                  <>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFA726' }]} onPress={handleCall}>
                      <Ionicons name="call" size={18} color="#fff" />
                      <Text style={styles.actionText}>Call</Text>
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
  detailsContainer: { flex: 1, padding: 16, backgroundColor: '#FFF3E0', borderRadius: 16, margin: 16 },
  shopImage: { width: '100%', height: 250, borderRadius: 12 },
  detailsContent: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 8, alignItems: 'flex-start' },
  rowLabel: { width: 150, fontSize: 15, color: '#333', fontWeight: '600' },
  rowValue: { flex: 1, fontSize: 15, color: '#555' },
  loader: { marginTop: 20 },
  errorText: { textAlign: 'center', color: 'red', marginTop: 20, fontSize: 16 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  actionText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
