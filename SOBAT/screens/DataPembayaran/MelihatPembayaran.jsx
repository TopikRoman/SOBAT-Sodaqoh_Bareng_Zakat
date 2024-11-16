import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const membacaDataDalamFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pembayaranZakat"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      tanggal: new Date(doc.data().tanggal).toLocaleDateString("id-ID"),
    }));
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

const hapusDataPembayaran = async (id) => {
  try {
    await deleteDoc(doc(db, "pembayaranZakat", id));
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
};

const handleDelete = async (
  selectedItem,
  setDataPembayaran,
  setSelectedItem
) => {
  Alert.alert(
    "Konfirmasi Hapus",
    "Apakah Anda yakin ingin menghapus data pembayaran ini?",
    [
      {
        text: "Batal",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Hapus",
        onPress: async () => {
          const berhasil = await hapusDataPembayaran(selectedItem.id);
          if (berhasil) {
            setDataPembayaran((prevData) =>
              prevData.filter((item) => item.id !== selectedItem.id)
            );
            setSelectedItem(null);
            Alert.alert("Berhasil", "Data pembayaran telah dihapus.");
          } else {
            Alert.alert("Error", "Gagal menghapus data pembayaran.");
          }
        },
      },
    ]
  );
};
const MelihatPembayaran = () => {
  const [dataPembayaran, setDataPembayaran] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    const pembayaranData = await membacaDataDalamFirebase();
    setDataPembayaran(pembayaranData);
  }, []);

  const updateHeaderButtons = useCallback(() => {
    if (selectedItem) {
      navigation.setOptions({
        headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() =>
                handleDelete(selectedItem, setDataPembayaran, setSelectedItem)
              }
            >
              <Text style={styles.headerButton}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(selectedItem)}>
              <Text style={styles.headerButton}>Edit</Text>
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

  useFocusEffect(
    useCallback(() => {
      fetchData();
      updateHeaderButtons();
    }, [fetchData, updateHeaderButtons])
  );

  const handlePress = useCallback(
    (item) => {
      navigation.navigate("DetailPembayaran", { pembayaran: item });
    },
    [navigation]
  );

  const handleLongPress = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  const handleEdit = useCallback(
    (selectedItem) => {
      if (selectedItem) {
        navigation.navigate("EditDataPembayaran", { pembayaran: selectedItem });
        setSelectedItem(null);
      }
    },
    [navigation]
  );

  const handleAddItem = useCallback(
    () => navigation.navigate("TambahPembayaran"),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.item,
          selectedItem && selectedItem.id === item.id
            ? styles.selectedItem
            : null,
        ]}
        onPress={() => handlePress(item)}
        onLongPress={() => handleLongPress(item)}
      >
        <Text style={styles.itemText}>
          {item.nama} - {item.jenisZakat} - {item.tanggal}
        </Text>
      </TouchableOpacity>
    ),
    [selectedItem, handlePress, handleLongPress]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Pembayaran Zakat</Text>
      <FlatList
        data={dataPembayaran}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.tombolTambah} onPress={handleAddItem}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
  headerButton: {
    color: "red",
    marginRight: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  tombolTambah: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  fabText: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
    lineHeight: 55,
    textAlign: "center",
  },
});

export default MelihatPembayaran;
