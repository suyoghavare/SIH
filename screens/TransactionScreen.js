import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import db from './database';

const TransactionScreen = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Retrieve payment history from the database
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM payment_history ORDER BY id DESC LIMIT 10',
        [],
        (_, results) => {
          const rows = results.rows;
          const history = [];

          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            history.push({
              id: item.id,
              transaction_id: item.transaction_id,
              date_time: item.date_time,
              recipient: item.recipient,
              amount: item.amount,
              status: item.status,
            });
          }

          setPaymentHistory(history);
        },
        (error) => {
          console.error('Error fetching payment history:', error);
        }
      );
    });
  }, []);

  const renderPaymentItem = ({ item }) => {
    let backgroundColor;

    switch (item.status) {
      case 'success':
        backgroundColor = '#4CAF50'; // Green for success
        break;
      case 'failed':
        backgroundColor = '#F44336'; // Red for failed
        break;
      case 'pending':
      default:
        backgroundColor = '#000'; // Black for pending (default)
        break;
    }

    return (
      <View style={[styles.paymentItem, { backgroundColor }]}>
        <Text>Transaction ID: {item.transaction_id}</Text>
        <Text>Date/Time: {item.date_time}</Text>
        <Text>Recipient: {item.recipient}</Text>
        <Text>Amount: {item.amount}</Text>
        <Text>Status: {item.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={paymentHistory}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
  paymentItem: {
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default TransactionScreen;
