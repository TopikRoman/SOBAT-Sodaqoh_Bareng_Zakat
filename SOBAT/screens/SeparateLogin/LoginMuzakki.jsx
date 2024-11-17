import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from '../../firebase/FirebaseConfig'; 

const LoginMuzakki = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Email dan Password harus diisi.");
            return;
        }

        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);

            Alert.alert("Sukses!", "Login berhasil.");
            navigation.navigate('MainMenu');
        } catch (error) {
            console.error("Login error: ", error);
            Alert.alert("Error", "Email atau Password salah.");
        }
    };

    return (
        <ImageBackground source={require('../../assets/Background.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Login Muzakki</Text>
                <TextInput
                    style={styles.Input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.Input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('DaftarMuzakki')}>
                    <Text style={{ color: '#0033FF' }}>Belum punya akun? Daftar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 400,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderRadius: 15,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'lime',
        padding: 10,
        margin: 25,
        width: 250,
        height: 45,
        borderRadius: 15,
    },
    Input: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        width: 250,
        height: 45,
        borderRadius: 15,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 20,
    },
});

export default LoginMuzakki;
