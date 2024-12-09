import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function MainMenuMuzakki({ route, navigation }) {
  const { userEmail } = route.params;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const db = getFirestore();
      const usersRef = collection(db, "akunMuzakki");
      const q = query(usersRef, where("email", "==", userEmail));

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserName(userData.nama || "Pengguna");
        } else {
          Alert.alert("Error", "Pengguna tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetching user name: ", error);
        Alert.alert("Error", "Terjadi kesalahan saat mengambil data.");
      }
    };

    fetchUserName();
  }, [userEmail]);

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
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Bayar Zakat Section */}
      <View style={styles.containerBayar}>
        <View style={styles.leftContent}>
          <Text style={styles.textMarhaban}>Marhaban Ya Ramadhan</Text>
          <Text style={styles.textZakat}>Yuk Bayar Zakat</Text>
          <TouchableOpacity
            style={styles.buttonBayar}
            onPress={() =>
              navigation.navigate("TransaksiZakatMuzakki", {
                userName: userName,
                userEmail: userEmail,
              })
            }
          >
            <Text style={styles.buttonText}>Bayar</Text>
          </TouchableOpacity>
        </View>
        {/* Gambar Zakat di kanan */}
        <Image
          source={require("../../assets/GambarZakat.png")}
          style={styles.zakatImage}
        />
      </View>
      {/* Icon Section */}
      <View style={styles.containerIcon}>
        <View style={styles.iconWithText}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() =>
              navigation.navigate("TransaksiZakatMuzakki", {
                userName: userName,
                userEmail: userEmail,
              })
            }
          >
            <Image
              source={require("../../assets/iconZakat.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Zakat</Text>
        </View>

        <View style={styles.iconWithText}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() =>
              navigation.navigate("RiwayatPembayaran", { userName: userName })
            }
          >
            <Image
              source={require("../../assets/iconRiwayat.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Riwayat</Text>
        </View>

        <View style={styles.iconWithText}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("NiatZakatScreen")}
          >
            <Image
              source={require("../../assets/iconNiat.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Niat</Text>
        </View>
        <View style={styles.iconWithText}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("LihatPenerima")}
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
}

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
  icon: {
    width: 65,
    height: 65,
    resizeMode: "contain",
  },
  iconLabel: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
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
});
