import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef([]);
  const [MobNum, setMobNum] = useState('');


  //Production//
  // Extract the phone number from the route parameters
  const { phone } = route.params;

  // Set the phone number to the MobNum state variable
  useEffect(() => {
    setMobNum(phone);
  }, [phone]);

  const handleOtpSubmission = async () => {
    // Combine the individual OTP digits
    const enteredOtp = otp.join('');

    try {
      // Create the request body with MobNum and otp
      const requestBody = {
        MobNum: `+91${MobNum}`, // Add the mobile number
        otp: enteredOtp,
      };

      // Send a POST request to verify the OTP
      const response = await fetch(
        'https://qky6iinshd.execute-api.ap-northeast-1.amazonaws.com/dev/otp/verify',
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
        // OTP verification successful, reset OTP input and navigate to the Home screen
        setOtp(['', '', '', '', '', '']);
        await AsyncStorage.setItem('isLogin', 'true');
        navigation.navigate('Home');
      } else if (response.status === 400) {
        // OTP verification failed, display an error message
        setOtp(['', '', '', '', '', '']);
        Alert.alert('Invalid OTP', 'The entered OTP is incorrect. Please try again.', [{ text: 'OK' }], {
          cancelable: false,
        });
      } else {
        // Handle other status codes here
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };


  //testing//
  //  const handleOtpSubmission = () => {
  //   // Combine the individual OTP digits
  //   const enteredOtp = otp.join('');

  //   // Implement your OTP verification logic here
  //   // For example, you can compare the entered OTP with a valid OTP
  //   // and navigate to the HomeScreen upon successful verification
  //   const validOtp = '123456'; // Replace with your valid OTP
  //   if (enteredOtp === validOtp) {
  //     AsyncStorage.setItem('isRegistered', 'true')
  //     .then(() => {
  //       setOtp(['', '', '', '', '', '']);
  //       navigation.navigate('Home');
  //     })
  //     .catch((error) => {
  //       console.error('Error setting isRegistered:', error);
  //     });
  //   } else {
  //     setOtp(['', '', '', '', '', '']);
  //     Alert.alert('Invalid OTP', 'Please enter a valid OTP.', [{ text: 'OK' }], {
  //       cancelable: false,
  //     });
  //   }
  // };

  const handleOtpInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Focus on the next input or navigate to the next screen after all OTP digits are entered
    if (index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    } else {
      // You can add navigation logic to the next screen here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.mobNumText}>Mobile Number: {MobNum}</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpInputChange(index, value)}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => (otpInputs.current[index] = ref)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOtpSubmission}>
        <Text style={styles.buttonText}>Submit OTP</Text>
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
    padding: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007BFF',
  },
  mobNumText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OtpScreen;
