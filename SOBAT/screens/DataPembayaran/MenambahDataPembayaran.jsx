import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function TambahPembayaran() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [atasNama, setAtasNama] = useState("");
  const [jenisZakat, setJenisZakat] = useState("fitrah");
  const [bentukZakat, setBentukZakat] = useState("beras");
  const [banyakZakat, setBanyakZakat] = useState("");

  // Fungsi untuk mengirim data ke Firebase Firestore
  const handleSubmit = async () => {
    try {
      // Menambahkan data ke Firestore
      await addDoc(collection(db, "pembayaranZakat"), {
        nama,
        alamat,
        telepon,
        atasNama,
        jenisZakat,
        bentukZakat,
        banyakZakat,
      });

      alert("Data pembayaran zakat berhasil disimpan");
    } catch (error) {
      console.error("Error menambahkan data ke Firestore: ", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Form Pembayaran Zakat</Text>

        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={nama}
          onChangeText={setNama}
        />

        <TextInput
          style={styles.input}
          placeholder="Alamat"
          value={alamat}
          onChangeText={setAlamat}
        />

        <TextInput
          style={styles.input}
          placeholder="Nomor Telepon"
          keyboardType="phone-pad"
          value={telepon}
          onChangeText={setTelepon}
        />

        <TextInput
          style={styles.input}
          placeholder="Zakat Atas Nama"
          value={atasNama}
          onChangeText={setAtasNama}
        />

        <Text style={styles.label}>Jenis Zakat</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={jenisZakat}
            style={styles.picker}
            onValueChange={(itemValue) => setJenisZakat(itemValue)}
          >
            <Picker.Item label="Zakat Fitrah" value="fitrah" />
            <Picker.Item label="Zakat Mal" value="mal" />
          </Picker>
        </View>

        <Text style={styles.label}>Bentuk Zakat</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={bentukZakat}
            style={styles.picker}
            onValueChange={(itemValue) => setBentukZakat(itemValue)}
          >
            <Picker.Item label="Beras" value="beras" />
            <Picker.Item label="Uang" value="uang" />
            <Picker.Item label="Emas" value="emas" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Banyaknya Zakat"
          keyboardType="numeric"
          value={banyakZakat}
          onChangeText={setBanyakZakat}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
