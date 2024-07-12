import { Text, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

const Dashboard = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const snapshot = await firebase.firestore().collection('users')
                    .doc(firebase.auth().currentUser.uid).get();
                if (snapshot.exists) {
                    setName(snapshot.data());
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
                    Hello, {name.firstName}
                </Text>

                <TouchableOpacity
                    onPress={() => firebase.auth().signOut()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
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
});
