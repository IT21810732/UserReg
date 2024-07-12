import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

const Dashboard = ({ navigation }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const snapshot = await firebase.firestore().collection('users')
                    .doc(firebase.auth().currentUser.uid).get();
                if (snapshot.exists) {
                    setName(snapshot.data().firstName);
                } else {
                    console.log('User does not exist');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.greetingText}>
                    Hello, {name}
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Characters')}
                    style={[styles.button, { marginTop: 20 }]}
                >
                    <Text style={styles.buttonText}>
                        Characters
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Sign Out Button */}
            <TouchableOpacity
                onPress={() => firebase.auth().signOut()}
                style={[styles.button, styles.signOutButton]}
            >
                <Text style={styles.buttonText}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b2b2a',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    button: {
        height: 70,
        width: 250,
        backgroundColor: '#f7d17e',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    signOutButton: {
        position: 'absolute',
        bottom: 40, 
    },
});
