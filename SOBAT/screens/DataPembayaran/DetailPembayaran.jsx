import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailPembayaran = ({ route }) => {
  const { pembayaran } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Pembayaran Zakat</Text>
      <Text style={styles.label}>Nama: {pembayaran.nama}</Text>
      <Text style={styles.label}>Alamat: {pembayaran.alamat}</Text>
      <Text style={styles.label}>Nomor Telepon: {pembayaran.telepon}</Text>
      <Text style={styles.label}>Zakat Atas Nama: {pembayaran.atasNama}</Text>
      <Text style={styles.label}>Jenis Zakat: {pembayaran.jenisZakat}</Text>
      <Text style={styles.label}>Bentuk Zakat: {pembayaran.bentukZakat}</Text>
      <Text style={styles.label}>Banyak Zakat: {pembayaran.banyakZakat}</Text>
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
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DetailPembayaran;
