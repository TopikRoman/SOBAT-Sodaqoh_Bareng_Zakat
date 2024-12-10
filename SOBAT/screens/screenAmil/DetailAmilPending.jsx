import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { db } from "../../firebase/FirebaseConfig";

const DetailAmilPending = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { dataAmil } = route.params;

  const handleConfirm = async () => {
    const auth = getAuth();
    const { id, email, password, ...restData } = dataAmil;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredential.user;

      await setDoc(doc(db, "dataAmilApproved", uid), {
        uid,
        email,
        ...restData,
      });

      await deleteDoc(doc(db, "pendingAccounts", id));

      Alert.alert("Berhasil", "Akun amil telah dikonfirmasi.");
      navigation.goBack();
    } catch (error) {
      console.error("Error confirming account:", error);
      Alert.alert("Gagal", "Terjadi kesalahan saat mengonfirmasi akun.");
    }
  };

  const handleDelete = async () => {
    const { id } = dataAmil;

    try {
      await deleteDoc(doc(db, "pendingAccounts", id));

      Alert.alert("Berhasil", "Akun amil telah dihapus.");
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Gagal", "Terjadi kesalahan saat menghapus akun.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Akun Amil</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailItem}>
          <Text style={styles.label}>Nama:</Text> {dataAmil.nama}
        </Text>
        <Text style={styles.detailItem}>
          <Text style={styles.label}>Email:</Text> {dataAmil.email}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Konfirmasi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  detailContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  detailItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  confirmButton: {
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailAmilPending;
