import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailMustahik = ({ route }) => {
  const mustahik = route?.params?.mustahik ?? {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Mustahik</Text>
      {Object.entries(mustahik).length > 0 ? (
        <>
          <Text style={styles.label}>Nama: {mustahik.nama}</Text>
          <Text style={styles.label}>Nomor Telepon: {mustahik.telepon}</Text>
          <Text style={styles.label}>Alamat: {mustahik.alamat}</Text>
          <Text style={styles.label}>Jenis Zakat: {mustahik.kategori}</Text>
          <Text style={styles.label}>Status: {mustahik.status}</Text>
          <Text style={styles.label}>Tahun: {mustahik.tahun}</Text>
        </>
      ) : (
        <Text style={styles.errorMessage}>Data mustahik tidak ditemukan.</Text>
      )}
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
  errorMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
});

export default DetailMustahik;
