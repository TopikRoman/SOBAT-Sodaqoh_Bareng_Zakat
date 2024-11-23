import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
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
      <Text style={styles.title}>Daftar Pembagian Zakat</Text>
      <FlatList
        data={dataPembagianZakat}
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
});

export default DataPembagianZakat;
