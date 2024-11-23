import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Helper untuk mendapatkan tanggal hari ini
const getTodayDate = () => new Date().toISOString().split("T")[0];

// Hook untuk mendapatkan UID pengguna yang sedang login
const useAmilUid = () => {
  const auth = getAuth();
  const [amilUid, setAmilUid] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setAmilUid(currentUser.uid);
    }
  }, [auth]);

  return amilUid;
};

// Hook untuk mendapatkan data Mustahik dari Firestore
const useMustahikList = () => {
  const [mustahikList, setMustahikList] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchMustahikList = async () => {
      try {
        const mustahikRef = collection(db, "mustahik");
        const mustahikSnapshot = await getDocs(mustahikRef);
        const mustahikData = mustahikSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMustahikList(mustahikData);
      } catch (error) {
        console.error("Error fetching mustahik data: ", error);
        Alert.alert("Error", "Gagal mengambil data mustahik.");
      }
    };

    fetchMustahikList();
  }, [db]);

  return mustahikList;
};

// Fungsi murni untuk menambah pembagian zakat
const tambahPembagianZakat = async (
  amilUid,
  mustahik,
  nominal,
  bentukZakat,
  db
) => {
  if (!amilUid || !mustahik || !nominal || !bentukZakat) {
    throw new Error("Semua data harus diisi.");
  }

  const pembagianZakatRef = collection(db, "pembagianZakat");
  await addDoc(pembagianZakatRef, {
    amilUid, // UID Amil
    mustahik, // Semua data Mustahik (nama, kategori, dll.)
    nominal: parseInt(nominal), // Nominal zakat
    bentukZakat, // Jenis zakat (Beras, Uang, Emas)
    tanggal: getTodayDate(), // Tanggal hari ini
  });
};

// Fungsi untuk membuat item picker dari daftar mustahik
const createPickerItems = (mustahikList) => {
  return mustahikList.map((mustahik) => (
    <Picker.Item
      key={mustahik.id}
      label={`${mustahik.nama} - ${mustahik.kategori}`}
      value={mustahik.id}
    />
  ));
};

// Custom hook untuk mengelola state form
const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => setFormData(initialState);

  return { formData, handleInputChange, resetForm };
};

// Komponen picker untuk kategori dan status
const PickerField = ({ label, selectedValue, onValueChange, items }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
      >
        {items.map(({ label, value }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
    </View>
  </>
);

const TambahPembagianZakat = ({ route, navigation }) => {
  const { userEmail } = route.params;
  const amilUid = useAmilUid();
  const mustahikList = useMustahikList();
  const db = getFirestore();

  const { formData, handleInputChange, resetForm } = useFormState({
    selectedMustahik: "",
    nominal: "",
    bentukZakat: "Beras",
  });

  const handleTambahPembagianZakat = useCallback(() => {
    const selectedMustahikData = mustahikList.find(
      (mustahik) => mustahik.id === formData.selectedMustahik
    );

    if (!selectedMustahikData) {
      Alert.alert("Error", "Pilih mustahik yang valid.");
      return;
    }

    tambahPembagianZakat(
      amilUid,
      selectedMustahikData,
      formData.nominal,
      formData.bentukZakat,
      db
    )
      .then(() => {
        Alert.alert("Sukses!", "Data pembagian zakat berhasil ditambahkan.");
        // Reset form setelah data berhasil disimpan
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding zakat record: ", error);
        Alert.alert(
          "Error",
          error.message || "Gagal menambahkan data pembagian zakat."
        );
      });
  }, [amilUid, formData, mustahikList, db, resetForm]);

  const pickerItemsMustahik = useMemo(
    () => createPickerItems(mustahikList),
    [mustahikList]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Pembagian Zakat</Text>

      {/* Picker untuk Nama Mustahik */}
      <PickerField
        label="Pilih Nama Mustahik"
        selectedValue={formData.selectedMustahik}
        onValueChange={(value) => handleInputChange("selectedMustahik", value)}
        items={mustahikList.map((mustahik) => ({
          label: `${mustahik.nama} - ${mustahik.kategori}`,
          value: mustahik.id,
        }))}
      />

      {/* Picker untuk Jenis Zakat */}
      <PickerField
        label="Pilih Jenis Zakat"
        selectedValue={formData.bentukZakat}
        onValueChange={(value) => handleInputChange("bentukZakat", value)}
        items={[
          { label: "Beras", value: "Beras" },
          { label: "Uang", value: "Uang" },
          { label: "Emas", value: "Emas" },
        ]}
      />

      {/* Input untuk Nominal Zakat */}
      <TextInput
        style={styles.input}
        placeholder="Nominal Zakat"
        keyboardType="numeric"
        value={formData.nominal}
        onChangeText={(value) => handleInputChange("nominal", value)}
      />

      {/* Tombol untuk Menambah Pembagian Zakat */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleTambahPembagianZakat}
      >
        <Text style={styles.buttonText}>Tambah Pembagian Zakat</Text>
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
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  pickerContainer: {
    height: 50,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TambahPembagianZakat;
