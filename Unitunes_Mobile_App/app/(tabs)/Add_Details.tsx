import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

// Screen width to help with responsive design
const { width, height } = Dimensions.get('window');

// Sample category data (each with an icon and corresponding screen name)
const CATEGORIES = [
  { id: '1', label: 'Add a Boarding House', icon: require('../../assets/images/boardingicon.png'), screen: 'AddBoardings' },
  { id: '2', label: 'Add a Taxi', icon: require('../../assets/images/Three wheel.png'), screen: 'AddTaxi' },
  { id: '3', label: 'Add a Skill', icon: require('../../assets/images/Van.png'), screen: 'SkillShareListAdd' },
  { id: '4', label: 'Add somthing to Rent', icon: require('../../assets/images/Car.png'), screen: 'Car' },
  { id: '5', label: 'Add a Ad', icon: require('../../assets/images/Bus.png'), screen: 'AddRentItem' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.categoryItem} 
      onPress={() => (navigation.navigate as (route: string) => void)(item.screen)}
    >
      <View style={styles.categoryLeft}>
        <Image source={item.icon} style={styles.categoryIcon} />
        <Text style={styles.categoryLabel}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.headerIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UNITUNES</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.headerIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.contentContainer}>
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Location / map icon at bottom center */}
      <View style={styles.mapIconContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/Map-icon.png')}
            style={styles.mapIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 10,
  },
  headerContainer: {
    height: 150,
    backgroundColor: '#FFA733',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    backgroundColor: '#FFA733',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 6,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  mapIconContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  mapIcon: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});