import React, { useState, useEffect, useRef } from 'react';
import { Stack } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const currentPath = '/' + segments.join('/');

  const [history, setHistory] = useState<string[]>(['/']);
  const [future, setFuture] = useState<string[]>([]);

  const isNavigatingBackOrForward = useRef(false);

  useEffect(() => {
    if (!isNavigatingBackOrForward.current) {
      // Normal navigation or user link -- add to history and clear future
      setHistory((prev) => {
        if (prev[prev.length - 1] !== currentPath) {
          return [...prev, currentPath];
        }
        return prev;
      });
      setFuture([]);
    } else {
      // Reset flag after navigation triggered by back or forward buttons
      isNavigatingBackOrForward.current = false;
    }
  }, [currentPath]);

  const onBack = () => {
    if (history.length > 1) {
      isNavigatingBackOrForward.current = true;
      setFuture((f) => [history[history.length - 1], ...f]);
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      router.push(newHistory[newHistory.length - 1]); // Use push instead of replace
    }
  };

  const onForward = () => {
    if (future.length > 0) {
      isNavigatingBackOrForward.current = true;
      const next = future[0];
      setFuture(future.slice(1));
      setHistory((h) => [...h, next]);
      router.push(next); // Use push instead of replace
    }
  };

  const onHome = () => {
    isNavigatingBackOrForward.current = true;
    setHistory(['/']);
    setFuture([]);
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="explore" />
        {/* Your other screens */}
      </Stack>

      <View style={styles.ribbon}>
        <TouchableOpacity
          onPress={onBack}
          disabled={history.length <= 1}
          style={[styles.button, history.length <= 1 && styles.disabled]}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={history.length > 1 ? '#FFF' : '#AAA'}
          />
          <Text style={[styles.buttonText, history.length <= 1 && styles.disabledText]}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onHome} style={styles.button}>
          <Ionicons name="home" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onForward}
          disabled={future.length === 0}
          style={[styles.button, future.length === 0 && styles.disabled]}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={future.length > 0 ? '#FFF' : '#AAA'}
          />
          <Text style={[styles.buttonText, future.length === 0 && styles.disabledText]}>
            Forward
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  ribbon: {
    height: 48,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  button: {
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 9,
    marginTop: 1,
  },
  disabledText: {
    color: '#AAA',
  },
});
