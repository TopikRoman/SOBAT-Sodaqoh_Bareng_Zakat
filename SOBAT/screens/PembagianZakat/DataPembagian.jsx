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

const membacaDataPembagianZakat = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pembagianZakat"));
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

const hapusDataPembagian = async (id) => {
  try {
    await deleteDoc(doc(db, "pembagianZakat", id));
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
};

const DataPembagianZakat = () => {
  const [dataPembagianZakat, setDataPembagianZakat] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    const pembagianZakatData = await membacaDataPembagianZakat();
    setDataPembagianZakat(pembagianZakatData);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleDelete = useCallback(async (item) => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus data pembagian ini?",
      [
        { text: "Batal", onPress: () => {}, style: "cancel" },
        {
          text: "Hapus",
          onPress: async () => {
            const berhasil = await hapusDataPembagian(item.id);
            if (berhasil) {
              setDataPembagianZakat((prevData) =>
                prevData.filter((data) => data.id !== item.id)
              );
              setSelectedItem(null);
              Alert.alert("Berhasil", "Data berhasil dihapus.");
            } else {
              Alert.alert("Error", "Gagal menghapus data.");
            }
          },
        },
      ]
    );
  }, []);

  const handlePress = useCallback(
    (item) => {
      navigation.navigate("DetailPembagian", { pembagianZakat: item });
    },
    [navigation]
  );

  const handleLongPress = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.item,
          selectedItem && selectedItem.id === item.id
            ? styles.selectedItem
            : null,
        ]}
        onPress={() =>
          selectedItem ? setSelectedItem(null) : handlePress(item)
        }
        onLongPress={() => handleLongPress(item)}
      >
        <Text style={styles.itemText}>
          {item.mustahik.nama} - {item.bentukZakat} - {item.tanggal}
        </Text>
        {selectedItem && selectedItem.id === item.id && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item)}
            >
              <Text style={styles.deleteButtonText}>Hapus</Text>
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
    ),
    [selectedItem, handlePress, handleLongPress, handleDelete]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.header}>Data Penyaluran</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("TambahPembagianZakat")}
          >
            <Text style={styles.addButtonText}>Tambah Data Baru</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/orangNgaji.png")}
          style={styles.illustration}
        />
      </View>
      <FlatList
        data={dataPembagianZakat}
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
    fontSize: 24,
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

export default DataPembagianZakat;
