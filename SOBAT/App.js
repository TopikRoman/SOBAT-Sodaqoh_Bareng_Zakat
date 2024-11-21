import "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import MainMenu from "./screens/MainMenu";
import TambahPembayaran from "./screens/DataPembayaran/MenambahDataPembayaran";
import MelihatPembayaran from "./screens/DataPembayaran/MelihatPembayaran";
import DetailPembayaran from "./screens/DataPembayaran/DetailPembayaran";
import EditDataPembayaran from "./screens/DataPembayaran/EditDataPembayaran";
import DataMustahik from "./screens/DataMustahik/DataMustahik";
import TambahMustahik from "./screens/DataMustahik/TambahDataMustahik";
import DetailMustahik from "./screens/DataMustahik/DetailMustahik";
import EditDataMustahik from "./screens/DataMustahik/EditDataMustahik";
import MainMenuAmil from "./screens/ScreenAmil/MainMenu";
import TransaksiZakatMuzakki from "./screens/ScreenAmil/TransaksiZakat";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="MainMenuAmil"
          component={MainMenuAmil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransaksiZakatMuzakki"
          component={TransaksiZakatMuzakki}
        />
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
        <Stack.Screen name="DetailDataMustahik" component={DetailMustahik} />
        <Stack.Screen name="EditDataMustahik" component={EditDataMustahik} />
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
