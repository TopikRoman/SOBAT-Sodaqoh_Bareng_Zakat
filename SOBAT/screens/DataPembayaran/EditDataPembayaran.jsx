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

const simpanUpdatePembayaran = async (id, data) => {
  try {
    const pembayaranRef = doc(db, "pembayaranZakat", id);
    await updateDoc(pembayaranRef, data);
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

  return { formData, handleInputChange };
};

const menyimpaDataEditdiFirestore = async (iddata, data) => {
  if (!periksaInput(data)) {
    return {
      success: false,
      message:
        "Semua kolom harus diisi! Pastikan nama, jenis zakat, dan nominal tidak kosong.",
    };
  }

  return await simpanUpdatePembayaran(iddata, data);
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

const EditDataPembayaran = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pembayaran } = route.params;

  const { formData, handleInputChange } = useFormState({
    nama: pembayaran.nama,
    alamat: pembayaran.alamat,
    telepon: pembayaran.telepon,
    atasNama: pembayaran.atasNama,
    jenisZakat: pembayaran.jenisZakat,
    bentukZakat: pembayaran.bentukZakat,
    banyakZakat: pembayaran.banyakZakat,
  });

  const handleSubmit = async () => {
    const result = await menyimpaDataEditdiFirestore(pembayaran.id, formData);

    if (result.success) {
      alert("Data pembayaran zakat berhasil diupdate");
      navigation.goBack();
    } else {
      alert("Terjadi kesalahan saat mengupdate data");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Pembayaran Zakat</Text>

        <InputField
          label="Nama"
          value={formData.nama}
          onChangeText={(text) => handleInputChange("nama", text)}
        />
        <InputField
          label="Alamat"
          value={formData.alamat}
          onChangeText={(text) => handleInputChange("alamat", text)}
        />
        <InputField
          label="Nomor Telepon"
          value={formData.telepon}
          onChangeText={(text) => handleInputChange("telepon", text)}
          keyboardType="phone-pad"
        />
        <InputField
          label="Zakat Atas Nama"
          value={formData.atasNama}
          onChangeText={(text) => handleInputChange("atasNama", text)}
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
          label="Banyaknya Zakat"
          value={formData.banyakZakat}
          onChangeText={(text) => handleInputChange("banyakZakat", text)}
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

export default EditDataPembayaran;
