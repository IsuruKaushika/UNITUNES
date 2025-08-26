import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      <LinearGradient
        colors={['rgba(255, 255, 255, 0.01)', 'rgba(255, 255, 255, 0.4)']}
        style={styles.bottomBar}
      >
        {/* Big + button anchored on the top-left corner of the bar */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.addButton}
          onPress={() => navigation.navigate('Add_Details' as never)}
        >
          <LinearGradient
            colors={['#ffffff', 'rgba(255,255,255,0.92)']}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.addButtonInner}
          >
            <Ionicons name="add" size={30} color="#708090" />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.addLabel}>Add</Text>

        {/* Existing controls kept and styled the same */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#708090" />
          <Text style={styles.label}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('index' as never)}>
          <Ionicons name="home" size={20} color="#708090" />
          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.canGoBack() && navigation.navigate('index' as never)}
        >
          <Ionicons name="arrow-forward" size={20} color="#708090" />
          <Text style={styles.label}>Forward</Text>
        </TouchableOpacity>
      </LinearGradient>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    height: 60,

    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 0,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      // android: { elevation: 10 },
    }),
  },

  // Big + button that sits slightly outside the bar on the top-left corner
  addButton: {
    position: 'absolute',
    left: 12,
    top: -22, // makes it sit like the "home" in your reference image
    width: 56,
    height: 56,
    borderRadius: 28,
    zIndex: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  addButtonInner: {
    flex: 1,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  addLabel: {
    position: 'absolute',
    left: 33, // align with the button
    bottom: 6, // inside the bar like other labels
    color: '#696969',
    fontSize: 10,
    fontWeight: 'bold',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#696969',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 3,
  },
});