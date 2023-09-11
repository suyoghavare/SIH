import SmsListener from 'react-native-android-sms-listener';
import PaymentScreen from './PaymentScreen';
import { Alert } from 'react-native';
import PaymentSuccess from './PaymentSuccess';

const startSmsListener = ({ setIsModalVisible, navigation }) => {
  SmsListener.addListener(message => {
    const smsBody = message.body;
    console.log('Received SMS:', smsBody);

    if (smsBody.includes('Your Payment is Successful')) {
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
  });
};

export { startSmsListener };
