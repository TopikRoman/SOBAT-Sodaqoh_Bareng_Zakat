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

const simpanDataKeFirestore = async (newData) => {
  try {
    await addDoc(collection(db, "pembayaranZakat"), newData);
    return {
      success: true,
      message: "Data pembayaran zakat berhasil disimpan",
    };
  } catch (error) {
    console.error("Error menambahkan data ke Firestore: ", error);
    return { success: false, message: "Terjadi kesalahan saat menyimpan data" };
  }
};

const periksaInput = (data) => {
  return (
    data.nama &&
    data.alamat &&
    data.telepon &&
    data.atasNama &&
    data.jenisZakat &&
    data.bentukZakat &&
    data.banyakZakat
  );
};

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

const buatDataPembayaran = (data) => ({
  ...data,
  metodePembayaran: "Tunai", // Menambahkan properti metodePembayaran
  tanggal: new Date().toISOString(),
});

const menyimpanDatadiFirestore = async (data) => {
  if (!periksaInput(data)) {
    return {
      success: false,
      message:
        "Semua kolom harus diisi! Pastikan nama, jenis zakat, dan nominal tidak kosong.",
    };
  }

  const newData = buatDataPembayaran(data);
  return await simpanDataKeFirestore(newData);
};

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

const TambahPembayaran = () => {
  const { formData, handleInputChange, resetForm } = useFormState({
    nama: "",
    alamat: "",
    telepon: "",
    atasNama: "",
    jenisZakat: "fitrah",
    bentukZakat: "beras",
    banyakZakat: "",
  });

  const handleSubmit = async () => {
    const result = await menyimpanDatadiFirestore(formData);
    alert(result.message);

    if (result.success) {
      resetForm();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Form Pembayaran Zakat</Text>

        <InputField
          placeholder="Nama"
          value={formData.nama}
          onChangeText={(value) => handleInputChange("nama", value)}
        />

        <InputField
          placeholder="Alamat"
          value={formData.alamat}
          onChangeText={(value) => handleInputChange("alamat", value)}
        />

        <InputField
          placeholder="Nomor Telepon"
          keyboardType="phone-pad"
          value={formData.telepon}
          onChangeText={(value) => handleInputChange("telepon", value)}
        />

        <InputField
          placeholder="Zakat Atas Nama"
          value={formData.atasNama}
          onChangeText={(value) => handleInputChange("atasNama", value)}
        />

        <PickerField
          label="Jenis Zakat"
          selectedValue={formData.jenisZakat}
          onValueChange={(value) => handleInputChange("jenisZakat", value)}
          items={[
            { label: "Zakat Fitrah", value: "fitrah" },
            { label: "Zakat Mal", value: "mal" },
          ]}
        />

        <PickerField
          label="Bentuk Zakat"
          selectedValue={formData.bentukZakat}
          onValueChange={(value) => handleInputChange("bentukZakat", value)}
          items={[
            { label: "Beras", value: "beras" },
            { label: "Uang", value: "uang" },
            { label: "Emas", value: "emas" },
          ]}
        />

        <InputField
          placeholder="Banyaknya Zakat"
          keyboardType="numeric"
          value={formData.banyakZakat}
          onChangeText={(value) => handleInputChange("banyakZakat", value)}
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

export default TambahPembayaran;
