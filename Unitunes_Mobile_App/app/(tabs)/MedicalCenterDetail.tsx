
 import React from 'react';
 import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
 import { Ionicons } from '@expo/vector-icons';
 
 const MedicalCenterDetails = () => {
   return (
     <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
       <View style={{ flexDirection: 'row', alignItems: 'center',paddingTop: 30, marginBottom: 20 }}>
         <Ionicons name="arrow-back" size={24} color="black" style={{ marginRight: 10 }} />
         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Medical Center Details</Text>
       </View>
 
       <Image source={require('../../assets/images/pharmacy_inside.png')} style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 20 }} />
 
       <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Central Pharmacy</Text>
       <Text style={{ marginBottom: 8 }}>300/1, Ruwana, Wakwella</Text>
       <Text style={{ marginBottom: 8 }}>8.00a.m – 20.00p.m</Text>
 
       <TouchableOpacity
         style={{ backgroundColor: '#3A8EF6', padding: 12, borderRadius: 8, marginTop: 20 }}
         onPress={() => Linking.openURL('https://wa.me/94771234567')}
       >
         <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Contact on WhatsApp</Text>
       </TouchableOpacity>
     </View>
   );
 };
 
 export default MedicalCenterDetails;


