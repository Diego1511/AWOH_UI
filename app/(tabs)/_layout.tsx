import { Tabs } from "expo-router";
import { ApplicationProvider, IconRegistry, Icon } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { StyleSheet, Platform, View } from "react-native";

function HomeIcon(props) {
  return <Icon {...props} name="home-outline" />;
}

function InventarioIcon(props) {
  return <Icon {...props} name="archive-outline" />;
}

export default function TabLayout() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Tabs
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: "#3366ff", // Color activo
            tabBarInactiveTintColor: "#8f9bb3", // Color inactivo
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIconStyle: styles.tabBarIcon,
            tabBarItemStyle: styles.tabBarItem,
            headerShown: false, // Ocultar la barra superior por defecto
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Facturador",
              tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
            }}
          />
          <Tabs.Screen
            name="inventario"
            options={{
              title: "Inventario",
              tabBarIcon: ({ color }) => <InventarioIcon fill={color} />,
            }}
          />
          <Tabs.Screen
            name="proveedores"
            options={{
              title: "Proveedores",
              tabBarIcon: ({ color }) => <InventarioIcon fill={color} />,
            }}
          />
        </Tabs>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65, // Altura mayor para un diseño más prominente
    backgroundColor: "#fff", // Fondo blanco
    borderTopWidth: 0, // Sin borde superior
    elevation: 10, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingBottom: Platform.OS === "ios" ? 20 : 10, // Ajuste para notches
    paddingTop: 1,
    borderTopLeftRadius: 0, // Bordes redondeados superiores
    borderTopRightRadius: 0,
    overflow: "hidden", // Evitar que el contenido se salga de los bordes redondeados
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },
  tabBarIcon: {
    marginTop: 2,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
});
