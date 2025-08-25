import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = "https://unitunes-backend.vercel.app"; // your backend URL

const HomePage = () => {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [ads, setAds] = useState<string[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);

  // ✅ Check login status from AsyncStorage
  useEffect(() => {
    const checkLogin = async () => {
      const status = await AsyncStorage.getItem("loggedIn");
      setLoggedIn(status === "true");
    };
    checkLogin();
  }, []);

  // ✅ Fetch ads from backend
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/ad`); // Adjust endpoint as needed ---------------------------------------------------
        const data = await response.json();
        if (data && Array.isArray(data.ads)) {
          setAds(data.ads); // assuming backend returns { ads: [url1, url2, ...] }
        } else {
          console.warn("Ads data invalid:", data);
        }
      } catch (err) {
        console.error("Error fetching ads:", err);
      } finally {
        setLoadingAds(false);
      }
    };
    fetchAds();
  }, []);

  const features = [
    { name: "Boarding", icon: require("../../assets/images/Bording.jpg"), route: "BoardingList" },
    { name: "Taxies", icon: require("../../assets/images/Taxi.jpg"), route: "Three Wheel" },
    { name: "Medicare", icon: require("../../assets/images/Medicine.jpg"), route: "MedicalCenterList" },
    { name: "Shops & Delivery Services", icon: require("../../assets/images/Food.jpg"), route: "Food" },
    { name: "Renting", icon: require("../../assets/images/Rental.jpg"), route: "RentItemList" },
    { name: "Skill Sharing", icon: require("../../assets/images/Skill Sharing.jpg"), route: "SkillSharing" },
  ];

  // ✅ Search handling
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if (query.includes("boarding")) navigation.navigate("BoardingList");
    else if (query.includes("travel") || query.includes("taxi") || query.includes("three wheel"))
      navigation.navigate("Three Wheel");
    else if (query.includes("skill")) navigation.navigate("SkillSharing");
    else if (
      query.includes("medical") ||
      query.includes("doctor") ||
      query.includes("medicine") ||
      query.includes("pharmacy")
    )
      navigation.navigate("MedicalCenterList");
    else if (query.includes("food") || query.includes("stationery") || query.includes("glossary"))
      navigation.navigate("Food");
    else if (query.includes("rent") || query.includes("items") || query.includes("share"))
      navigation.navigate("RentItemList");
    else Alert.alert("Not Found", "No matching feature found for your search.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          !loggedIn && { backgroundColor: "#dcdcdc" }, // gray background if not logged in
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="menu" size={28} color="black" />
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} onPress={handleSearch} />
            <TextInput
              placeholder="Search"
              style={styles.textInput}
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
          {/* Login Icon */}
          <TouchableOpacity onPress={() => navigation.navigate("Login-Main1")}>
            <Ionicons name="person" size={28} color={loggedIn ? "green" : "orange"} />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/images/Logo.jpg")} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Ads Section */}
        <View style={styles.adsContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Ads</Text>
          </View>
          {loadingAds ? (
            <ActivityIndicator size="large" color="#ff9500" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {ads.map((url, index) => (
                <Image key={index} source={{ uri: url }} style={styles.adImage} />
              ))}
            </ScrollView>
          )}
        </View>

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Features</Text>
          </View>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureItem}
                onPress={() => {
                  if (loggedIn) navigation.navigate(feature.route);
                  else Alert.alert("Login Required", "Please sign in to access this feature.");
                }}
              >
                <View style={styles.featureIconContainer}>
                  <Image source={feature.icon} style={styles.featureIcon} />
                </View>
                <Text style={styles.featureText}>{feature.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flexGrow: 1, backgroundColor: "#FED4A5", paddingBottom: 10, paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ff9500",
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2,
  },
  searchContainer: { flex: 1, marginHorizontal: 10, flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 20, paddingHorizontal: 10 },
  searchIcon: { marginRight: 8 },
  textInput: { flex: 1, height: 40, fontSize: 16, color: "#333" },
  logoContainer: { alignItems: "center", marginVertical: 0, borderWidth: 10, borderColor: "#ff9500", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: 0, position: "relative", backgroundColor: "#fff" },
  logo: { width: 380, height: 400, borderRadius: 40 },
  adsContainer: { marginVertical: 15, paddingHorizontal: 16, marginBottom: 20 },
  sectionTitleContainer: { backgroundColor: "#ff9500", borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8, alignSelf: "flex-start", marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  adImage: { width: 150, height: 100, marginRight: 8, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" },
  featuresContainer: { paddingHorizontal: 16 },
  featuresGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  featureItem: { alignItems: "center", width: "30%", marginBottom: 20 },
  featureIconContainer: { backgroundColor: "#ff95001a", padding: 16, borderRadius: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, marginBottom: 6 },
  featureIcon: { width: 60, height: 60 },
  featureText: { fontSize: 14, fontWeight: "bold", textAlign: "center", color: "#333" },
});

export default HomePage;
