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
        <Stack.Screen
          name="EditDataPembayaran"
          component={EditDataPembayaran}
        />
        <Stack.Screen name="MelihatPembayaran" component={MelihatPembayaran} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
