import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  AdminLogin: undefined;
  Create_Admin: undefined;
  index: undefined;
};

const backendUrl = 'https://unitunes-backend.vercel.app';
const adminRegisterEndpoint = `${backendUrl}/api/user/admin`;

const CreateAdminAccount: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [fullName, setFullName] = useState('');
  const [goodName, setGoodName] = useState(''); // kept for UI; not required by backend
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const passwordStrengthText = useMemo(() => {
    const hasMinLength = password.length >= 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const score = [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    if (!password) return '--';
    if (score <= 2) return '-- Weak';
    if (score === 3 || score === 4) return '-- Medium';
    return '-- Strong';
  }, [password]);

  const strengthColor = useMemo(() => {
    if (!password) return '#cccccc';
    if (passwordStrengthText.includes('Weak')) return '#ff4d4d';
    if (passwordStrengthText.includes('Medium')) return '#ffb020';
    return '#00ff7f';
  }, [password, passwordStrengthText]);

  const validate = () => {
    if (!fullName.trim()) {
      Alert.alert('Validation', 'Please enter your full name');
      return false;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      Alert.alert('Validation', 'Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Validation', 'Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (submitting) return;
    if (!validate()) return;

    try {
      setSubmitting(true);

      // Backend-required payload (mirrors your student flow)
      const payload = {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: 'Not Provided', // placeholder if backend requires it
        address: 'Not Provided', // placeholder if backend requires it
        userType: 'Admin',
      };

      const res = await fetch(adminRegisterEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // Non-JSON response
      }

      console.log('Admin Register response:', data);

      if (res.ok && (data.success === undefined || data.success === true)) {
        Alert.alert('Account Created', 'Admin account has been created successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('AdminLogin') },
        ]);
      } else {
        const msg =
          data?.message ||
          data?.error ||
          (res.status === 409
            ? 'Email already registered'
            : 'Unable to create admin account. Please verify your details and try again.');
        Alert.alert('Registration Failed', msg);
      }
    } catch (error) {
      console.error('Admin register error:', error);
      Alert.alert('Error', 'Unable to connect to the server');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Logg_Back.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create Admin Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#ccc"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Good Name (optional)"
          placeholderTextColor="#ccc"
          value={goodName}
          onChangeText={setGoodName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { paddingRight: 44 }]}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showPw}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPw(v => !v)}
            style={styles.pwToggle}
            accessibilityRole="button"
            accessibilityLabel={showPw ? 'Hide password' : 'Show password'}
          >
            <Ionicons name={showPw ? 'eye-off' : 'eye'} size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.passwordStrength, { color: strengthColor }]}>
          {passwordStrengthText}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={submitting}>
          <Text style={styles.buttonText}>{submitting ? 'Signing up...' : 'Sign up'}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '50%',
  },
  container: {
    flex: 1,
    paddingTop: 195,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
  passwordRow: {
    width: '80%',
    position: 'relative',
  },
  pwToggle: {
    position: 'absolute',
    right: 16,
    top: 14,
    height: 22,
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordStrength: {
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#800080',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateAdminAccount;