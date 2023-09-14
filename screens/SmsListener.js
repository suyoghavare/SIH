import SmsListener from 'react-native-android-sms-listener';
import { Alert } from 'react-native';
import db from './database';

const startSmsListener = ({ setIsModalVisible, navigation, transactionId }) => {
  SmsListener.addListener(message => {
    const smsBody = message.body;
    console.log('Received SMS:', smsBody);

    // Check if the SMS contains "True" and the transactionId
    if (smsBody.includes('Transaction Successfull!')) {
      // Close the modal when the desired SMS is received
      setIsModalVisible(false);

      // Update payment status to 'success' in the database
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE payment_history SET status = ? WHERE transaction_id = ?',
          ['success', transactionId],
          (_, results) => {
            console.log('Payment status updated to success:', results);
          },
          (error) => {
            console.error('Error updating payment status:', error);
          }
        );
      });

      // Show a success alert
      Alert.alert(
        'Success',
        'Your payment is successfully processed. Please check the transaction history for updates.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to PaymentSuccess screen
              navigation.navigate('PaymentSuccess');
            },
          },
        ]
      );
    }
    // Check if the SMS contains "False" and the transactionId
    else if (smsBody.includes('Transaction Failed!')) {
      // Close the modal when the desired SMS is received
      setIsModalVisible(false);

      // Update payment status to 'failed' in the database
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE payment_history SET status = ? WHERE transaction_id = ?',
          ['failed', transactionId],
          (_, results) => {
            console.log('Payment status updated to failed:', results);
          },
          (error) => {
            console.error('Error updating payment status:', error);
          }
        );
      });

      Alert.alert(
        'Failure',
        'Your payment is not successfully processed. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to PaymentFail screen
              navigation.navigate('PaymentFail');
            },
          },
        ]
      );
    }
  });
};

export { startSmsListener };
