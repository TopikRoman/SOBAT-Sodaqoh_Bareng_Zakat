import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const SetujuiTransaksi = ({ navigation }) => {
  const [pembayaranPending, setPembayaranPending] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchPembayaranPending = async () => {
        try {
          const querySnapshot = await getDocs(
            collection(db, "pembayaranPending")
          );
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPembayaranPending(data);
        } catch (error) {
          console.error("Error fetching pembayaran pending:", error);
        }
      };

      fetchPembayaranPending();
    }, [])
  );

  const formatDate = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("DetailPembayaranPending", { data: item })
      }
    >
      <Text style={styles.itemText}>
        {item.nama} - {item.bentukZakat} - {formatDate(item.tanggal)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Transaksi Pending</Text>
      <FlatList
        data={pembayaranPending}
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
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SetujuiTransaksi;
