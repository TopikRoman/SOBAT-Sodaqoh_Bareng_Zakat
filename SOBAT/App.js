import "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import MainMenu from "./screens/screenAmil/MainMenu";
import TambahPembayaran from "./screens/DataPembayaran/MenambahDataPembayaran";
import MelihatPembayaran from "./screens/DataPembayaran/MelihatPembayaran";
import DetailPembayaran from "./screens/DataPembayaran/DetailPembayaran";
import EditDataPembayaran from "./screens/DataPembayaran/EditDataPembayaran";
import DataMustahik from "./screens/DataMustahik/DataMustahik";
import TambahMustahik from "./screens/DataMustahik/TambahDataMustahik";
import DetailMustahik from "./screens/DataMustahik/DetailMustahik";
import EditDataMustahik from "./screens/DataMustahik/EditDataMustahik";
import MainMenuAmil from "./screens/ScreenMuzakki/MainMenuMuzakki";
import TransaksiZakatMuzakki from "./screens/ScreenMuzakki/TransaksiZakat";
import DaftarAmil from "./screens/DaftarAkun/DaftarAmil";
import DaftarMuzakki from "./screens/DaftarAkun/DaftarMuzakki";
import LoginAmil from "./screens/SeparateLogin/LoginAmil";
import LoginMuzakki from "./screens/SeparateLogin/LoginMuzakki";
import ApprovalAmil from "./screens/screenAmil/dataAmilPending";
import DetailApproveAmil from "./screens/screenAmil/detailApproveAmil";
import MainMenuMuzakki from "./screens/ScreenMuzakki/MainMenuMuzakki";
import TambahPembagianZakat from "./screens/PembagianZakat/TambahPembagianZakat";
import DataPembagianZakat from "./screens/PembagianZakat/DataPembagian";
import DetailPembagian from "./screens/PembagianZakat/DetailPembagian";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TambahPembayaran" component={TambahPembayaran} />
        <Stack.Screen name="DetailPembayaran" component={DetailPembayaran} />
        <Stack.Screen name="DataMustahik" component={DataMustahik} />
        <Stack.Screen name="TambahDataMustahik" component={TambahMustahik} />
        <Stack.Screen name="ApproveAkunAmil" component={ApprovalAmil} />
        <Stack.Screen name="DetailApproveAmil" component={DetailApproveAmil} />
        <Stack.Screen name="DetailDataMustahik" component={DetailMustahik} />
        <Stack.Screen name="EditDataMustahik" component={EditDataMustahik} />
        <Stack.Screen name="MainMenuMuzakki" component={MainMenuMuzakki} />
        <Stack.Screen name="DetailPembagian" component={DetailPembagian} />
        <Stack.Screen
          name="DataPembagianZakat"
          component={DataPembagianZakat}
        />
        <Stack.Screen
          name="TambahPembagianZakat"
          component={TambahPembagianZakat}
        />
        <Stack.Screen
          name="DaftarAmil"
          component={DaftarAmil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DaftarMuzakki"
          component={DaftarMuzakki}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginAmil"
          component={LoginAmil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginMuzakki"
          component={LoginMuzakki}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditDataPembayaran"
          component={EditDataPembayaran}
        />
        <Stack.Screen
          name="DataPembayaranZakat"
          component={MelihatPembayaran}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
