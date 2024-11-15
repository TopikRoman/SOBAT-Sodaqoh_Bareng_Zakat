import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const MelihatPembayaran = () => {
  const [dataPembayaran, setDataPembayaran] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(
            collection(db, "pembayaranZakat")
          );
          const pembayaranData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDataPembayaran(pembayaranData);
        } catch (error) {
          console.error("Error fetching documents: ", error);
        }
      };

      fetchData();

      if (selectedItem) {
        navigation.setOptions({
          headerRight: () => (
            <>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.headerButton}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.headerButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={unselectedData}>
                <Text style={styles.headerButton}>Batal</Text>
              </TouchableOpacity>
            </>
          ),
        });
      } else {
        navigation.setOptions({
          headerRight: null,
        });
      }
    }, [navigation, selectedItem])
  );

  const unselectedData = () => {
    setSelectedItem(null);
  };

  const handlePress = (item) => {
    navigation.navigate("DetailPembayaran", { pembayaran: item });
  };

  const handleLongPress = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    deleteDoc(doc(db, "pembayaranZakat", selectedItem.id))
      .then(() => {
        setDataPembayaran(
          dataPembayaran.filter((item) => item.id !== selectedItem.id)
        );
        setSelectedItem(null);
        Alert.alert("Berhasil", "Data pembayaran telah dihapus.");
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
        Alert.alert("Error", "Gagal menghapus data pembayaran.");
      });
  };

  const handleEdit = () => {
    if (selectedItem) {
      navigation.navigate("EditDataPembayaran", { pembayaran: selectedItem });
      unselectedData();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedItem && selectedItem.id === item.id
          ? styles.selectedItem
          : null,
      ]}
      onPress={() => handlePress(item)}
      onLongPress={() => handleLongPress(item)}
    >
      <Text style={styles.itemText}>
        {item.nama} - {item.jenisZakat}
      </Text>
    </TouchableOpacity>
  );

  const handleAddItem = () => {
    navigation.navigate("TambahPembayaran");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Pembayaran Zakat</Text>
      <FlatList
        data={dataPembayaran}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.tombolTambah} onPress={handleAddItem}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    textAlign: "center",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedItem: {
    backgroundColor: "#D3E4CD",
  },
  itemText: {
    fontSize: 18,
  },
  headerButton: {
    color: "red",
    marginRight: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  tombolTambah: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  fabText: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
    lineHeight: 55,
    textAlign: "center",
  },
});

export default MelihatPembayaran;
