import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentFail = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack(); // Automatically go back to the previous screen after 3 seconds
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Icon name="close" size={30} color="#D30000" />
      </TouchableOpacity>
      <Icon name="check-circle" size={100} color="#D30000" />
      <Text style={styles.message}>Your payment is failed. Please try again.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#0079FF',
  },
});

export default PaymentFail;
