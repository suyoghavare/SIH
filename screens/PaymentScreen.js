import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { NativeModules, PermissionsAndroid, DeviceEventEmitter } from 'react-native';
import SmsRetriever from 'react-native-sms-retriever';
import SmsListener from 'react-native-android-sms-listener';
import { startSmsListener } from './SmsListener';

let DirectSms = NativeModules.DirectSms;



function generateTransactionId() {
  // Generate a random string of 8 characters
  const randomString = Math.random()
    .toString(36)
    .substring(2, 10);

  // Get the current timestamp
  const timestamp = new Date().getTime();

  // Combine the random string and timestamp to create the transaction ID
  const transactionId = `${randomString}${timestamp}`;

  return transactionId;
}


const PaymentScreen = ({ navigation }) => {
  const [recipientNumber, setRecipientNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [pinNumber, setPinNumber] = useState('');
  const mobileNumber = '8451074332';
  const [isModalVisible, setIsModalVisible] = useState(false);

  

  const sendDirectSms = async () => {
    if (!recipientNumber || !amount || !pinNumber) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (mobileNumber) {
      try {
        const transactionId = generateTransactionId();
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, // Add RECEIVE_SMS permission
        ]);
  
        if (
          granted['android.permission.SEND_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          DirectSms.sendDirectSms(
            mobileNumber,
            `Px${recipientNumber}x${amount}x${pinNumber}x${transactionId}`
          );
          setIsModalVisible(true); // Show the modal when the user clicks on Apply
          startSmsListener({ setIsModalVisible, navigation ,transactionId }); // Start listening for incoming SMS messages
          console.log('SMS listener started');
          // Clear the input fields
          setRecipientNumber('');
          setAmount('');
          setPinNumber('');
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
        <Text style={styles.label}>Recipient's Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Recipient's Number"
          keyboardType="numeric"
          value={recipientNumber}
          onChangeText={setRecipientNumber}
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
        <Text style={styles.label}>Pin</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PIN"
          keyboardType="numeric"
          value={pinNumber}
          onChangeText={setPinNumber}
          placeholderTextColor={'#000'}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={sendDirectSms}>
        <Text style={styles.buttonText}>Make Payment</Text>
      </TouchableOpacity>
      {/* Modal for "Applied Successfully" */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Payment Processing .....</Text>
            <Text style={styles.modalText}>Please wait</Text>
            <Text style={styles.modalText}>Dont go back or minimize the screen</Text>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default PaymentScreen;
