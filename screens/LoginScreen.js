import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhoneNumber] = useState('');

  const handleLogin = async () => {
    // try {
    //   // Remove spaces and non-numeric characters from the phone number
    //   const cleanedPhoneNumber = phone.replace(/\D/g, '');

    //   // Validate the phone number format
    //   if (!cleanedPhoneNumber.match(/^\d{10}$/)) {
    //     Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
    //     return;
    //   }

    //   // Construct the request body
    //   const requestBody = {
    //     ToNum: `+91${cleanedPhoneNumber}`,
    //   };

    //   // Send a POST request to the API
    //   const response = await fetch(
    //     'https://qky6iinshd.execute-api.ap-northeast-1.amazonaws.com/dev/otp',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(requestBody),
    //     }
    //   );

    //   if (response.ok) {
    //     // Request successful, navigate to the OTP screen
    //     navigation.navigate('Otp');
    //   } else {
    //     // Request failed, display an error message
    //     Alert.alert('Error', 'Failed to generate OTP. Please try again later.');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    // }

    navigation.navigate('Otp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Ease-Pay App</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhoneNumber}
        placeholderTextColor="#000"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Generate OTP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerLinkText}>Don't have an account? Register here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007BFF',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 15,
  },
  registerLinkText: {
    color: '#007BFF',
    fontSize: 14,
  },
});

export default LoginScreen;
