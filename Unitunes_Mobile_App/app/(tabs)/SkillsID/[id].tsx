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
const defaultImage = require('../../../assets/images/Skill Sharing.jpg'); // Add relevant placeholder image

export default function SkillDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [skillData, setSkillData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkillDetails() {
      try {
        console.log(`Fetching skill list to find skill with ID: ${id}`);
        const res = await fetch(`${backendUrl}/api/skillshare/list`);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        console.log('API response data:', data);
        if (data.success && Array.isArray(data.skills)) {
          const foundSkill = data.skills.find((item: any) => item._id === id);
          if (foundSkill) {
            setSkillData(foundSkill);
          } else {
            throw new Error('Skill not found');
          }
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load skill details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchSkillDetails();
    } else {
      setError('Invalid skill ID');
      setLoading(false);
    }
  }, [id]);

  // --- Helpers for field handling ---
  const titleText = useMemo(
    () => skillData?.skillName || skillData?.title || 'Skill',
    [skillData]
  );

  const providerName = useMemo(
    () => skillData?.providerName || skillData?.name || 'Provider',
    [skillData]
  );

  const rawPhone: string | undefined = useMemo(
    () => skillData?.contact || skillData?.phoneNumber || skillData?.mobile,
    [skillData]
  );

  const locationText: string | undefined = useMemo(
    () => skillData?.location || skillData?.address || 'Not specified',
    [skillData]
  );

  const emailText = skillData?.email || null;
  const descriptionText = skillData?.description || skillData?.details;

  const formatPhoneForWhatsApp = (phone: string) => {
    let digits = (phone || '').replace(/\D/g, '');
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

  // Build details list dynamically
  const detailRows: Array<{ label: string; value: any }> = useMemo(() => {
    const rows: Array<{ label: string; value: any }> = [];
    const maybePush = (label: string, value: any) => {
      if (value !== undefined && value !== null && value !== '') {
        rows.push({ label, value });
      }
    };

    maybePush('Skill', titleText);
    maybePush('Provider', providerName);
    maybePush('Location', locationText);
    maybePush('Description', descriptionText);
    maybePush('Email', emailText);
    maybePush('Contact', rawPhone);

    return rows;
  }, [titleText, providerName, locationText, rawPhone, emailText, descriptionText]);

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
          <Text style={styles.headerTitle}>Skill Details</Text>
          <View style={{ width: 28 }} />
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!skillData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Skill Details</Text>
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
        <Text style={styles.headerTitle}>Skill Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.detailsContainer}>
          <Image
            source={skillData.image?.[0] ? { uri: skillData.image[0] } : defaultImage}
            style={styles.skillImage}
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

            {/* Action Buttons */}
            {rawPhone && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: '#FFA726' }]}
                  onPress={handleCall}
                >
                  <Ionicons name="call" size={18} color="#fff" />
                  <Text style={styles.actionText}>Call Provider</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: '#25D366' }]}
                  onPress={handleWhatsApp}
                >
                  <Ionicons name="logo-whatsapp" size={18} color="#fff" />
                  <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>
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
  skillImage: { width: '100%', height: 250, borderRadius: 12 },
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
