import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';

const ShoppingApp = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fashion', 'Sports', 'Electronics', 'Travel'];

  const products = [
    { id: 1, name: 'Blazer', image: require('../../assets/images/Blazer.png') },
    { id: 2, name: 'Brown Shoe', image: require('../../assets/images/BShoe.png') },
    { id: 3, name: 'Linen trouser', image: require('../../assets/images/LTrouser.png') },
    { id: 4, name: 'Ladies Shoe', image: require('../../assets/images/LShoe.png') },
    { id: 5, name: 'Frock', image: require('../../assets/images/Frock.png') },
    { id: 6, name: 'Deck shoe', image: require('../../assets/images/DeckShoe.png') },
    { id: 7, name: 'Frock', image: require('../../assets/images/Frock2.png') },
    { id: 8, name: 'Watch', image: require('../../assets/images/Watch.png') },
    { id: 9, name: 'Sunglass', image: require('../../assets/images/Sunglass.png') },
    { id: 10, name: 'Watch', image: require('../../assets/images/LWatch.png') },
    { id: 11, name: 'Sandies', image: require('../../assets/images/Sandles.png') },
    { id: 12, name: 'Shirts', image: require('../../assets/images/Shirt.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuBar}></View>
          <View style={styles.menuBar}></View>
          <View style={styles.menuBar}></View>
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png' }}
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#999" />
        </View>

        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}></Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoryHeading}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScrollView}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonSelected]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[styles.categoryText, selectedCategory === category && styles.categoryTextSelected]}
              >
                {category}
              </Text>
              {selectedCategory === category && <View style={styles.categoryIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image source={require('../../assets/images/A2.jpeg')} style={styles.bannerImage} resizeMode="cover" />
      </View>

      {/* Product Grid */}
      <ScrollView style={styles.productsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productItem}>
              <View style={styles.productImageContainer}>
                <Image source={product.image} style={styles.productImage} resizeMode="cover" />
              </View>
              <Text style={styles.productName}>{product.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFA500',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuButton: {
    width: 24,
    height: 24,
    justifyContent: 'space-around',
    marginRight: 12,
  },
  menuBar: {
    width: 24,
    height: 2,
    backgroundColor: 'black',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
  },
  profileButton: {
    marginLeft: 12,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: '#FFA500',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  categoryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  categoriesScrollView: {
    paddingBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#FFC04D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#000000',
  },
  categoryTextSelected: {
    fontWeight: 'bold',
    color: '#000000',
  },
  categoryIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '70%',
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  bannerContainer: {
    height: 150,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  productsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: itemWidth,
    marginBottom: 16,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
});

export default ShoppingApp;