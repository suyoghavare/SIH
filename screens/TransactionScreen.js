import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const TransactionScreen = () => {
  // Sample transaction history data

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <Text style={styles.infoText}>
        Recent transactions will appear here. You can also view your transaction.
        For further information, please contact your bank.
        </Text>
       <Text style={styles.infoText}> Helpline: 18001201740 (Toll Free)
      </Text>
      <Text style={styles.subTitle}>Recent Transactions:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#007BFF',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
    color: '#007BFF',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'justify',
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#000',
  },
  
});

export default TransactionScreen;