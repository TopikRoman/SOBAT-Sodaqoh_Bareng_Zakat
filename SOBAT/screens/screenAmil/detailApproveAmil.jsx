// DetailApproveAmil.js
import React from "react";
import { db } from "../../firebase/FirebaseConfig";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

const deletePendingAccount = async (id) => {
  try {
    await deleteDoc(doc(db, "pendingAccounts", id));
    return true;
  } catch (error) {
    console.error("Error deleting pending account:", error);
    return false;
  }
};

const approvePendingAccount = async (account) => {
  const auth = getAuth();
  const { email, password, ...restData } = account;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;

    await setDoc(doc(db, "dataAmilApproved", uid), { uid, email, ...restData });

    const isDeleted = await deletePendingAccount(account.id);
    return isDeleted
      ? { success: true, accountId: account.id }
      : { success: false };
  } catch (error) {
    console.error("Error approving account:", error);
    return { success: false };
  }
};

const DetailApproveAmil = ({ route, navigation }) => {
  const { item, setDataAmilPending } = route.params;

  const handleApprove = async () => {
    const result = await approvePendingAccount(item);
    if (result.success) {
      setDataAmilPending((prevData) =>
        prevData.filter((amil) => amil.id !== result.accountId)
      );
      Alert.alert("Berhasil", "Akun telah disetujui.");
      navigation.goBack();
    } else {
      Alert.alert("Gagal", "Terjadi kesalahan saat menyetujui akun.");
    }
  };

  const handleDelete = async () => {
    const isDeleted = await deletePendingAccount(item.id);
    if (isDeleted) {
      setDataAmilPending((prevData) =>
        prevData.filter((amil) => amil.id !== item.id)
      );
      Alert.alert("Berhasil", "Akun telah dihapus.");
      navigation.goBack();
    } else {
      Alert.alert("Gagal", "Terjadi kesalahan saat menghapus akun.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Akun</Text>
      <Text style={styles.label}>Nama: {item.nama}</Text>
      <Text style={styles.label}>Email: {item.email}</Text>
      <Text style={styles.label}>Password: {item.password}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={handleApprove}
        >
          <Text style={styles.buttonText}>Konfirmasi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Batalkan</Text>
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
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "green",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetailApproveAmil;
