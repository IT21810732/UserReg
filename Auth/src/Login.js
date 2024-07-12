import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config'; 

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  // Forgot password function
  const forgetPassword = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>My App</Text>

      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.loginTextInput}
          placeholder="Email"
          placeholderTextColor="#888"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.loginTextInput}
          placeholder="Password"
          placeholderTextColor="#888"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => loginUser(email, password)}>
        <Text style={styles.loginButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.loginLinkText}>Don't have an account? Register Now</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={forgetPassword} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Forget Password??</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b2b2a',
    padding: 20,
  },
  loginTitle: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#fff',
  },
  loginTextInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#403f3e',
    marginBottom: 10,
    textAlign: 'center',
    color: '#f7f5f5',
  },
  loginButton: {
    marginTop: 20,
    height: 70,
    width: 250,
    backgroundColor: '#f7d17e',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  loginButtonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
  },
  loginLinkText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});
