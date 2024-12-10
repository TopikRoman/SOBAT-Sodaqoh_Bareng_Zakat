import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native"; // Tambahkan import useNavigation

// Fungsi untuk menyimpan data ke Firestore
const simpanDataKeFirestore = async (newData) => {
  try {
    await addDoc(collection(db, "pembayaranPending"), newData);
    return {
      success: true,
      message: "Data pembayaran zakat berhasil disimpan",
    };
  } catch (error) {
    console.error("Error menambahkan data ke Firestore: ", error);
    return { success: false, message: "Terjadi kesalahan saat menyimpan data" };
  }
};

// Fungsi untuk memeriksa input
const periksaInput = (data) => {
  return (
    data.email &&
    data.nama &&
    data.alamat &&
    data.telepon &&
    data.atasNama &&
    data.jenisZakat &&
    data.bentukZakat &&
    data.banyakZakat &&
    data.metodePembayaran
  );
};

// Hook untuk mengelola state formulir
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

// Fungsi untuk membuat data pembayaran
const buatDataPembayaran = (data) => ({
  ...data,
  tanggal: new Date().toISOString(),
});

// Fungsi untuk menyimpan data ke Firestore dengan validasi input
const menyimpanDatadiFirestore = async (data) => {
  if (!periksaInput(data)) {
    return {
      success: false,
      message:
        "Semua kolom harus diisi! Pastikan email, nama, jenis zakat, nominal, dan metode pembayaran tidak kosong.",
    };
  }

  const newData = buatDataPembayaran(data);
  return await simpanDataKeFirestore(newData);
};

// Komponen Input Field
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

// Komponen Picker
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

// Komponen Form Pembayaran Zakat
const TransaksiZakatMuzakki = ({ route }) => {
  const { userName, userEmail } = route.params;
  const { formData, handleInputChange, resetForm } = useFormState({
    email: userEmail || "",
    nama: userName || "",
    alamat: "",
    telepon: "",
    atasNama: "",
    jenisZakat: "fitrah",
    bentukZakat: "beras",
    banyakZakat: "",
    metodePembayaran: "qris",
  });

  const navigation = useNavigation(); // Inisialisasi navigation

  const handleSubmit = async () => {
    const result = await menyimpanDatadiFirestore(formData);
    alert(result.message);

    if (result.success) {
      // Jika metode pembayaran adalah BRI, arahkan ke halaman PembayaranTransaksiBRI
      if (formData.metodePembayaran === "transfer_bri") {
        navigation.navigate("PembayaranTransaksiBRI", {
          banyakZakat: formData.banyakZakat,
        });
        resetForm();
      } else if (formData.metodePembayaran === "dana") {
        navigation.navigate("TransaksiPembayaranDana", {
          banyakZakat: formData.banyakZakat,
        });
        resetForm();
      }
      // Jika metode pembayaran adalah QRIS, navigasikan ke halaman TransaksiPembayaranQRIS
      else if (formData.metodePembayaran === "qris") {
        navigation.navigate("TransaksiPembayaranQRIS", {
          banyakZakat: formData.banyakZakat,
        });
        resetForm();
      } else {
        resetForm();
      }
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
          items={[{ label: "Uang", value: "uang" }]}
        />

        <InputField
          placeholder="Banyaknya Zakat"
          keyboardType="numeric"
          value={formData.banyakZakat}
          onChangeText={(value) => handleInputChange("banyakZakat", value)}
        />

        <PickerField
          label="Metode Pembayaran"
          selectedValue={formData.metodePembayaran}
          onValueChange={(value) =>
            handleInputChange("metodePembayaran", value)
          }
          items={[
            { label: "Qris", value: "qris" },
            { label: "Transfer Bank (BRI)", value: "transfer_bri" },
            { label: "Dana", value: "dana" },
          ]}
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

export default TransaksiZakatMuzakki;
