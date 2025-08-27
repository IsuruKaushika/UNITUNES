import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const backendUrl = 'https://unitunes-backend.vercel.app'; // change this to your backend IP

export default function MedicalCenterList() {
  const navigation = useNavigation();
  const [medicalCenters, setMedicalCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicalCenters() {
      try {
        const res = await fetch(`${backendUrl}/api/medicare/list`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setMedicalCenters(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (err) {
        console.error("Error fetching medical centers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedicalCenters();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.headerIcon}>≡</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>UNITUNES</Text>

        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.headerIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.activeTab}>
          <Text style={{ fontWeight: 'bold' }}>Medical center</Text>
        </View>

        <View style={styles.inactiveTab}>
          <TouchableOpacity onPress={() => navigation.navigate('PharmacyList' as never)}>
            <Text>Pharmacy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFA733" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {medicalCenters.length > 0 ? (
            medicalCenters.map((center) => (
              <View key={center._id} style={styles.card}>
                <Image
                  source={center.image ? { uri: `${backendUrl}/${center.image}` } : require('../../assets/images/MedicalBuilding.png')}
                  style={styles.cardImage}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>{center.centerName || 'N/A'}</Text>
                  <Text>{center.address || 'N/A'}</Text>
                  <Text>{`${center.openTime || ''} - ${center.closeTime || ''}`}</Text>
                  <TouchableOpacity>
                    <Text style={{ color: '#3A8EF6', marginTop: 4 }}>Location</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
              No medical centers available
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFA733',
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconButton: { padding: 8 },
  headerIcon: { fontSize: 30, color: '#000' },
  headerTitle: { fontSize: 40, fontWeight: 'bold', color: '#000', paddingTop: 80 },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    margin: 20,
    overflow: 'hidden'
  },
  activeTab: { flex: 1, backgroundColor: '#D9D9D9', paddingVertical: 10, alignItems: 'center' },
  inactiveTab: { flex: 1, backgroundColor: '#F4F4F4', paddingVertical: 10, alignItems: 'center' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10
  },
  cardImage: { width: 80, height: 80, borderRadius: 8, marginRight: 10 }
});
