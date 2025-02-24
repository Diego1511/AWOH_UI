import React from "react";
import { Layout, Text, Card, useTheme } from "@ui-kitten/components";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  useColorScheme,
} from "react-native";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function MetricasScreen() {
  const theme = useTheme(); // Accede al tema de UI Kitten
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Datos de ejemplo
  const salesData = {
    labels: ["Producto A", "Producto B", "Producto C"],
    datasets: [{ data: [50, 75, 30] }],
  };

  const stockData = [
    {
      name: "Producto A",
      population: 50,
      color: "#3366ff",
      legendFontColor: isDark ? "#e4e9f2" : "#222",
    },
    {
      name: "Producto B",
      population: 30,
      color: "#28a745",
      legendFontColor: isDark ? "#e4e9f2" : "#222",
    },
    {
      name: "Producto C",
      population: 20,
      color: "#ff3d71",
      legendFontColor: isDark ? "#e4e9f2" : "#222",
    },
  ];

  const dailySalesData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie"],
    datasets: [{ data: [20, 45, 28, 80, 99] }],
  };

  const chartConfig = {
    backgroundGradientFrom: isDark ? "#1a2a44" : "#f7f9fc",
    backgroundGradientTo: isDark ? "#2d4373" : "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) =>
      isDark
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(51, 102, 255, ${opacity})`,
    labelColor: (opacity = 1) =>
      isDark
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(34, 34, 34, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text category="h4" style={styles.title}>
          Métricas
        </Text>

        {/* Gráfico de barras: Ventas por producto */}
        <Card style={styles.chartCard}>
          <Text category="h6" style={styles.chartTitle}>
            Ventas por Producto
          </Text>
          <BarChart
            data={salesData}
            width={screenWidth - 64} // Ajustado al ancho de pantalla con márgenes
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </Card>

        {/* Gráfico circular: Distribución de stock */}
        <Card style={styles.chartCard}>
          <Text category="h6" style={styles.chartTitle}>
            Distribución de Stock
          </Text>
          <PieChart
            data={stockData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        </Card>

        {/* Gráfico de líneas: Ventas diarias */}
        <Card style={styles.chartCard}>
          <Text category="h6" style={styles.chartTitle}>
            Ventas Diarias
          </Text>
          <LineChart
            data={dailySalesData}
            width={screenWidth - 64}
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </Card>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Espacio para el botón flotante en otras pestañas
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#3366ff",
  },
  chartCard: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
    padding: 16,
    backgroundColor: "transparent", // Fondo manejado por chartConfig
  },
  chartTitle: {
    marginBottom: 12,
    textAlign: "center",
  },
  chart: {
    borderRadius: 16,
  },
});
