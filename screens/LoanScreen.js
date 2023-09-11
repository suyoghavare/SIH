import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';


import { NativeModules, PermissionsAndroid } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

let DirectSms = NativeModules.DirectSms;

const LoansScreen = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [income, setIncome] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const mobileNumber = '8451074332';

    const sendDirectSms = async () => {
        // Implement your loan application logic here
        // For example, you can validate the fields and submit the application
        // You can also show a confirmation message to the user
        if (!loanAmount || !income || !employmentType) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        if (mobileNumber) {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.SEND_SMS,
                    {
                        title: 'Send SMS App Sms Permission',
                        message:
                            'Send SMS App needs access to your inbox ' +
                            'so you can send messages in background.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    DirectSms.sendDirectSms(mobileNumber, `"Loan",${loanAmount},${income},${employmentType}`);
                    setIsModalVisible(true); // Show the modal when user clicks on Apply
                    setTimeout(() => {
                        setIsModalVisible(false); // Hide the modal after 3 seconds
                    }, 3000);

                    setLoanAmount('');
                    setIncome('');
                    setEmploymentType('');
                    // navigation.navigate('PaymentSuccess');

                } else {
                    alert('SMS permission denied');
                }
            } catch (error) {
                console.warn(error);
                alert(error);
            }
        }
    };





    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Apply for a Loan</Text>
            <Text style={styles.subtitle}>Loan Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Loan Amount (₹)"
                value={loanAmount}
                onChangeText={setLoanAmount}
                keyboardType="numeric"
                placeholderTextColor={'#000'}
            />
            <TextInput
                style={styles.input}
                placeholder="Annual Income (₹)"
                value={income}
                onChangeText={setIncome}
                keyboardType="numeric"
                placeholderTextColor={'#000'}
            />
            <TextInput
                style={styles.input}
                placeholder="Employment Type"
                value={employmentType}
                onChangeText={setEmploymentType}
                placeholderTextColor={'#000'}
            />

            <Text style={styles.subtitle}>Loan Information</Text>
            <Text style={styles.infoText}>
                Be aware of your rights and responsibilities as a borrower, including any collateral requirements.
                Understand the impact on your credit score due to reporting to credit bureaus.
                For questions or clarifications, contact our customer service.
                Remember, loans involve financial commitment; ensure you comprehend all terms before proceeding.
                This disclaimer is not exhaustive; refer to your loan agreement for comprehensive details.
            </Text>

            <Text style={styles.subtitle}>Disclaimer</Text>
            <Text style={styles.disclaimerText}>
                This information provided is for demonstration purposes only.
                The loan application is not real and will not result in an actual loan approval or its disbursement.
            </Text>

            <TouchableOpacity style={styles.applyButton} onPress={sendDirectSms}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>

            {/* Modal for "Applied Successfully" */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Applied Successfully</Text>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#007BFF',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#007BFF',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: '#000'
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'gray',
    },
    disclaimerText: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
        color: 'gray',
    },
    applyButton: {
        backgroundColor: '#007BFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#000',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        color: '#000',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007BFF',
    },
});

export default LoansScreen;