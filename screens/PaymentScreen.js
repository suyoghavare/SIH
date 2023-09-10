import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Communications from 'react-native-communications';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [scanned, setScanned] = useState(false);
  const [qrScannerActive, setQrScannerActive] = useState(false);

  const navigation = useNavigation();

  const handleScan = ({ data }) => {
    setScanned(true);
    setQrScannerActive(false);
    promptForAmountAndPin(data);
  };

  const promptForAmountAndPin = (qrData) => {
    // Show a custom modal or dialog to prompt for amount and PIN
    // Once the user enters the amount and PIN, send the SMS
    // Example:
    // You can use a library like 'react-native-modal' to show a modal

    // Construct the message
    const message = `Scanned QR code data: ${qrData}\nAmount: ${amount}\nPIN: ${enteredPin}`;
    const recipients = '9892731267'; // Replace with the recipient's phone number
    Communications.text(recipients, message);
    // Send SMS

    // Navigate back to the payment screen
    navigation.navigate('Payment');
  };

  const handleBackFromScanner = () => {
    setQrScannerActive(false);
    navigation.navigate('Payment');
  };

  useEffect(() => {
    // Request permissions and set hasPermission state here
  }, []);

  const handlePayment = () => {
    setPaymentInProgress(true);
    sendPaymentDataViaSMS();
    setTimeout(() => {
      setPaymentInProgress(false);
    }, 3000);
  };

  const sendPaymentDataViaSMS = () => {
    const message = `Recipient's Name: ${recipientName}, Amount: ${amount}, Phone Number: ${phoneNumber}`;
    const recipients = '9892731267'; // Replace with the recipient's phone number
    Communications.text(recipients, message);
    navigation.navigate('PaymentSuccess');
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
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePayment}
        disabled={paymentInProgress}
      >
        <Text style={styles.buttonText}>
          {paymentInProgress ? 'Payment in Process...' : 'Make Payment'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.qrContainer}>
        {qrScannerActive ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackFromScanner}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => {
              setScanned(false);
              setQrScannerActive(true);
            }}
            disabled={scanned}
          >
            <Text style={styles.qrButtonText}>
              {scanned ? 'QR Scanned' : 'Scan QR'}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {/* QR Scanner View */}
      {qrScannerActive && (
        /* Include your QR scanner component here */
        <View style={styles.qrScanner}>
          {/* Add QR Scanner UI */}
        </View>
      )}
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
  qrContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  qrButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 30,
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 30,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrScanner: {
    flex: 1, // Adjust as needed
  },
});

export default PaymentScreen;
