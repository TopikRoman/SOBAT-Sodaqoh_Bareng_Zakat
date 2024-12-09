import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";

export default function NiatZakatScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/Niat Zakat/Niat Anak Laki Laki.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/Niat Zakat/Niat Anak Perempuan.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/Niat Zakat/Niat Diwakilkan.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/Niat Zakat/Niat Mewakilkan.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/Niat Zakat/Niat Pribadi.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/Niat Zakat/Niat Sekeluarga.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/Niat Zakat/Niat Suami Istri.png")}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    paddingBottom: 80,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginBottom: -100,
    marginTop: -50,
  },
});
