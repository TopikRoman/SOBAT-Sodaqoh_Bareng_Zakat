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


const membacaDataMustahik = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "mustahik"));
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


const hapusDataMustahik = async (id) => {
  try {
    await deleteDoc(doc(db, "mustahik", id));
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
};

const DataMustahik = () => {
  const [dataMustahik, setDataMustahik] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  
  const fetchData = useCallback(async () => {
    const mustahikData = await membacaDataMustahik();
    setDataMustahik(mustahikData);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleDelete = useCallback(async (item) => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus data mustahik ini?",
      [
        { text: "Batal", onPress: () => {}, style: "cancel" },
        {
          text: "Hapus",
          onPress: async () => {
            const berhasil = await hapusDataMustahik(item.id);
            if (berhasil) {
              setDataMustahik((prevData) =>
                prevData.filter((data) => data.id !== item.id)
              );
              setSelectedItem(null);
              Alert.alert("Berhasil", "Data mustahik telah dihapus.");
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
      navigation.navigate("DetailDataMustahik", { mustahik: item });
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
          {item.nama} - {item.kategori} - {item.status}
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
              style={styles.editButton}
              onPress={() =>
                navigation.navigate("EditDataMustahik", { mustahik: item })
              }
            >
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
    ),
    [selectedItem, handlePress, handleLongPress, handleDelete, navigation]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.header}>Daftar Data Mustahik</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("TambahDataMustahik")}
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
        data={dataMustahik}
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

export default DataMustahik;
