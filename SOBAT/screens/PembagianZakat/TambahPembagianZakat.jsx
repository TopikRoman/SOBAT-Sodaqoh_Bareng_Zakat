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

const getTodayDate = () => new Date().toISOString().split("T")[0];

const useMustahikList = () => {
  const [mustahikList, setMustahikList] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchMustahikList = async () => {
      try {
        const mustahikRef = collection(db, "mustahik");
        const mustahikSnapshot = await getDocs(mustahikRef);
        setMustahikList(
          mustahikSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch {
        Alert.alert("Error", "Gagal mengambil data mustahik.");
      }
    };

    fetchMustahikList();
  }, [db]);

  return mustahikList;
};

const tambahPembagianZakat = async (mustahik, nominal, bentukZakat, db) => {
  const pembagianZakatRef = collection(db, "pembagianZakat");
  await addDoc(pembagianZakatRef, {
    mustahik,
    nominal: parseInt(nominal),
    bentukZakat,
    tanggal: getTodayDate(),
  });
};

const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (name, value) =>
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  const resetForm = () => setFormData(initialState);

  return { formData, handleInputChange, resetForm };
};

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

const TambahPembagianZakat = () => {
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
      selectedMustahikData,
      formData.nominal,
      formData.bentukZakat,
      db
    )
      .then(() => {
        Alert.alert("Sukses!", "Data pembagian zakat berhasil ditambahkan.");
        resetForm();
      })
      .catch(() => {
        Alert.alert("Error", "Gagal menambahkan data pembagian zakat.");
      });
  }, [formData, mustahikList, db, resetForm]);

  const pickerItemsMustahik = useMemo(
    () => [
      { label: "Pilih nama mustahik", value: null },
      ...mustahikList.map((mustahik) => ({
        label: `${mustahik.nama} - ${mustahik.kategori}`,
        value: mustahik.id,
      })),
    ],
    [mustahikList]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Pembagian Zakat</Text>

      <PickerField
        label="Pilih Nama Mustahik"
        selectedValue={formData.selectedMustahik}
        onValueChange={(value) => handleInputChange("selectedMustahik", value)}
        items={pickerItemsMustahik}
      />

      <PickerField
        label="Pilih Jenis Zakat"
        selectedValue={formData.bentukZakat}
        onValueChange={(value) => handleInputChange("bentukZakat", value)}
        items={[
          { label: "Pilih jenis zakat", value: null },
          { label: "Beras", value: "Beras" },
          { label: "Uang", value: "Uang" },
          { label: "Emas", value: "Emas" },
        ]}
      />

      <TextInput
        style={styles.input}
        placeholder="Nominal Zakat"
        keyboardType="numeric"
        value={formData.nominal}
        onChangeText={(value) => handleInputChange("nominal", value)}
      />

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
  },
  pickerContainer: {
    height: 50,
    marginBottom: 15,
  },
  picker: {
    height: 50,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TambahPembagianZakat;
