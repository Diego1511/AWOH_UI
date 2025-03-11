import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text, Icon, Layout, Card } from "@ui-kitten/components";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "Diego" && password === "1234") {
      router.replace("/(tabs)/home"); // Redirige a la pantalla principal
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h4" style={styles.title}>
          Iniciar Sesión
        </Text>

        <Input
          value={username}
          label="Usuario"
          placeholder="Ingresa tu usuario"
          accessoryLeft={(props) => <Icon {...props} name="person-outline" />}
          onChangeText={setUsername}
          style={styles.input}
          status="primary"
        />

        <Input
          value={password}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          secureTextEntry
          accessoryLeft={(props) => <Icon {...props} name="lock-outline" />}
          onChangeText={setPassword}
          style={styles.input}
          status="primary"
        />

        <Button onPress={handleLogin} style={styles.button}>
          Ingresar
        </Button>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f9fc", // Fondo claro
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#2e3a59", // Color del texto
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#3366ff", // Color del botón
    borderColor: "#3366ff", // Color del borde del botón
  },
});
