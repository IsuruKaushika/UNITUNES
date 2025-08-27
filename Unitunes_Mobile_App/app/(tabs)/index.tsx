import React, { useEffect, useState, useCallback } from "react";
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
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const backendUrl = 'https://unitunes-backend.vercel.app';
const ACCENT = "#ff9500";
const isAndroid = Platform.OS === "android";

// Background gradients
const BG_COOL = ["#0f1121", "#151a2f", "#101626"]; // logged out (cool liquid glass mood)
const BG_WARM = ["#FFF7ED", "#FFE8CC", "#FED4A5"]; // logged in (soft orange, no red/brown)

// Accent blobs
const BLOBS_COOL = {
  top: ["rgba(255,149,0,0.25)", "rgba(255,149,0,0)"],
  bottom: ["rgba(74,144,226,0.18)", "rgba(74,144,226,0)"],
};
const BLOBS_WARM = {
  top: ["rgba(255,149,0,0.32)", "rgba(255,149,0,0)"],
  bottom: ["rgba(255,200,120,0.22)", "rgba(255,200,120,0)"],
};

const HomePage = () => {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [ads, setAds] = useState<string[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);

  // User display data
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string>("U");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const stringToColor = (str: string) => {
    // Deterministic pastel-ish color
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash |= 0;
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const computeInitial = (name?: string | null, email?: string | null) => {
    const n = (name || "").trim();
    if (n) return n.charAt(0).toUpperCase();
    const e = (email || "").trim();
    if (e) return e.charAt(0).toUpperCase();
    return "U";
  };

  // Check login status and load user display info
  const checkLogin = useCallback(async () => {
    const status = await AsyncStorage.getItem("loggedIn");
    const isLogged = status === "true";
    setLoggedIn(isLogged);

    if (isLogged) {
      const [nameFromStore, goodName, fullName, emailFromStore, userEmailStore] = await Promise.all([
        AsyncStorage.getItem("userName"),
        AsyncStorage.getItem("goodName"),
        AsyncStorage.getItem("fullName"),
        AsyncStorage.getItem("email"),
        AsyncStorage.getItem("userEmail"),
      ]);

      const name = nameFromStore || goodName || fullName || null;
      const email = userEmailStore || emailFromStore || null;

      setUserName(name);
      setUserEmail(email);
      setUserInitial(computeInitial(name, email));
    } else {
      setUserName(null);
      setUserEmail(null);
      setUserInitial("U");
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  // Re-check when coming back to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkLogin();
    });
    return unsubscribe;
  }, [navigation, checkLogin]);

  // Fetch ads from backend
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/ad/list`);
        const data = await response.json();
        if (data && Array.isArray(data.ads)) {
          setAds(data.ads);
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

  const promptLoginForSearch = () => {
    Alert.alert(
      "Login Required",
      "Please sign in to use search.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign In", onPress: () => navigation.navigate("Login-Main1") },
      ],
      { cancelable: true }
    );
  };

  // Search handling (gated by login)
  const handleSearch = () => {
    if (!loggedIn) {
      promptLoginForSearch();
      return;
    }
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "loggedIn",
        "userRole",
        "userName",
        "goodName",
        "fullName",
        "email",
        "userEmail",
        "token",
      ]);
      setLoggedIn(false);
      setUserName(null);
      setUserEmail(null);
      setUserInitial("U");
      setShowUserMenu(false);
      Alert.alert("Logged out", "You have been signed out.");
    } catch (err) {
      console.error("Logout error:", err);
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  // Theme bindings based on auth state
  const bgGradient = loggedIn ? BG_WARM : BG_COOL;
  const blobs = loggedIn ? BLOBS_WARM : BLOBS_COOL;
  const blurTintHeader = loggedIn ? "light" : "dark";
  const blurTintCard = loggedIn ? "light" : "dark";
  const headerIconColor = loggedIn ? ACCENT : "#ffffff";
  const searchIconColor = loggedIn ? "#ffb766" : "#aab2c8";
  const placeholderColor = loggedIn ? "#d88407" : "#aab2c8"; // warm orange hint, no red/brown
  const textOnCards = loggedIn ? "#2a2a2a" : "#eef1f7";
  const borderAccent = loggedIn ? "rgba(255,149,0,0.35)" : "rgba(255,255,255,0.24)";
  const cardBorderAccent = loggedIn ? "rgba(255,149,0,0.22)" : "rgba(255,255,255,0.16)";
  const chipBg = loggedIn ? "rgba(255,149,0,0.18)" : "rgba(255,255,255,0.06)";
  const chipText = loggedIn ? "#2a2a2a" : "#f3f5fb";

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background */}
      <LinearGradient
        colors={bgGradient}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Accent blobs */}
      <LinearGradient
        colors={blobs.top}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.8, y: 0.6 }}
        style={styles.accentBlobTop}
      />
      <LinearGradient
        colors={blobs.bottom}
        start={{ x: 0.1, y: 0.9 }}
        end={{ x: 0.9, y: 0.2 }}
        style={styles.accentBlobBottom}
      />

      {/* User menu overlay and dropdown (only when logged in) */}
      {loggedIn && showUserMenu && (
        <>
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setShowUserMenu(false)}
          />
          <View style={[styles.userMenu, { borderColor: borderAccent }]}>
            <BlurView intensity={60} tint={blurTintCard as any} style={StyleSheet.absoluteFillObject} />
            <Text style={[styles.userMenuTitle, { color: textOnCards }]}>
              {userName || userEmail || "Signed in"}
            </Text>
            <TouchableOpacity style={styles.userMenuItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#d00" style={{ marginRight: 8 }} />
              <Text style={styles.userMenuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header - liquid glass for both states, orange accent when logged in */}
        <View style={[styles.headerGlass, { borderColor: borderAccent }]}>
          <BlurView intensity={60} tint={blurTintHeader as any} style={StyleSheet.absoluteFillObject} />
          {/* soft orange gradient overlay only when logged in */}
          {loggedIn && (
            <LinearGradient
              colors={["rgba(255,149,0,0.12)", "rgba(255,149,0,0.08)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <View style={styles.headerContent}>
            <Ionicons name="menu" size={28} color={headerIconColor} />

            <View style={[styles.searchGlass, { borderColor: borderAccent }]}>
              <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFillObject} />
              <Ionicons
                name="search"
                size={20}
                color={searchIconColor}
                style={styles.searchIcon}
                onPress={handleSearch}
              />
              <TextInput
                placeholder={loggedIn ? "Search" : "Sign in to search"}
                style={[styles.textInput, { color: textOnCards }]}
                placeholderTextColor={placeholderColor}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                editable={loggedIn}
              />
              {!loggedIn && (
                <TouchableOpacity
                  style={StyleSheet.absoluteFillObject}
                  activeOpacity={1}
                  onPress={promptLoginForSearch}
                />
              )}
            </View>

            {/* Login Icon / User Avatar */}
            {loggedIn ? (
              <TouchableOpacity onPress={() => setShowUserMenu((v) => !v)} style={styles.avatarButton}>
                <View style={[styles.avatarGlass, { borderColor: borderAccent }]}>
                  <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFillObject} />
                  <View
                    style={[
                      styles.avatarCircle,
                      { backgroundColor: stringToColor(userName || userEmail || "User") },
                    ]}
                  >
                    <Text style={styles.avatarInitial}>{userInitial}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate("Login-Main1")} style={styles.loginIconHighlight}>
                <View style={styles.avatarGlassSmall}>
                  <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFillObject} />
                  <Ionicons name="person" size={28} color={ACCENT} style={styles.loginIconGlow} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Logo - glass card (orange accented when logged in) */}
        <View style={[styles.logoCard, { borderColor: cardBorderAccent }]}>
          <BlurView intensity={50} tint={blurTintCard as any} style={StyleSheet.absoluteFillObject} />
          {loggedIn && (
            <LinearGradient
              colors={["rgba(255,149,0,0.10)", "rgba(255,149,0,0.06)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <Image
            source={require("../../assets/images/Logo.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Ads Section */}
        <View style={styles.section}>
          <View style={[styles.sectionTitlePill, { borderColor: borderAccent, backgroundColor: chipBg }]}>
            <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFillObject} />
            <Text style={[styles.sectionTitle, { color: chipText }]}>Ads</Text>
          </View>

          <View style={[styles.adsGlass, { borderColor: cardBorderAccent }]}>
            <BlurView intensity={50} tint={blurTintCard as any} style={StyleSheet.absoluteFillObject} />
            {loadingAds ? (
              <ActivityIndicator size="large" color={ACCENT} />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 6 }}>
                {ads.map((url, index) => (
                  <View key={index} style={[styles.adCard, { borderColor: cardBorderAccent }]}>
                    <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFillObject} />
                    <Image source={{ uri: url }} style={styles.adImage} />
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <View style={[styles.sectionTitlePill, { borderColor: borderAccent, backgroundColor: chipBg }]}>
            <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFillObject} />
            <Text style={[styles.sectionTitle, { color: chipText }]}>Features</Text>
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
                <View style={[styles.featureGlass, { borderColor: cardBorderAccent }]}>
                  <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFillObject} />
                  {loggedIn && (
                    <LinearGradient
                      colors={["rgba(255,149,0,0.10)", "rgba(255,149,0,0.06)"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={StyleSheet.absoluteFillObject}
                    />
                  )}
                  <Image source={feature.icon} style={styles.featureIcon} />
                </View>
                <Text style={[styles.featureText, { color: loggedIn ? "#333" : "#e8ecf7" }]}>
                  {feature.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "transparent" },

  container: {
    flexGrow: 1,
    paddingBottom: 90,
    paddingTop: 20,
  },

  // Accent background blobs
  accentBlobTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 260,
  },
  accentBlobBottom: {
    position: "absolute",
    bottom: -120,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 260,
  },

  // Header - glass wrapper
  headerGlass: {
    marginHorizontal: 14,
    marginTop: 18,
    borderRadius: 220,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    ...(isAndroid ? { elevation: 6 } : {}),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    minHeight: 56,
  },

  // Search - glass pill
  searchGlass: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  searchIcon: { marginRight: 8 },
  textInput: { flex: 1, height: 36, fontSize: 16 },

  // Logo - glass card
  logoCard: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    marginHorizontal: 14,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    ...(isAndroid ? { elevation: 8 } : {}),
    paddingVertical: 35,
  },
  // Ensures logo fits without cropping for both states
  logo: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    width: "80%",
    height: 300,
    alignSelf: "center",
  },

  // Section title
  section: { marginTop: 18, paddingHorizontal: 16 },
  sectionTitlePill: {
    alignSelf: "flex-start",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },

  // Ads glass row
  adsGlass: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 10,
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    ...(isAndroid ? { elevation: 4 } : {}),
  },
  adCard: {
    width: 160,
    height: 110,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  adImage: { width: "100%", height: "100%" },

  // Features
  featuresGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  featureItem: { alignItems: "center", width: "30%", marginBottom: 20 },
  featureGlass: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    ...(isAndroid ? { elevation: 3 } : {}),
  },
  featureIcon: { width: 64, height: 64, borderRadius: 8 },
  featureText: { fontSize: 13, fontWeight: "600", textAlign: "center", marginTop: 8 },

  // Avatar and user menu
  avatarButton: { paddingHorizontal: 2 },
  avatarGlass: {
    width: 38,
    height: 38,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarGlassSmall: {
    width: 38,
    height: 38,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // Highlight for login icon when not logged in
  loginIconHighlight: {
    padding: 0,
    borderRadius: 20,
    shadowColor: "#FFD700",
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    ...(isAndroid ? { elevation: 16 } : {}),
  },
  loginIconGlow: {
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 10,
  },
  userMenu: {
    position: "absolute",
    right: 12,
    top: 88,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    ...(isAndroid ? { elevation: 8 } : {}),
    zIndex: 11,
    minWidth: 200,
    overflow: "hidden",
  },
  userMenuTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  userMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  userMenuItemText: {
    fontSize: 16,
    color: "#d00",
    fontWeight: "600",
  },
});

export default HomePage;