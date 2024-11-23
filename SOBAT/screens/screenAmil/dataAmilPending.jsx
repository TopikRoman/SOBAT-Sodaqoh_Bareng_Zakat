import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

// **Utilitas Firebase**
const fetchPendingAccounts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pendingAccounts"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching pending accounts:", error);
    return [];
  }
};

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

// **Fungsi Approve, Delete, dan Update State**
const approveDataAmil = async (item, setDataAmilPending, setSelectedItem) => {
  const result = await approvePendingAccount(item);
  if (result.success) {
    setDataAmilPending((prevData) =>
      prevData.filter((amil) => amil.id !== result.accountId)
    );
    setSelectedItem(null);
    Alert.alert("Berhasil", "Data amil telah disetujui.");
  } else {
    Alert.alert("Gagal", "Terjadi kesalahan saat menyetujui data.");
  }
};

const handleDelete = async (item, setDataAmilPending, setSelectedItem) => {
  const isDeleted = await deletePendingAccount(item.id);
  if (isDeleted) {
    setDataAmilPending((prevData) =>
      prevData.filter((amil) => amil.id !== item.id)
    );
    setSelectedItem(null);
    Alert.alert("Berhasil", "Data amil telah dihapus.");
  } else {
    Alert.alert("Gagal", "Terjadi kesalahan saat menghapus data.");
  }
};

// **Komponen**
const ApprovalAmil = () => {
  const [dataAmilPending, setDataAmilPending] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  // **Fungsi Update Header**
  const updateHeaderButtons = useCallback(() => {
    if (selectedItem) {
      navigation.setOptions({
        headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() =>
                approveDataAmil(
                  selectedItem,
                  setDataAmilPending,
                  setSelectedItem
                )
              }
            >
              <Text style={styles.headerButton}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleDelete(selectedItem, setDataAmilPending, setSelectedItem)
              }
            >
              <Text style={styles.headerButton}>Hapus</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedItem(null)}>
              <Text style={styles.headerButton}>Batal</Text>
            </TouchableOpacity>
          </>
        ),
      });
    } else {
      navigation.setOptions({ headerRight: null });
    }
  }, [navigation, selectedItem]);

  // **Efek Samping**
  useEffect(() => {
    const fetchData = async () => {
      const pendingData = await fetchPendingAccounts();
      setDataAmilPending(pendingData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateHeaderButtons();
  }, [selectedItem, updateHeaderButtons]);

  // **Render Item**
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.item,
          selectedItem?.id === item.id ? styles.selectedItem : null,
        ]}
        onPress={() => setSelectedItem(item)}
      >
        <Text style={styles.itemText}>
          {item.nama} - {item.email}
        </Text>
      </TouchableOpacity>
    ),
    [selectedItem]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Data Amil Pending</Text>
      <FlatList
        data={dataAmilPending}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

// **Gaya**
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
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedItem: {
    backgroundColor: "#D3E4CD",
  },
  itemText: {
    fontSize: 18,
  },
  headerButton: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },
});

export default ApprovalAmil;
