import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import db from './database';

const TransactionScreen = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [totalSuccessAmount, setTotalSuccessAmount] = useState(0);
  const [totalSuccessAmountLastWeek, setTotalSuccessAmountLastWeek] = useState(0);
  const [totalSuccessAmountLastMonth, setTotalSuccessAmountLastMonth] = useState(0);

  useEffect(() => {
    // Retrieve payment history from the database
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM payment_history ORDER BY id DESC LIMIT 10',
        [],
        (_, results) => {
          const rows = results.rows;
          const history = [];

          let successAmount = 0; // Track the total successful amount
          let successAmountLastWeek = 0;
          let successAmountLastMonth = 0;

          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            history.push({
              id: item.id,
              transaction_id: item.transaction_id,
              date_time: new Date(item.date_time).toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
              }),
              recipient: item.recipient,
              amount: item.amount,
              status: item.status,
            });

            // Add the successful transaction amount to the total
            if (item.status === 'success') {
              successAmount += item.amount;
              const itemDate = new Date(item.date_time);

              // Check if the transaction date falls within the last week
              if (itemDate >= new Date().getTime() - 7 * 24 * 60 * 60 * 1000) {
                successAmountLastWeek += item.amount;
              }

              // Check if the transaction date falls within the last month
              if (itemDate >= new Date().getTime() - 30 * 24 * 60 * 60 * 1000) {
                successAmountLastMonth += item.amount;
              }
            }
          }

          setPaymentHistory(history);
          setTotalSuccessAmount(successAmount);
          setTotalSuccessAmountLastWeek(successAmountLastWeek);
          setTotalSuccessAmountLastMonth(successAmountLastMonth);
        },
        (error) => {
          console.error('Error fetching payment history:', error);
        }
      );
    });
  }, []);

  const renderPaymentItem = ({ item }) => {
    let statusColor;

    switch (item.status) {
      case 'success':
        statusColor = '#4CAF50'; // Green for success
        break;
      case 'failed':
        statusColor = '#F44336'; // Red for failed
        break;
      case 'pending':
      default:
        statusColor = '#FFC107'; // Yellow for pending (default)
        break;
    }

    return (
      <View style={[styles.paymentItem, { borderColor: statusColor }]}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionId}>Transaction ID: {item.transaction_id}</Text>
          <Text style={styles.dateTime}>Date: {item.date_time}</Text>
          <Text style={styles.recipient}>Recipient: {item.recipient}</Text>
          <Text style={styles.amount}>
            Amount: ₹ {item.amount.toFixed(2)}
          </Text>
        </View>
        <Text style={[styles.status, { backgroundColor: statusColor }]}>{item.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
        <Text style={styles.totalSuccessAmount}>
          Total Amount Spent: ₹ {totalSuccessAmount.toFixed(2)}
        </Text>
        <Text style={styles.totalSuccessAmountLastWeek}>
          Last Week: ₹ {totalSuccessAmountLastWeek.toFixed(2)}
        </Text>
        <Text style={styles.totalSuccessAmountLastMonth}>
          Last Month: ₹ {totalSuccessAmountLastMonth.toFixed(2)}
        </Text>
      </View>
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
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  totalSuccessAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  totalSuccessAmountLastWeek: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  totalSuccessAmountLastMonth: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  paymentItem: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color : '#000',
    paddingBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
  },
  recipient: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  status: {
    fontSize: 14,
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default TransactionScreen;
