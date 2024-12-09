import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Image,
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

const MelihatPembayaran = () => {
  const [dataPembayaran, setDataPembayaran] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    const pembayaranData = await membacaDataDalamFirebase();
    setDataPembayaran(pembayaranData);
  }, []);

  const handleDelete = async () => {
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

  const handleEdit = () => {
    if (selectedItem) {
      navigation.navigate("EditDataPembayaran", { pembayaran: selectedItem });
      setSelectedItem(null);
    }
  };

  const handleAddItem = () => {
    navigation.navigate("TambahPembayaran");
  };

  const handlePress = (item) => {
    navigation.navigate("DetailPembayaran", { pembayaran: item });
  };

  const handleLongPress = (item) => {
    setSelectedItem(item);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedItem && selectedItem.id === item.id ? styles.selectedItem : null,
      ]}
      onPress={() => (selectedItem ? setSelectedItem(null) : handlePress(item))}
      onLongPress={() => handleLongPress(item)}
    >
      <Text style={styles.itemText}>
        {item.nama} - {item.jenisZakat} - {item.tanggal}
      </Text>
      {selectedItem && selectedItem.id === item.id && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Hapus</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setSelectedItem(null)}
          >
            <Text style={styles.cancelButtonText}>Batal</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.header}>Daftar Pembayaran Zakat</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Tambah Data Baru</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/orangNgaji.png")}
          style={styles.illustration}
        />
      </View>
      <FlatList
        data={dataPembayaran}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  illustration: {
    flex: 1,
    height: 100,
    resizeMode: "contain",
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
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MelihatPembayaran;
