import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

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
      {/* Profil User - di pojok kiri */}
      <View style={styles.containerProfile}>
        <View style={styles.iconProfile}>
          <Image
            source={require("../../assets/User_Icon.png")}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.userName}>{userEmail}</Text>
        {isAdmin && (
          <>
            <TouchableOpacity
              style={styles.ButtonKonfirmasiAmil}
              onPress={() => navigation.navigate("ApproveAkunAmil")}
            >
              <Image
                source={require("../../assets/IconAccAmil.png")}
                style={{ width: 130, height: 50, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Bayar Zakat Section */}
      <View style={styles.containerBayar}>
        <View style={styles.leftContent}>
          <Text style={styles.textMarhaban}>Marhaban Ya Ramadhan</Text>
          <Text style={styles.textZakat}>Yuk Bayar Zakat</Text>
          <TouchableOpacity
            style={styles.iconContainer2}
            onPress={() => navigation.navigate("NiatZakatScreen")}
          >
            <Image
              source={require("../../assets/IconNiatAmil.png")}
              style={{ width: 150, height: 50, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>

        {/* Gambar Zakat di kanan */}
        <Image
          source={require("../../assets/GambarZakat.png")}
          style={styles.zakatImage}
        />
      </View>
      {/* Icon Section kolom 1*/}
      <View style={styles.containerIcon}>
        <View style={styles.iconWithText}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("DataPembayaranZakat")}
          >
            <Image
              source={require("../../assets/IconPembayaran.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Transaksi</Text>
        </View>

        <View style={styles.iconWithText}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={navigateTo("DataPembagianZakat", { userEmail: userEmail })}
          >
            <Image
              source={require("../../assets/IkonPemberian.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Penyaluran</Text>
        </View>

        <View style={styles.iconWithText}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={navigateTo("KonfirmasiPembayaran")}
          >
            <Image
              source={require("../../assets/IconKonfirmasiBayar.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel2}>Setujui{"\n"}Transaksi</Text>
        </View>
        <View style={styles.iconWithText}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("DataMustahik")}
          >
            <Image
              source={require("../../assets/iconPenerima.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Penerima</Text>
        </View>
      </View>
      {/* Artikel Section */}
      <View style={styles.containerArtikel}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          Artikel akan segera datang!
        </Text>
      </View>
      <View style={styles.containerArtikel}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          Artikel akan segera datang!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  containerProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginBottom: 20,
    marginLeft: 30,
  },
  iconProfile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userName: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  containerBayar: {
    marginLeft: 30,
    width: "90%",
    padding: 20,
    backgroundColor: "#A2BA44",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textMarhaban: {
    fontWeight: "normal",
    fontSize: 10,
    color: "white",
  },
  textZakat: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginVertical: 5,
  },
  buttonBayar: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    width: 120,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  zakatImage: {
    width: 175,
    height: 150,
    marginLeft: 20,
    resizeMode: "contain",
  },
  containerIcon: {
    marginLeft: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    gap: 45,
  },
  iconWithText: {
    flexDirection: "column",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 5,
  },
  iconContainer2: {
    marginBottom: 5,
    marginTop: 15,
  },
  icon: {
    width: 65,
    height: 65,
    resizeMode: "contain",
  },
  iconLabel: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  iconLabel2: {
    fontSize: 9,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },

  containerArtikel: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    marginTop: 20,
    width: 400,
    height: 175,
    borderRadius: 15,
    marginLeft: 30,
  },
  ButtonKonfirmasiAmil: {
    marginLeft: 108,
    width: 20,
    height: 20,
    marginBottom: 22,
  },
});

export default MainMenu;
