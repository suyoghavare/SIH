import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'payment_history.db', location: 'default' });

// Create the payment_history table if it doesn't exist
db.transaction((tx) => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS payment_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_id TEXT,
      date_time TEXT,
      recipient TEXT,
      amount REAL,
      status TEXT
    )`
  );
});

export default db;
