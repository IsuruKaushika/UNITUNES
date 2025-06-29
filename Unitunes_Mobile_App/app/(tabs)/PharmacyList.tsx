
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const medicalCenters = [
  {
    id: 1,
    name: 'Central pharmacy',
    address: '300/1, Ruwana, Wakwella',
    time: '8.00a.m – 20.00p.m',
    image: require('../../assets/images/pharmacy_inside.png'),
  },
  {
    id: 2,
    name: 'Central pharmacy',
    address: '300/1, Ruwana, Wakwella',
    time: '8.00a.m – 20.00p.m',
    image: require('../../assets/images/pharmacy_inside.png'),
  },
  {
    id: 3,
    name: 'Central pharmacy',
    address: '300/1, Ruwana, Wakwella',
    time: '8.00a.m – 20.00p.m',
    image: require('../../assets/images/pharmacy_inside.png'),
  },
];

const MedicalCenterList = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ backgroundColor: '#FFA733', paddingTop: 0, paddingHorizontal: 20, paddingBottom: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        

         <TouchableOpacity style={styles.iconButton}>
           {/* Replace with an actual icon from library */}
           <Text style={styles.headerIcon}>≡</Text>
         </TouchableOpacity>

          <Text style={styles.headerTitle}>UNITUNES</Text>
          
          <TouchableOpacity style={styles.iconButton}>
            {/* Replace with an actual icon (e.g. a notification or menu icon) */}
            <Text style={styles.headerIcon}>⋮</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: 'row', backgroundColor: '#F4F4F4', borderRadius: 8, margin: 20, overflow: 'hidden' }}>

        <View style={{ flex: 1, backgroundColor: '#F4F4F4', paddingVertical: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => (navigation.navigate as (route: string) => void)('MedicalCenterList')}>
          <Text>Medical center</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, backgroundColor: '#D9D9D9', paddingVertical: 10, alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>Pharmacy</Text>
        </View>

      </View>

      {/* List */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {medicalCenters.map((center) => (
          <View key={center.id} style={{ flexDirection: 'row', backgroundColor: '#E5E5E5', borderRadius: 10, marginBottom: 15, padding: 10 }}>
            <Image source={center.image} style={{ width: 80, height: 80, borderRadius: 8, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{center.name}</Text>
              <Text>{center.address}</Text>
              <Text>{center.time}</Text>

                
              <TouchableOpacity onPress={() => (navigation.navigate as (route: string) => void)('MedicalCenterDetail')}>
                <Text style={{ color: '#3A8EF6', marginTop: 4 }}>Details</Text>
              </TouchableOpacity>

            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
  },

  headerIcon: {
    fontSize: 30,
    color: '#000',
  },

  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 80,
  },
  
});

c
