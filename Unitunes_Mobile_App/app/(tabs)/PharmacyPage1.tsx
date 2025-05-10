import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


// PharmacyPage1.tsx
export const PharmacyPage1 = () => {
  const navigation = useNavigation();
  return (
    <ScrollView className="bg-white p-4">
      <Text className="text-xl font-bold text-orange-500">UNITUNES</Text>
      <View className="flex-row space-x-4 mt-4">
        <TouchableOpacity onPress={() => (navigation.navigate as (route: string) => void)('index')}>
          <Text className="text-gray-500">Medical center</Text>
        </TouchableOpacity>
        <Text className="text-black font-semibold">Pharmacy</Text>
      </View>
      {[1, 2, 3].map((_, index) => (
        <TouchableOpacity key={index} className="p-4 border rounded-lg mt-4 bg-gray-100" onPress={() => (navigation.navigate as (route: string) => void)('index')}> 
          <Image source={require("../../assets/images/Logo.jpg")} className="h-20 w-full rounded-lg" />
          <Text className="text-lg font-bold mt-2">Central medicenter</Text>
          <Text>200/A, Panova, Wavelola</Text>
          <Text>8:00 a.m - 9:00 p.m</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};