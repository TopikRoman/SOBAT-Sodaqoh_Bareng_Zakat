// DetailPembagian.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const DetailPembagian = () => {
  // Mengambil parameter yang dikirim dari halaman DataPembagianZakat
  const route = useRoute();
  const { pembagianZakat } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detail Pembagian Zakat</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Nama Mustahik: </Text>
        <Text style={styles.value}>{pembagianZakat.mustahik.nama}</Text>

        <Text style={styles.label}>Bentuk Zakat: </Text>
        <Text style={styles.value}>{pembagianZakat.bentukZakat}</Text>

        <Text style={styles.label}>Tanggal: </Text>
        <Text style={styles.value}>{pembagianZakat.tanggal}</Text>

        <Text style={styles.label}>Jumlah: </Text>
        <Text style={styles.value}>{pembagianZakat.nominal}</Text>

        <Text style={styles.label}>Alamat: </Text>
        <Text style={styles.value}>{pembagianZakat.mustahik.alamat}</Text>

        <Text style={styles.label}>Bentuk Zakat: </Text>
        <Text style={styles.value}>{pembagianZakat.bentukZakat}</Text>
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
  detailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DetailPembagian;
