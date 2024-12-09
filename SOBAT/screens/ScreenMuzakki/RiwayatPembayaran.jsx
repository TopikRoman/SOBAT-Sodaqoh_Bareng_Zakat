import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Fungsi untuk memformat tanggal
const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = new Date(date).toLocaleDateString("id-ID", options);
  return formattedDate;
};

export default function RiwayatPembayaran({ route }) {
  const { userName } = route.params;
  const [riwayatPembayaran, setRiwayatPembayaran] = useState([]);

  useEffect(() => {
    const fetchRiwayat = async () => {
      const db = getFirestore();
      const pembayaranRef = collection(db, "pembayaranZakat");
      const q = query(pembayaranRef, where("nama", "==", userName));

      try {
        const querySnapshot = await getDocs(q);
        const pembayaranData = querySnapshot.docs.map((doc) => doc.data());
        setRiwayatPembayaran(pembayaranData);
      } catch (error) {
        console.error("Error fetching payment history: ", error);
        Alert.alert(
          "Error",
          "Terjadi kesalahan saat mengambil riwayat pembayaran."
        );
      }
    };

    fetchRiwayat();
  }, [userName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Pembayaran Zakat</Text>
      {riwayatPembayaran.length > 0 ? (
        <FlatList
          data={riwayatPembayaran}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                Tanggal: {formatDate(item.tanggal)}{" "}
                {/* Menampilkan tanggal dengan format */}
              </Text>
              <Text style={styles.itemText}>
                Bentuk Zakat: {item.bentukZakat}
              </Text>
              <Text style={styles.itemText}>
                Jenis Zakat: {item.jenisZakat}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noData}>Belum ada riwayat pembayaran.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  noData: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
});
