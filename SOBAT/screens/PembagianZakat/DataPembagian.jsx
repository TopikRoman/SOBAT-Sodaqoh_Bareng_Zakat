import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Fungsi untuk membaca data dari Firebase (data pembagian zakat)
const membacaDataPembagianZakat = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pembagianZakat"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      tanggal: new Date(doc.data().tanggal).toLocaleDateString("id-ID"),
      // Pastikan data yang diambil ada untuk 'nama mustahik' dan 'bentuk zakat'
    }));
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

const DataPembagianZakat = () => {
  const [dataPembagianZakat, setDataPembagianZakat] = useState([]);
  const navigation = useNavigation();

  // Fetch data saat fokus
  const fetchData = useCallback(async () => {
    const pembagianZakatData = await membacaDataPembagianZakat();
    setDataPembagianZakat(pembagianZakatData);
  }, []);

  // Menjalankan fetch data saat layar difokuskan
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  // Fungsi untuk menavigasi ke halaman detail pembagian zakat
  const handlePress = useCallback(
    (item) => {
      navigation.navigate("DetailPembagian", { pembagianZakat: item });
    },
    [navigation]
  );
  const handleAddItem = useCallback(
    (item) => {
      navigation.navigate("TambahPembagianZakat", { pembagianZakat: item });
    },
    [navigation]
  );

  // Render item dalam FlatList
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
        <Text style={styles.itemText}>
          {item.mustahik.nama} - {item.bentukZakat} - {item.tanggal}
        </Text>
      </TouchableOpacity>
    ),
    [handlePress]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.header}>Data Penyaluran</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText} onPress={handleAddItem}>
              Tambah Data Baru
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/orangNgaji.png")} // Ganti dengan path gambar kamu
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
  itemText: {
    fontSize: 18,
  },

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
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  sideBar: {
    width: 6,
    backgroundColor: "#A5D6A7",
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  cardDetails: {
    alignItems: "center",
    padding: 16,
    borderLeftWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardZakat: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  cardJumlah: {
    fontSize: 14,
    color: "#333",
  },
});

export default DataPembagianZakat;
