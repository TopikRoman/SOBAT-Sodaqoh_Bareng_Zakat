import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

const DataPenyaluran = () => {
  const [dataPenyaluran, setDataPenyaluran] = useState([
    {
      id: "1",
      nama: "Edo Bachtiar",
      alamat: "Jalan Kalimantan 07",
      bentukZakat: "Beras",
      jumlah: "2,5 Kg",
    },
    {
      id: "2",
      nama: "Edo Bachtiar",
      alamat: "Jalan Kalimantan 07",
      bentukZakat: "Beras",
      jumlah: "2,5 Kg",
    },
    // Tambahkan data lainnya di sini
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.sideBar}></View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nama}</Text>
        <Text style={styles.cardSubtitle}>{item.alamat}</Text>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardZakat}>{item.bentukZakat}</Text>
        <Text style={styles.cardJumlah}>{item.jumlah}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.header}>Data Penyaluran</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Tambah Data Baru</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/orangNgaji.png")} // Ganti dengan path gambar kamu
          style={styles.illustration}
        />
      </View>
      <FlatList
        data={dataPenyaluran}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
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

export default DataPenyaluran;
