import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const TransaksiPembayaranQRIS = ({ route, navigation }) => {
  const { banyakZakat } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembayaran Zakat - QRIS</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nominal Zakat: </Text>
        <Text style={styles.amount}>Rp {banyakZakat}</Text>

        <Text style={styles.label}>Kode QR untuk Pembayaran: </Text>
        <Image
          source={require("../../assets/QRCode.png")}
          style={styles.image}
        />
        <Text style={styles.label}>Nama Penerima: </Text>
        <Text style={styles.amount}>Masjid An-Nur</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailsContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 18,
    marginBottom: 10,
    color: "#4CAF50",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TransaksiPembayaranQRIS;
