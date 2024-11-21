import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>First Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MainMenu")}
      >
        <Text>Masuk Sebagai Amil </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MainMenuAmil")}
      >
        <Text>Masuk Sebagai Muzakki </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "lime",
    padding: 10,
    margin: 30,
  },
});

export default LoginScreen;
