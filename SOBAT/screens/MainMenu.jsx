import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MainMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Amil Zakat</Text>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TambahPembayaran")}
      >
        <Text style={styles.buttonText}>Menambah Pembayaran Zakat</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DataPembayaranZakat")}
      >
        <Text style={styles.buttonText}>Data Pembayaran Zakat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DataMustahik")}
      >
        <Text style={styles.buttonText}>Data Mustahik</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("KonfirmasiPembayaran")}
      >
        <Text style={styles.buttonText}>Konfirmasi Pembayaran</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PembagianZakat")}
      >
        <Text style={styles.buttonText}>Pembagian Zakat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonExit}
        onPress={() => console.log("Exit App")}
      >
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonExit: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
