import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

// Pure Function: Menyimpan data konfirmasi ke Firestore
const confirmPayment = async (data) => {
  const paymentDocRef = doc(db, "pembayaranZakat", data.id);
  const pendingDocRef = doc(db, "pembayaranPending", data.id);

  await setDoc(paymentDocRef, {
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

  await deleteDoc(pendingDocRef);
};

// Pure Function: Menghapus data dari Firestore
const deletePayment = async (data) => {
  const pendingDocRef = doc(db, "pembayaranPending", data.id);
  await deleteDoc(pendingDocRef);
};

// Component utama dengan handler berbasis fungsi
const DetailPembayaranPending = ({ route, navigation }) => {
  const { data } = route.params;

  // Handler untuk konfirmasi pembayaran
  const handleKonfirmasi = async () => {
    try {
      await confirmPayment(data);
      Alert.alert("Sukses", "Pembayaran telah dikonfirmasi.");
      navigation.goBack();
    } catch (error) {
      console.error("Error konfirmasi pembayaran:", error);
      Alert.alert("Error", "Gagal mengonfirmasi pembayaran.");
    }
  };

  // Handler untuk menghapus pembayaran
  const handleHapus = async () => {
    try {
      await deletePayment(data);
      Alert.alert("Sukses", "Data pembayaran telah dihapus.");
      navigation.goBack();
    } catch (error) {
      console.error("Error menghapus pembayaran:", error);
      Alert.alert("Error", "Gagal menghapus pembayaran.");
    }
  };

  // Komponen presentasi
  const PaymentDetail = () => (
    <>
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
    </>
  );

  // Komponen tombol aksi
  const ActionButtons = () => (
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
  );

  return (
    <View style={styles.container}>
      <PaymentDetail />
      <ActionButtons />
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
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "#007BFF",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DetailPembayaranPending;
