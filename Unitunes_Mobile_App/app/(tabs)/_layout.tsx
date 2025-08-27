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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});