import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
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
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

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

const ApprovalAmil = () => {
  const [dataAmilPending, setDataAmilPending] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Use the useFocusEffect hook to refresh the data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const pendingData = await fetchPendingAccounts();
        setDataAmilPending(pendingData);
      };

      fetchData();
    }, [])
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.item,
          selectedItem?.id === item.id ? styles.selectedItem : null,
        ]}
        onPress={() =>
          navigation.navigate("DetailAmilPending", { dataAmil: item })
        } // Navigasi ke detail
      >
        <Text style={styles.itemText}>
          {item.nama} - {item.email}
        </Text>
      </TouchableOpacity>
    ),
    [navigation, selectedItem]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Data Amil Pending</Text>
      <FlatList
        data={dataAmilPending}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {selectedItem && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detail Data Amil</Text>
              <Text style={styles.modalText}>Nama: {selectedItem.nama}</Text>
              <Text style={styles.modalText}>Email: {selectedItem.email}</Text>
              <Text style={styles.modalText}>
                Telepon: {selectedItem.telepon || "Tidak tersedia"}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ApprovalAmil;
