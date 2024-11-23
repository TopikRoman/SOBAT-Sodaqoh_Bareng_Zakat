import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth } from "../../firebase/FirebaseConfig";

// Hook untuk login amil
const useLoginAmil = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginAmil = useCallback(async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan Password harus diisi.");
      return;
    }

    const authInstance = getAuth();
    try {
      // Proses login amil
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );

      // Cek apakah akun ada dalam koleksi dataAmilApproved
      await checkIfAmilIsApproved(email, navigation);
    } catch (error) {
      console.error("Login error: ", error);
      Alert.alert("Error", "Email atau Password salah.");
    }
  }, [email, password, navigation]);

  return { email, setEmail, password, setPassword, handleLoginAmil };
};

// Fungsi untuk memeriksa apakah akun amil sudah disetujui
const checkIfAmilIsApproved = async (email, navigation) => {
  const db = getFirestore();
  const amilRef = collection(db, "dataAmilApproved"); // Referensi ke koleksi dataAmilApproved
  const q = query(amilRef, where("email", "==", email)); // Query untuk mencari email yang cocok

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Jika ditemukan, akun amil sudah disetujui
      Alert.alert("Sukses!", "Login berhasil.");
      navigation.navigate("MainMenu", { userEmail: email }); // Navigasi ke MainMenu dengan email
    } else {
      // Jika tidak ditemukan, akun belum disetujui
      Alert.alert("Error", "Email atau Password salah.");
    }
  } catch (error) {
    console.error("Error checking account approval: ", error);
    Alert.alert("Error", "Terjadi kesalahan saat memeriksa akun.");
  }
};

const LoginAmil = ({ navigation }) => {
  const { email, setEmail, password, setPassword, handleLoginAmil } =
    useLoginAmil(navigation);

  return (
    <ImageBackground
      source={require("../../assets/Background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login Amil</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLoginAmil}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("DaftarAmil")}>
          <Text style={{ color: "#0033FF" }}>Belum punya akun? Daftar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 400,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 15,
  },
  button: {
    alignItems: "center",
    backgroundColor: "lime",
    padding: 10,
    margin: 25,
    width: 250,
    height: 45,
    borderRadius: 15,
  },
  Input: {
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: 250,
    height: 45,
    borderRadius: 15,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
  },
});

export default LoginAmil;
