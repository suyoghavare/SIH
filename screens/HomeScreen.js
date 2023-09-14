import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, BackHandler, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);



  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [firstTimePayment, setFirstTimePayment] = useState(true);
    const handleLogout = async () => {
    // Clear the user credentials from AsyncStorage
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('isLogin');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }

    // Implement logout logic here
    // For now, just navigate back to the login screen
    navigation.navigate('Login');
    
  };

  const cards = [
    { title: 'Make a Payment', icon: 'credit-card', screen: firstTimePayment ? 'PaymentSetUp' : 'Payment' },
    { title: 'Transaction History', icon: 'info', screen: 'Transaction History' },
    { title: 'Apply for Loans', icon: 'dollar-sign' , screen: 'Loans' },
    { title: 'View Policies', icon: 'file-text', screen: 'ViewPolicies' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Ease-Pay App</Text>
        {isLoggedIn ? (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => {
              if (card.title === 'Make a Payment') {
                setFirstTimePayment(false);
              }
              navigation.navigate(card.screen);
            }}
          >
            <Icon name={card.icon} size={40} color="white" />
            <Text style={styles.cardTitle}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#007BFF',
  },
  loginButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#d9534f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    marginBottom: 15,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
});

export default HomeScreen;
