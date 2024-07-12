import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { firebase } from '../config';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLowercase, setIsLowercase] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isDigit, setIsDigit] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);

  useEffect(() => {
    // Validate password conditions
    setIsLowercase(/[a-z]/.test(password));
    setIsUppercase(/[A-Z]/.test(password));
    setIsDigit(/[0-9]/.test(password));
    setIsLengthValid(password.length >= 8);
  }, [password]);

  const registerUser = async (email, password, firstName, lastName) => {
    try {
      // Firebase registration logic
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://signup-33c21.firebaseapp.com',
      });
      alert('Verification Email Sent');
      
      await firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.registrationContainer}>
      <Text style={styles.registrationTitle}>
        Register Here!!
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.registrationTextInput}
          placeholder="First Name"
          placeholderTextColor="#888"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.registrationTextInput}
          placeholder="Last Name"
          placeholderTextColor="#888"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.registrationTextInput} 
          placeholder="Email"
          placeholderTextColor="#888"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.registrationTextInput} 
          placeholder="Password"
          placeholderTextColor="#888"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        
        {/* Password validation conditions */}
        <View style={styles.validationContainer}>
          <Text style={[styles.validationText, isLowercase ? styles.valid : styles.invalid]}>
            - At least one lowercase character
          </Text>
          <Text style={[styles.validationText, isUppercase ? styles.valid : styles.invalid]}>
            - At least one uppercase character
          </Text>
          <Text style={[styles.validationText, isDigit ? styles.valid : styles.invalid]}>
            - At least one digit
          </Text>
          <Text style={[styles.validationText, isLengthValid ? styles.valid : styles.invalid]}>
            - At least 8 characters long
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => registerUser(email, password, firstName, lastName)}
        style={styles.registrationButton}
        disabled={!isLowercase || !isUppercase || !isDigit || !isLengthValid}
      >
        <Text style={styles.registrationButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.regLinkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  registrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b2b2a',
    padding: 20,
  },
  registrationTitle: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#fff',
  },
  registrationTextInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    marginBottom: 10,
    textAlign: 'center',
    color: '#f7f5f5',
  },
  registrationButton: {
    marginTop: 20,
    height: 70,
    width: 250,
    backgroundColor: '#f7d17e',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  registrationButtonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
  },
  regLinkText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  validationContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  validationText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#fff',
  },
  valid: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  },
});
