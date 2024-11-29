import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MenuButton = ({ title, onPress, style = styles.button }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const MainMenu = ({ route, navigation }) => {
  const { userEmail } = route.params;

  const navigateTo = useCallback(
    (screen) => () => navigation.navigate(screen),
    [navigation]
  );

  const isAdmin = userEmail === "amil1@gmail.com";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Amil Zakat</Text>
      <Text style={styles.userInfo}>Logged in as: {userEmail}</Text>

      <MenuButton
        title="Data Pembayaran Zakat"
        onPress={navigateTo("DataPembayaranZakat")}
      />

      {isAdmin && (
        <MenuButton
          title="Menerima Akun Amil"
          onPress={navigateTo("ApproveAkunAmil")}
        />
      )}

      <MenuButton title="Data Mustahik" onPress={navigateTo("DataMustahik")} />
      <MenuButton
        title="Konfirmasi Pembayaran"
        onPress={navigateTo("KonfirmasiPembayaran")}
      />
      <MenuButton
        title="Pembagian Zakat"
        onPress={navigateTo("DataPembagianZakat", { userEmail: userEmail })}
      />

      <MenuButton
        title="Exit"
        style={styles.buttonExit}
        onPress={() => console.log("Exit App")}
      />
    </View>
  );
};

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
  userInfo: {
    fontSize: 16,
    color: "#333",
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

export default MainMenu;
