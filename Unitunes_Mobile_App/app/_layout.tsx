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

      {/* Bottom bar (kept same style and buttons) */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.01)', 'rgba(255, 255, 255, 0.4)']}
        style={styles.bottomBar}
      >
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

      {/* Big + button OUTSIDE the bottom bar, aligned to its left side */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBoardings' as never)}
      >
        <LinearGradient
          colors={['#F57373', '#F9A03F']}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.addButtonInner}
        >
          <Ionicons name="add" size={34} color="#708090" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Label inside the bar near left edge, similar to the reference image */}
      <Text style={styles.addLabel}>Add</Text>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const BAR_BOTTOM = 15;
const BAR_LEFT = 20;
const BAR_HEIGHT = 60;
const ADD_SIZE = 64; // bigger than other icons

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: BAR_BOTTOM,
    left: 30,
    right: 20,
    height: BAR_HEIGHT,

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

  // Floating big + button outside of the bar on the LEFT
  addButton: {
    position: 'absolute',
    // Place it completely outside the bar, horizontally left of bar's left edge,
    // and vertically centered to the bar
    left: Math.max(6, BAR_LEFT - ADD_SIZE / 2 + 25), // slightly outside the bar
    bottom: BAR_BOTTOM + BAR_HEIGHT / 2 - ADD_SIZE / 2 + 35,
    width: ADD_SIZE,
    height: ADD_SIZE,
    borderRadius: ADD_SIZE / 2,
    zIndex: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  addButtonInner: {
    flex: 1,
    borderRadius: ADD_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  // Label sits on top of the bar near its left edge
  addLabel: {
    position: 'absolute',
    left: BAR_LEFT + 18,
    bottom: BAR_BOTTOM + 8,
    color: '#696969',
    fontSize: 10,
    fontWeight: 'bold',
    zIndex: 25,
  },
});