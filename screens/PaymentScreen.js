import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SendIntentAndroid } from 'react-native-sms';
import Communications from 'react-native-communications';
import queryString from 'query-string';
import { NativeModules,PermissionsAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

let DirectSms = NativeModules.DirectSms;

const PaymentScreen = ({ navigation }) => {
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const mobileNumber = '8451074332';
  const handlePayment = () => {
    // Construct the message
    if (!recipientName || !amount || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    
    // const message = `Recipient's Name: ${recipientName}, Amount: ${amount}, Phone Number: ${phoneNumber}`;
    //         const recipients = '9892731267'; // Replace with the recipient's phone number
          
    //         Communications.textWithoutEncoding(recipients, message);

  };

  const sendDirectSms = async () => {
    if (mobileNumber) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: 'Send SMS App Sms Permission',
            message:
              'Send SMS App needs access to your inbox ' +
              'so you can send messages in background.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          DirectSms.sendDirectSms(mobileNumber, `${recipientName},${amount},${phoneNumber}`);
          alert('SMS sent');
          setRecipientName('');
          setAmount('');
          setPhoneNumber('');
          // navigation.navigate('PaymentSuccess');
          
        } else {
          alert('SMS permission denied');
        }
      } catch (error) {
        console.warn(error);
        alert(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Recipient's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient's name"
          value={recipientName}
          onChangeText={setRecipientName}
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor={'#000'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholderTextColor={'#000'}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={sendDirectSms}>
        <Text style={styles.buttonText}>Make Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
