import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const DetailPembayaranPending = ({ route, navigation }) => {
  const { data } = route.params;

  const handleKonfirmasi = async () => {
    try {
      // Tambahkan data ke koleksi pembayaranZakat
      await setDoc(doc(db, "pembayaranZakat", data.id), {
        nama: data.nama,
        alamat: data.alamat,
        telepon: data.telepon,
        atasNama: data.atasNama,
        jenisZakat: data.jenisZakat,
        bentukZakat: data.bentukZakat,
        banyakZakat: data.banyakZakat,
        metodePembayaran: data.metodePembayaran,
        tanggal: data.tanggal,
      });

      // Hapus data dari koleksi pembayaranPending
      await deleteDoc(doc(db, "pembayaranPending", data.id));

      Alert.alert("Sukses", "Pembayaran telah dikonfirmasi.");
      navigation.goBack();
    } catch (error) {
      console.error("Error konfirmasi pembayaran:", error);
      Alert.alert("Error", "Gagal mengonfirmasi pembayaran.");
    }
  };

  const handleHapus = async () => {
    try {
      // Hapus data dari koleksi pembayaranPending
      await deleteDoc(doc(db, "pembayaranPending", data.id));

      Alert.alert("Sukses", "Data pembayaran telah dihapus.");
      navigation.goBack();
    } catch (error) {
      console.error("Error menghapus pembayaran:", error);
      Alert.alert("Error", "Gagal menghapus pembayaran.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Pembayaran</Text>
      <Text style={styles.text}>Nama: {data.nama}</Text>
      <Text style={styles.text}>Alamat: {data.alamat}</Text>
      <Text style={styles.text}>Telepon: {data.telepon}</Text>
      <Text style={styles.text}>Atas Nama: {data.atasNama}</Text>
      <Text style={styles.text}>Jenis Zakat: {data.jenisZakat}</Text>
      <Text style={styles.text}>Bentuk Zakat: {data.bentukZakat}</Text>
      <Text style={styles.text}>Banyak Zakat: {data.banyakZakat}</Text>
      <Text style={styles.text}>
        Metode Pembayaran: {data.metodePembayaran}
      </Text>
      <Text style={styles.text}>Tanggal: {data.tanggal}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={handleKonfirmasi}
        >
          <Text style={styles.buttonText}>Konfirmasi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleHapus}
        >
          <Text style={styles.buttonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  approveButton: {
    flex: 1,
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default DetailPembayaranPending;
