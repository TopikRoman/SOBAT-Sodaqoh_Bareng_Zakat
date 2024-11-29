import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase/FirebaseConfig";

const DaftarAmil = ({ navigation }) => {
  const [nama, setNama] = useState(""); // State untuk nama
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const db = getFirestore(); // Inisialisasi Firestore

  const handleSignUp = async () => {
    if (!nama || !email || !password) {
      Alert.alert("Error", "Nama, Email, dan Password harus diisi.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "pendingAccounts"), {
        nama: nama, // Tambahkan nama ke Firestore
        email: email,
        password: password,
        approved: false,
      });

      console.log("Document written with ID: ", docRef.id);

      Alert.alert(
        "Pendaftaran Berhasil!",
        "Akun Anda sedang menunggu persetujuan admin."
      );
      navigation.navigate("LoginAmil");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Gagal mendaftarkan akun. Coba lagi.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/Background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Daftar Amil</Text>
        <TextInput
          style={styles.Input}
          placeholder="Nama"
          value={nama}
          onChangeText={setNama}
        />
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
        <TouchableOpacity onPress={() => navigation.navigate("LoginAmil")}>
          <Text style={{ color: "#0033FF" }}>Sudah punya akun? Login</Text>
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
    height: 450, // Tinggi disesuaikan
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

export default DaftarAmil;
