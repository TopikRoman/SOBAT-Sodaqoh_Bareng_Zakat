import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Fungsi untuk menyimpan data ke Firestore
const simpanDataKeFirestore = async (newData) => {
  try {
    await addDoc(collection(db, "mustahik"), newData);
    return {
      success: true,
      message: "Data mustahik berhasil disimpan",
    };
  } catch (error) {
    console.error("Error menambahkan data ke Firestore: ", error);
    return { success: false, message: "Terjadi kesalahan saat menyimpan data" };
  }
};

// Fungsi untuk memeriksa apakah input sudah lengkap
const periksaInput = (data) => {
  return (
    data.nama &&
    data.telepon &&
    data.alamat &&
    data.kategori &&
    data.status &&
    data.tahun
  );
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

// Fungsi untuk membuat data mustahik lengkap dengan tanggal
const buatDataMustahik = (data) => ({
  ...data,
});

// Fungsi untuk menyimpan data setelah pemeriksaan
const menyimpanDataMustahik = async (data) => {
  if (!periksaInput(data)) {
    return {
      success: false,
      message:
        "Semua kolom harus diisi! Pastikan semua kolom sudah diisi dengan benar.",
    };
  }

  const newData = buatDataMustahik(data);
  return await simpanDataKeFirestore(newData);
};

// Komponen input field yang dapat digunakan kembali
const InputField = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    keyboardType={keyboardType}
    onChangeText={onChangeText}
  />
);

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

const TambahMustahik = () => {
  const { formData, handleInputChange, resetForm } = useFormState({
    nama: "",
    telepon: "",
    alamat: "",
    kategori: "Fakir",
    status: "Aktif",
    tahun: "",
  });

  const handleSubmit = async () => {
    const result = await menyimpanDataMustahik(formData);
    alert(result.message);

    if (result.success) {
      resetForm();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Form Data Mustahik</Text>

        <InputField
          placeholder="Nama"
          value={formData.nama}
          onChangeText={(value) => handleInputChange("nama", value)}
        />

        <InputField
          placeholder="Nomor Telepon"
          keyboardType="phone-pad"
          value={formData.telepon}
          onChangeText={(value) => handleInputChange("telepon", value)}
        />

        <InputField
          placeholder="Alamat"
          value={formData.alamat}
          onChangeText={(value) => handleInputChange("alamat", value)}
        />

        <PickerField
          label="Kategori"
          selectedValue={formData.kategori}
          onValueChange={(value) => handleInputChange("kategori", value)}
          items={[
            { label: "Fakir", value: "Fakir" },
            { label: "Miskin", value: "Miskin" },
            { label: "Amil", value: "Amil" },
            { label: "Mualaf", value: "Mualaf" },
            { label: "Budak", value: "Budak" },
            { label: "Orang yang berhutang", value: "Orang yang berhutang" },
            { label: "Orang yang berjihad", value: "Orang yang berjihad" },
            { label: "Musafir", value: "Musafir" },
            { label: "Lembaga Amal", value: "Lembaga Amal" },
          ]}
        />

        <PickerField
          label="Status"
          selectedValue={formData.status}
          onValueChange={(value) => handleInputChange("status", value)}
          items={[
            { label: "Aktif", value: "Aktif" },
            { label: "Tidak Aktif", value: "Tidak Aktif" },
          ]}
        />

        <InputField
          placeholder="Tahun"
          keyboardType="numeric"
          value={formData.tahun}
          onChangeText={(value) => handleInputChange("tahun", value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
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

export default TambahMustahik;
