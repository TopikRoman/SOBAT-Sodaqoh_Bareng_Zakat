import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../firebase/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const simpanUpdateMustahik = async (id, data) => {
  try {
    const mustahikRef = doc(db, "mustahik", id);
    await updateDoc(mustahikRef, data);
    return {
      success: true,
      message: "Data mustahik berhasil disimpan",
    };
  } catch (error) {
    console.error("Error menambahkan data ke Firestore: ", error);
    return { success: false, message: "Terjadi kesalahan saat menyimpan data" };
  }
};

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

const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { formData, handleInputChange };
};

const menyimpaDataEditdiFirestore = async (iddata, data) => {
  if (!periksaInput(data)) {
    return {
      success: false,
      message:
        "Semua kolom harus diisi! Pastikan nama, kategori, status, dan tahun tidak kosong.",
    };
  }

  return await simpanUpdateMustahik(iddata, data);
};

const InputField = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

const PickerField = ({ label, selectedValue, onValueChange, items }) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  </View>
);

const EditDataMustahik = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mustahik } = route.params;

  const { formData, handleInputChange } = useFormState({
    nama: mustahik.nama,
    telepon: mustahik.telepon,
    alamat: mustahik.alamat,
    kategori: mustahik.kategori,
    status: mustahik.status,
    tahun: mustahik.tahun,
  });

  const handleSubmit = async () => {
    const result = await menyimpaDataEditdiFirestore(mustahik.id, formData);

    if (result.success) {
      alert(result.message);
      navigation.goBack();
    } else {
      alert(result.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Data Mustahik</Text>

        <InputField
          label="Nama"
          value={formData.nama}
          onChangeText={(text) => handleInputChange("nama", text)}
        />
        <InputField
          label="Nomor Telepon"
          value={formData.telepon}
          onChangeText={(text) => handleInputChange("telepon", text)}
          keyboardType="phone-pad"
        />
        <InputField
          label="Alamat"
          value={formData.alamat}
          onChangeText={(text) => handleInputChange("alamat", text)}
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
            { label: "Aktif", value: "aktif" },
            { label: "Tidak Aktif", value: "tidak aktif" },
          ]}
        />

        <InputField
          label="Tahun"
          value={formData.tahun}
          onChangeText={(text) => handleInputChange("tahun", text)}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Simpan Perubahan</Text>
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

export default EditDataMustahik;
