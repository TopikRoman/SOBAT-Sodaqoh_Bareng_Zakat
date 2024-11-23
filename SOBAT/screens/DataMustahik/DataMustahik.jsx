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

// Fungsi untuk membaca data dari Firebase
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

// Fungsi untuk menghapus data dari Firebase
const hapusDataMustahik = async (id) => {
  try {
    await deleteDoc(doc(db, "mustahik", id));
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
};

// Fungsi untuk menangani aksi hapus
const handleDelete = async (selectedItem, setDataMustahik, setSelectedItem) => {
  Alert.alert(
    "Konfirmasi Hapus",
    "Apakah Anda yakin ingin menghapus data mustahik ini?",
    [
      {
        text: "Batal",
        onPress: () => {
          setSelectedItem(null);
        },
        style: "cancel",
      },
      {
        text: "Hapus",
        onPress: async () => {
          const berhasil = await hapusDataMustahik(selectedItem.id);
          if (berhasil) {
            setDataMustahik((prevData) =>
              prevData.filter((item) => item.id !== selectedItem.id)
            );
            setSelectedItem(null);
            Alert.alert("Berhasil", "Data mustahik telah dihapus.");
          } else {
            Alert.alert("Error", "Gagal menghapus data mustahik.");
          }
        },
      },
    ]
  );
};

const DataMustahik = () => {
  const [dataMustahik, setDataMustahik] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  // Fetch data saat fokus
  const fetchData = useCallback(async () => {
    const mustahikData = await membacaDataMustahik();
    setDataMustahik(mustahikData);
  }, []);

  // Memperbarui tombol header untuk edit/hapus
  const updateHeaderButtons = useCallback(() => {
    if (selectedItem) {
      navigation.setOptions({
        headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() =>
                handleDelete(selectedItem, setDataMustahik, setSelectedItem)
              }
            >
              <Text style={styles.headerButton}>Hapus</Text>
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

  // Menjalankan fetch data dan update header saat layar difokuskan
  useFocusEffect(
    useCallback(() => {
      fetchData();
      updateHeaderButtons();
    }, [fetchData, updateHeaderButtons])
  );

  // Fungsi untuk menavigasi ke detail mustahik
  const handlePress = useCallback(
    (item) => {
      navigation.navigate("DetailDataMustahik", { mustahik: item });
    },
    [navigation]
  );

  // Menangani long press pada item
  const handleLongPress = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  // Fungsi untuk menavigasi ke halaman edit
  const handleEdit = useCallback(
    (selectedItem) => {
      if (selectedItem) {
        navigation.navigate("EditDataMustahik", { mustahik: selectedItem });
        setSelectedItem(null);
      }
    },
    [navigation]
  );

  // Fungsi untuk menavigasi ke halaman tambah mustahik
  const handleAddItem = useCallback(
    () => navigation.navigate("TambahDataMustahik"),
    [navigation]
  );

  // Render item dalam FlatList
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
          {item.nama} - {item.kategori} - {item.status}
        </Text>
      </TouchableOpacity>
    ),
    [selectedItem, handlePress, handleLongPress]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Data Mustahik</Text>
      <FlatList
        data={dataMustahik}
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

export default DataMustahik;
