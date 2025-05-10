import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const defaultImage = require('../../assets/images/Bording_2.png');

const BoardingList = ({ navigation, boardings }: any) => {
  const [location, setLocation] = useState('');
  const [persons, setPersons] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [gender, setGender] = useState('');

  const applyFilters = () => {
    console.log({ location, persons, priceRange, gender });
    // Backend filtering logic should go here or callback to update filtered results
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 0 }}>

    {/* Header */}
        <View style={{ backgroundColor: '#FFA733', paddingTop: 50, paddingHorizontal: 20, paddingBottom: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity style={styles.iconButton}>
                {/* Replace with an actual icon from library */}
                    <Text style={styles.headerIcon}>≡</Text>
                </TouchableOpacity>

                {/* Center the logo and text */}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../assets/images/UnitunesLogo_2.png')} style={{ width: 140, height: 140 }} />
                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                    UNI<Text style={{ color: '#FFFF' }}>TUNES</Text>
                </Text>
            </View>

            <TouchableOpacity style={styles.iconButton}>
            {/* Replace with an actual icon (e.g. a notification or menu icon) */}
                <Text style={styles.headerIcon}>⋮</Text>
            </TouchableOpacity>
        </View>
    </View>
        


      {/* Filters */}
      <View style={{ backgroundColor: '#FFF3E0', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Filter Options</Text>
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10 }}
        />
        <TextInput
          placeholder="No. of persons"
          value={persons}
          onChangeText={setPersons}
          keyboardType="numeric"
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Max Price (Rs.)"
          value={priceRange}
          onChangeText={setPriceRange}
          keyboardType="numeric"
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10 }}
        />
        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginBottom: 10 }}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue: string) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Any" value="any" />
          </Picker>
        </View>

        <TouchableOpacity
          style={{ backgroundColor: '#FFA726', borderRadius: 10, paddingVertical: 10, alignItems: 'center' }}
          onPress={applyFilters}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Apply Filters</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {Array.isArray(boardings) && boardings.length > 0 ? (
          boardings.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              style={{ backgroundColor: '#FFF3E0', marginBottom: 12, borderRadius: 12, overflow: 'hidden' }}
              onPress={() => navigation.navigate('BoardingDetails', { id: item.id })}
            >
              <Image
                source={item.image ? { uri: item.image } : defaultImage}
                style={{ width: '100%', height: 180 }}
                resizeMode="cover"
              />
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.place}</Text>
                <Text style={{ color: '#555' }}>Persons: {item.persons}</Text>
                <Text style={{ color: '#555' }}>Price: Rs.{item.price}</Text>
                <Text style={{ color: '#555' }}>Distance: {item.distance}</Text>
                <Text style={{ color: '#555' }}>Phone: {item.phone}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>No boarding data available</Text>
        )}
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

export default BoardingList;
