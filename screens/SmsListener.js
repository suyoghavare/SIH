import SmsListener from 'react-native-android-sms-listener';
import PaymentScreen from './PaymentScreen';
import { Alert } from 'react-native';
import PaymentSuccess from './PaymentSuccess';
import transactionId from './PaymentScreen';

const startSmsListener = ({ setIsModalVisible, navigation , transactionId }) => {
  SmsListener.addListener(message => {
    const smsBody = message.body;
    console.log('Received SMS:', smsBody);

    if (smsBody.includes('True',transactionId)) {
      // Close the modal when the desired SMS is received
      setIsModalVisible(false);

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
    else if (smsBody.includes('False',transactionId)) {
      // Close the modal when the desired SMS is received
      setIsModalVisible(false);

      // Show a success alert
      Alert.alert(
        'Failure',
        'Your payment is not successfully processed. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to PaymentSuccess screen
              navigation.navigate('PaymentFail');
            },
          },
        ]
      );
    }
  });
};

export { startSmsListener };
