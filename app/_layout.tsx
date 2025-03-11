import { useEffect } from "react";
import { Slot, useRouter } from "expo-router";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        router.replace("/login"); // Redirige a la pantalla de inicio de sesión si no hay token
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <Slot />
      </ApplicationProvider>
    </>
  );
}
