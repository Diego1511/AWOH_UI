import { Tabs } from "expo-router";
import { ApplicationProvider, IconRegistry, Icon } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { StyleSheet, Platform, View, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function HomeIcon(props) {
  return <Icon {...props} name="home-outline" />;
}

function InventarioIcon(props) {
  return <Icon {...props} name="archive-outline" />;
}

function MetricsIcon(props) {
  return <Icon {...props} name="bar-chart-outline" />;
}

function ProveedoresIcon(props) {
  return <Icon {...props} name="people-outline" />;
}

function UsuariosIcon(props) {
  return <Icon {...props} name="person-outline" />;
}

function ClientesIcon(props) {
  return <Icon {...props} name="person-add-outline" />; // Ícono para clientes
}

const CustomTabBarIcon = ({ focused, color, IconComponent }) => (
  <View
    style={[
      styles.tabBarIconContainer,
      focused && styles.tabBarIconContainerActive,
    ]}
  >
    <IconComponent fill={color} width={24} height={24} />
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <Tabs
          screenOptions={{
            tabBarStyle: [
              styles.tabBar,
              colorScheme === "dark" && styles.tabBarDark,
            ],
            tabBarActiveTintColor:
              colorScheme === "dark" ? "#5a8cff" : "#3366ff",
            tabBarInactiveTintColor:
              colorScheme === "dark" ? "#8f9bb3" : "#d1e0ff",
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIconStyle: styles.tabBarIcon,
            tabBarItemStyle: styles.tabBarItem,
            headerShown: false,
            tabBarBackground: () => (
              <LinearGradient
                colors={
                  colorScheme === "dark"
                    ? ["#1a2a44", "#2d4373"]
                    : ["#3366ff", "#5a8cff"]
                }
                style={styles.gradientBackground}
              />
            ),
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Facturador",
              tabBarIcon: ({ focused, color }) => (
                <CustomTabBarIcon
                  focused={focused}
                  color={color}
                  IconComponent={HomeIcon}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="inventario"
            options={{
              title: "Inventario",
              tabBarIcon: ({ focused, color }) => (
                <CustomTabBarIcon
                  focused={focused}
                  color={color}
                  IconComponent={InventarioIcon}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="metricas"
            options={{
              title: "Métricas",
              tabBarIcon: ({ focused, color }) => (
                <CustomTabBarIcon
                  focused={focused}
                  color={color}
                  IconComponent={MetricsIcon}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="proveedores"
            options={{
              title: "Proveedores",
              tabBarIcon: ({ focused, color }) => (
                <CustomTabBarIcon
                  focused={focused}
                  color={color}
                  IconComponent={ProveedoresIcon}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="usuarios"
            options={{
              title: "Usuarios",
              tabBarIcon: ({ focused, color }) => (
                <CustomTabBarIcon
                  focused={focused}
                  color={color}
                  IconComponent={UsuariosIcon}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="clientes"
            options={{
              title: "Clientes",
              tabBarIcon: ({ focused, color }) => (
                <CustomTabBarIcon
                  focused={focused}
                  color={color}
                  IconComponent={ClientesIcon}
                />
              ),
            }}
          />
        </Tabs>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 5,
  },
  tabBarDark: {
    shadowColor: "#fff",
    shadowOpacity: 0.05,
  },
  gradientBackground: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },
  tabBarIcon: {
    marginTop: 5,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  tabBarIconContainer: {
    padding: 8,
    borderRadius: 20,
  },
  tabBarIconContainerActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});
