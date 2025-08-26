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
  StudentLogin: undefined;
  Create_Student: undefined;
  index: undefined;
};

const backendUrl = 'https://unitunes-backend.vercel.app';
const registerEndpoint = `${backendUrl}/api/user/sturegister`;

const CreateProfessionalAccount: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [fullName, setFullName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [goodName, setGoodName] = useState(''); // kept for UI; not required by backend
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  // Convert "EG/1234/5678" to "EG12345678" (10 chars)
  const sanitizeStudentId = (value: string) => value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

  const validate = () => {
    if (!fullName.trim()) {
      Alert.alert('Validation', 'Please enter your full name');
      return false;
    }

    if (!registerNumber.trim()) {
      Alert.alert('Validation', 'Please enter your register number');
      return false;
    }
    const sanitizedId = sanitizeStudentId(registerNumber);
    if (sanitizedId.length !== 10) {
      Alert.alert(
        'Validation',
        'Student ID must be 10 characters. Example: EG/1234/5678 (we will format it as EG12345678).'
      );
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

    const sanitizedId = sanitizeStudentId(registerNumber);

    try {
      setSubmitting(true);

      // Backend-required payload fields
      const payload = {
        name: fullName.trim(), // backend expects "name"
        email: email.trim().toLowerCase(),
        password,
        phone: 'Not Provided', // required by backend; using placeholder to keep UI unchanged
        address: 'Not Provided', // required by backend; using placeholder to keep UI unchanged
        userType: 'Student', // required; must be 'Student' or 'BoardingOwner'
        identificationNumber: sanitizedId, // must be 10 chars for Students
      };

      const res = await fetch(registerEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // If response is not JSON
      }

      console.log('Student Register response:', data);

      if (res.ok && (data.success === undefined || data.success === true)) {
        Alert.alert('Account Created', 'Your account has been created successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('StudentLogin') },
        ]);
      } else {
        const msg =
          data?.message ||
          data?.error ||
          (res.status === 409
            ? 'Email already registered'
            : 'Unable to create account. Please verify your details and try again.');
        Alert.alert('Registration Failed', msg);
      }
    } catch (error) {
      console.error('Register error:', error);
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
        <Text style={styles.title}>Create Student Account</Text>

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
          placeholder="Register Number (EG/xxxx/xxxx)"
          placeholderTextColor="#ccc"
          value={registerNumber}
          onChangeText={(t) => setRegisterNumber(t)}
          autoCapitalize="characters"
        />

        <TextInput
          style={styles.input}
          placeholder="Good Name"
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

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.passwordStrength}>{passwordStrengthText}</Text>

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
  passwordStrength: {
    color: '#00ff00',
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

export default CreateProfessionalAccount;