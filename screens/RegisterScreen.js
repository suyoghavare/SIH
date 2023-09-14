import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [panCardNumber, setPanCardNumber] = useState('');
  const [dob, setDOB] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Validate the inputs here (e.g., check if they are not empty)

    // Create an object to store user registration data
    const userData = {
      fullName,
      email,
      phoneNumber,
      aadharNumber,
      panCardNumber,
      dob,
      password,
    };

    try {
      const requestBody = {
        MobNum: `+91${phoneNumber}`, // Add the mobile number
        fullName: fullName,
        email: email, 
        aadharNumber: aadharNumber, 
        panCardNumber: panCardNumber,
        dob: dob,
        password: password,
      };

      // Send a POST request to verify the OTP
      const response = await fetch(
        'https://qky6iinshd.execute-api.ap-northeast-1.amazonaws.com/dev/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );
        console.log(response);

        if (response.status === 200) {
      // Store the user data in AsyncStorage (you can use a different key)
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      // You can also store a flag to indicate that the user is registered
      await AsyncStorage.setItem('isRegistered', 'true');

      // Navigate to the Ease Pay Biometric upon successful registration
      navigation.navigate('Login');
    } 
  else if (response.status === 400){
    Alert.alert('User Already Registered', 'Go to login to proceed further', [{ text: 'OK' }], {
      cancelable: false,
    });
    navigation.navigate('Login');
  }
else {
  // Handle other status codes here
  Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
}}catch (error) {
      console.error('Error storing user data:', error);
      // Handle the error, possibly show an error message to the user
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <View style={styles.iconInput}>
        <FontAwesome name="user" size={20} color="#007BFF" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={styles.iconInput}>
        <FontAwesome name="envelope" size={20} color="#007BFF" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={styles.iconInput}>
        <FontAwesome name="phone" size={20} color="#007BFF" />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={styles.iconInput}>
        <FontAwesome name="id-card" size={20} color="#007BFF" />
        <TextInput
          style={styles.input}
          placeholder="Aadhar Number"
          keyboardType="numeric"
          value={aadharNumber}
          onChangeText={setAadharNumber}
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={styles.iconInput}>
        <FontAwesome name="id-card" size={20} color="#007BFF" />
        <TextInput
          style={styles.input}
          placeholder="Pan Card Number"
          value={panCardNumber}
          onChangeText={setPanCardNumber}
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={styles.iconInput}>
        <FontAwesome name="calendar" size={20} color="#007BFF" />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (MM/DD/YYYY)"
          value={dob}
          onChangeText={setDOB}
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={styles.iconInput}>
        <FontAwesome name="lock" size={20} color="#007BFF" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={'#000'}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
  },
  iconInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default RegisterScreen;
