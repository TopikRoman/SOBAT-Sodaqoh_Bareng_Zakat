import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

const membacaDataMustahik = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "mustahik"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      
      let tanggal = "Tahun Tidak Valid";
      if (data.tahun && typeof data.tahun === "string") {
        const parts = data.tahun.split("/");
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; 
          const year = parseInt(parts[2], 10);
          const parsedDate = new Date(year, month, day);
          if (!isNaN(parsedDate.getTime())) {
            tanggal = parsedDate.toLocaleDateString("id-ID");
          }
        }
      }

      return {
        id: doc.id,
        nama: data.nama || "Nama Tidak Diketahui",
        kategori: data.kategori || "Kategori Tidak Diketahui",
        status: data.status || "Status Tidak Diketahui",
        alamat: data.alamat || "Alamat Tidak Diketahui",
        tanggal,
      };
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

const MustahikView = () => {
  const [dataMustahik, setDataMustahik] = useState([]);

  // Fetch data saat layar difokuskan
  const fetchData = useCallback(async () => {
    const mustahikData = await membacaDataMustahik();
    setDataMustahik(mustahikData);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  // Render item dalam daftar
  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.itemText}>Nama: {item.nama}</Text>
        <Text style={styles.itemText}>Kategori: {item.kategori}</Text>
        <Text style={styles.itemText}>Status: {item.status}</Text>
        <Text style={styles.itemText}>Alamat: {item.alamat}</Text>
        <Text style={styles.itemText}>Tanggal: {item.tanggal}</Text>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Penerima Zakat</Text>
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
  itemText: {
    fontSize: 16,
  },
});

export default MustahikView;
