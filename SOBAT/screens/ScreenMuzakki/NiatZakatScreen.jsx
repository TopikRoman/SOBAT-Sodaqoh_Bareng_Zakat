import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";

const ImageComponent = ({ source }) => (
  <Image source={source} style={styles.image} />
);

const imageSources = [
  require("../../assets/Niat Zakat/Niat Anak Laki Laki.png"),
  require("../../assets/Niat Zakat/Niat Anak Perempuan.png"),
  require("../../assets/Niat Zakat/Niat Diwakilkan.png"),
  require("../../assets/Niat Zakat/Niat Mewakilkan.png"),
  require("../../assets/Niat Zakat/Niat Pribadi.png"),
  require("../../assets/Niat Zakat/Niat Sekeluarga.png"),
  require("../../assets/Niat Zakat/Niat Suami Istri.png"),
];

const NiatZakatScreen = () => {
  const renderImages = imageSources.map((source, index) => (
    <ImageComponent key={index} source={source} />
  ));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>{renderImages}</View>
    </ScrollView>
  );
};

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

export default NiatZakatScreen;
