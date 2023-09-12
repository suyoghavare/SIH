// Import necessary dependencies
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components
import LoginScreen from './screens/LoginScreen'; // Adjust the path as needed
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import OtpScreen from './screens/OtpScreen';
import PaymentSetUp from './screens/PaymentSetUp';
import BankSetUp from './screens/BankSetUp';
import PaymentScreen from './screens/PaymentScreen';
import PaymentSuccess from './screens/PaymentSuccess';
import LoansScreen from './screens/LoanScreen';
import PaymentFail from './screens/PaymentFailure';

// Adjust the path as needed
// Import other screen components here...

// Create a Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Define your app's screens and their navigation options */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="PaymentSetUp" component={PaymentSetUp} />
        <Stack.Screen name="BankSetUp" component={BankSetUp} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="Loans" component={LoansScreen} />
        <Stack.Screen name="PaymentFail" component={PaymentFail} />
        
        
        {/* Add more screens and navigation options here... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
