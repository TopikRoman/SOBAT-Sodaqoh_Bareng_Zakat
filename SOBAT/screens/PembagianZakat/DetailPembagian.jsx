import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const DetailPembagian = () => {
  const route = useRoute();
  const { pembagianZakat } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detail Pembagian Zakat</Text>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Data Muzakki</Text>
        <Text style={styles.label}>Nama: </Text>
        <Text style={styles.value}>{pembagianZakat.mustahik.nama}</Text>

        <Text style={styles.label}>Alamat: </Text>
        <Text style={styles.value}>{pembagianZakat.mustahik.alamat}</Text>

        <Text style={styles.label}>Telepon: </Text>
        <Text style={styles.value}>{pembagianZakat.mustahik.telepon}</Text>

        <Text style={styles.label}>Kategori: </Text>
        <Text style={styles.value}>{pembagianZakat.mustahik.kategori}</Text>

        <Text style={styles.label}>Status: </Text>
        <Text style={styles.value}>{pembagianZakat.mustahik.status}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Data Pembagian Zakat</Text>
        <Text style={styles.label}>Bentuk Zakat: </Text>
        <Text style={styles.value}>{pembagianZakat.bentukZakat}</Text>

        <Text style={styles.label}>Nominal: </Text>
        <Text style={styles.value}>{pembagianZakat.nominal}</Text>

        <Text style={styles.label}>Tanggal: </Text>
        <Text style={styles.value}>{pembagianZakat.tanggal}</Text>
      </View>
    </ScrollView>
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
  box: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#4CAF50",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
});

export default DetailPembagian;
