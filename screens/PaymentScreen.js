import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';

import { NativeModules,PermissionsAndroid} from 'react-native';


let DirectSms = NativeModules.DirectSms;

const PaymentScreen = ({ navigation }) => {
  const [recipientNumber, setRecipientNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [PinNumber, setPinNumber] = useState('');
  const mobileNumber = '8451074332';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handlePayment = () => {
    // Construct the message
    
    
    // const message = `Recipient's Name: ${recipientName}, Amount: ${amount}, Phone Number: ${phoneNumber}`;
    //         const recipients = '9892731267'; // Replace with the recipient's phone number
          
    //         Communications.textWithoutEncoding(recipients, message);

  };

  const sendDirectSms = async () => {
    if (!recipientNumber || !amount || !PinNumber) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
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
          DirectSms.sendDirectSms(mobileNumber, `"Payment",${recipientNumber},${amount},${PinNumber}`);
          setIsModalVisible(true); // Show the modal when user clicks on Apply
                    setTimeout(() => {
                        setIsModalVisible(false); // Hide the modal after 3 seconds
                    }, 3000);
          setRecipientNumber('');
          setAmount('');
          setPinNumber('');
          navigation.navigate('PaymentSuccess');
          
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
          placeholder="Enter phone number"
          keyboardType="numeric"
          value={PinNumber}
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
    color: '#000',
},
modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    color: '#000',
},
modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
},

});

export default PaymentScreen;
