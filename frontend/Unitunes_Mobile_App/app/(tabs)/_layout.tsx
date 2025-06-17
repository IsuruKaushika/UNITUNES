import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
    </Stack>
  );
}