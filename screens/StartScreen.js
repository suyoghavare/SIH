import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, TextInput,Text, StyleSheet } from "react-native";
import TouchID from 'react-native-touch-id';

const StartScreen = ({ navigation }) => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [pin, setPin] = useState("");

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = () => {
    const isTouchIDAvailable = TouchID.isSupported();
    setIsBiometricAvailable(isTouchIDAvailable);
  };

  const onPressAuthenticate = async () => {
    if (isBiometricAvailable) {
      const optionalConfigObject = {
        title: "Authentication Required", // Title shown in the prompt
        sensorDescription: "Touch your fingerprint sensor", // Description shown in the prompt
        cancelText: "Cancel", // Label for the cancel button
        fallbackTitle: "Enter PIN", // Title shown in the fallback prompt
        fallbackDescription: "Enter your PIN to proceed", // Description shown in the fallback prompt
      };

      TouchID.authenticate("Authenticate with your fingerprint to proceed to log in securely.", optionalConfigObject)
        .then((success) => {
          if (success) {
            navigateToLogin();
          } else {
            console.log("Biometric authentication failed or canceled.");
            // Prompt the user for their PIN
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Prompt the user for their PIN
      Alert.alert(
        "Biometric authentication is not available.",
        "Please enter your PIN to proceed.",
        [
          {
            text: "Cancel",
            onPress: () => {
              // Do nothing
            },
          },
          {
            text: "OK",
            onPress: () => {
              // Authenticate the user with their PIN
            },
          },
        ],
      );
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {isBiometricAvailable ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onPressAuthenticate}
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
      {isBiometricAvailable ? null : (
        <TextInput
          style={styles.pinInput}
          placeholder="Enter PIN"
          value={pin}
          onChangeText={(text) => setPin(text)}
          secureTextEntry={true}
        />
      )}
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
  pinInput: {
    width: 200,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default StartScreen;