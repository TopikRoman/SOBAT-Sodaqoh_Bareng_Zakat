import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Impor Firebase Authentication
import { auth } from '../../firebase/FirebaseConfig'; // Impor konfigurasi Firebase

const DaftarMuzakki = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Email dan Password harus diisi.");
            return;
        }

        try {
            // Membuat akun menggunakan email dan password
            await createUserWithEmailAndPassword(auth, email, password);

            // Setelah berhasil daftar, navigasi ke halaman login Muzakki
            Alert.alert("Sukses!", "Akun berhasil dibuat.");
            navigation.navigate('LoginMuzakki');
        } catch (error) {
            console.error("Signup error: ", error);
            Alert.alert("Error", "Gagal membuat akun. Coba lagi.");
        }
    };

    return (
        <ImageBackground source={require('../../assets/Background.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Daftar Muzakki</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Buat Akun</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoginMuzakki')}>
                    <Text style={{ color: '#0033FF' }}>Sudah punya akun? Login</Text>
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

export default DaftarMuzakki;
