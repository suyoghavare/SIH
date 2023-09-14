import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Alert, StyleSheet } from "react-native";
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartScreen = ({ navigation }) => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = () => {
    TouchID.isSupported()
      .then((biometryType) => {
        setIsBiometricAvailable(true);
      })
      .catch((error) => {
        console.error("Biometric authentication not supported:", error);
      });
  };

  const onPressAuthenticate = () => {
    const optionalConfigObject = {
      title: "Authentication Required",
      sensorDescription: "Use your fingerprint or Face ID",
      cancelText: "Cancel",
    };

    TouchID.authenticate("Authenticate with biometric data.", optionalConfigObject)
      .then((success) => {
        if (success) {
          // Biometric authentication succeeded, check if the user is registered
          checkUserRegistration();
        } else {
          console.log("Biometric authentication failed or canceled.");
          // Biometric authentication failed, show an alert to the user
          Alert.alert("Biometric authentication failed.");
        }
      })
      .catch((error) => {
        console.error("Biometric authentication error:", error);
        // Biometric authentication error, show an alert to the user
        Alert.alert("Biometric authentication error.");
      });
  };

  const checkUserRegistration = async () => {
    const isRegistered = await AsyncStorage.getItem('isRegistered');

    if (isRegistered === 'true') {
      // User is registered, navigate to the Home screen
      navigation.navigate("Home");
    } else {
      // User is not registered, navigate to the Login screen
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {isBiometricAvailable ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onPressAuthenticate()}
          >
            <Text style={styles.icon}>🔒</Text> 
          </TouchableOpacity>
        ) : (
          <Text style={styles.icon}>🔒</Text> 
        )}
      </View>
      <Text style={styles.title}>Biometric Authentication</Text>
      <Text style={styles.subtitle}>
        Use your fingerprint or Face ID to log in securely.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconContainer: {
    marginBottom: 30,
  },
  iconButton: {
    padding: 20,
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007BFF",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 30,
    color: "#666",
  },
});

export default StartScreen;
