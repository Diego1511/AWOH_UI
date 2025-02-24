import React, { useState } from "react";
import {
  Layout,
  Text,
  Input,
  Button,
  Card,
  Modal,
  Icon,
  List,
} from "@ui-kitten/components";
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from "react-native";

export default function UsuariosScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#1a2a44" : "#f7f9fc";
  const cardBackgroundColor = colorScheme === "dark" ? "#2d4373" : "#fff";
  const textColor = colorScheme === "dark" ? "#e4e9f2" : "#222";

  const [usuarios, setUsuarios] = useState([
    {
      id: "1",
      nit: "123456789",
      nombre: "Juan Pérez",
      email: "juan@email.com",
      telefono: "3001234567",
      suscripcion: "Premium",
      pin: "1234",
    },
    {
      id: "2",
      nit: "987654321",
      nombre: "María Gómez",
      email: "maria@email.com",
      telefono: "3109876543",
      suscripcion: "Básica",
      pin: "5678",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newUsuario, setNewUsuario] = useState({
    nit: "",
    nombre: "",
    email: "",
    telefono: "",
    suscripcion: "",
    pin: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUsuario = () => {
    if (
      !newUsuario.nit ||
      !newUsuario.nombre ||
      !newUsuario.email ||
      !newUsuario.telefono ||
      !newUsuario.suscripcion ||
      !newUsuario.pin ||
      !newUsuario.password ||
      newUsuario.password !== newUsuario.confirmPassword
    ) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos y verifica que las contraseñas coincidan."
      );
      return;
    }
    const usuario = {
      id: Date.now().toString(),
      nit: newUsuario.nit,
      nombre: newUsuario.nombre,
      email: newUsuario.email,
      telefono: newUsuario.telefono,
      suscripcion: newUsuario.suscripcion,
      pin: newUsuario.pin,
    };
    setUsuarios([...usuarios, usuario]);
    setNewUsuario({
      nit: "",
      nombre: "",
      email: "",
      telefono: "",
      suscripcion: "",
      pin: "",
      password: "",
      confirmPassword: "",
    });
    setAddModalVisible(false);
    Alert.alert("Éxito", "Usuario agregado correctamente.");
  };

  const handleEditUsuario = () => {
    if (
      !newUsuario.nit ||
      !newUsuario.nombre ||
      !newUsuario.email ||
      !newUsuario.telefono ||
      !newUsuario.suscripcion ||
      !newUsuario.pin
    ) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }
    const updatedUsuarios = usuarios.map((u) =>
      u.id === selectedUsuario.id ? { ...u, ...newUsuario } : u
    );
    setUsuarios(updatedUsuarios);
    setNewUsuario({
      nit: "",
      nombre: "",
      email: "",
      telefono: "",
      suscripcion: "",
      pin: "",
      password: "",
      confirmPassword: "",
    });
    setEditModalVisible(false);
    setSelectedUsuario(null);
    Alert.alert("Éxito", "Usuario actualizado correctamente.");
  };

  const handleDeleteUsuario = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setUsuarios(usuarios.filter((u) => u.id !== id));
            Alert.alert("Éxito", "Usuario eliminado.");
          },
        },
      ]
    );
  };

  const renderDeleteIcon = (props, id) => (
    <TouchableOpacity onPress={() => handleDeleteUsuario(id)}>
      <Icon {...props} name="trash-2-outline" fill="#ff3d71" />
    </TouchableOpacity>
  );

  const renderUsuario = ({ item }) => (
    <Card
      style={[styles.card, { backgroundColor: cardBackgroundColor }]}
      onPress={() => {
        setSelectedUsuario(item);
        setNewUsuario({
          nit: item.nit,
          nombre: item.nombre,
          email: item.email,
          telefono: item.telefono,
          suscripcion: item.suscripcion,
          pin: item.pin,
          password: "",
          confirmPassword: "",
        });
        setEditModalVisible(true);
      }}
    >
      <Layout style={styles.cardContent}>
        <Text category="s1" style={[styles.cardText, { color: textColor }]}>
          {item.nombre}
        </Text>
        <Text category="p2" appearance="hint" style={styles.cardText}>
          NIT: {item.nit}
        </Text>
        <Text category="p2" appearance="hint" style={styles.cardText}>
          Email: {item.email}
        </Text>
        <Text category="p2" appearance="hint" style={styles.cardText}>
          Teléfono: {item.telefono}
        </Text>
        <Text category="p2" appearance="hint" style={styles.cardText}>
          Suscripción: {item.suscripcion}
        </Text>
        <Text category="p2" appearance="hint" style={styles.cardText}>
          Pin: {item.pin}
        </Text>
      </Layout>
      <Layout style={styles.actionContainer}>
        {renderDeleteIcon({ width: 24, height: 24 }, item.id)}
      </Layout>
    </Card>
  );

  return (
    <Layout style={[styles.container, { backgroundColor }]}>
      <Input
        placeholder="Buscar usuario..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        accessoryRight={() => (
          <Button
            appearance="ghost"
            status="primary"
            accessoryLeft={(props) => <Icon {...props} name="search-outline" />}
          />
        )}
      />

      <List
        data={filteredUsuarios}
        renderItem={renderUsuario}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text category="p1" appearance="hint" style={styles.emptyText}>
            No se encontraron usuarios.
          </Text>
        }
      />

      <Button
        style={styles.addButton}
        status="success"
        accessoryLeft={(props) => <Icon {...props} name="plus-outline" />}
        onPress={() => setAddModalVisible(true)}
      >
        Agregar Usuario
      </Button>

      <Modal
        visible={isAddModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setAddModalVisible(false)}
      >
        <Card disabled style={styles.modalCard}>
          <Text category="h6" style={styles.modalTitle}>
            Nuevo Usuario
          </Text>
          <Input
            placeholder="NIT"
            value={newUsuario.nit}
            onChangeText={(text) => setNewUsuario({ ...newUsuario, nit: text })}
            style={styles.modalInput}
          />
          <Input
            placeholder="Nombre"
            value={newUsuario.nombre}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, nombre: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Email"
            value={newUsuario.email}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, email: text })
            }
            keyboardType="email-address"
            style={styles.modalInput}
          />
          <Input
            placeholder="Teléfono"
            value={newUsuario.telefono}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, telefono: text })
            }
            keyboardType="phone-pad"
            style={styles.modalInput}
          />
          <Input
            placeholder="Suscripción"
            value={newUsuario.suscripcion}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, suscripcion: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Pin"
            value={newUsuario.pin}
            onChangeText={(text) => setNewUsuario({ ...newUsuario, pin: text })}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Contraseña"
            value={newUsuario.password}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, password: text })
            }
            secureTextEntry
            style={styles.modalInput}
          />
          <Input
            placeholder="Confirmar Contraseña"
            value={newUsuario.confirmPassword}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, confirmPassword: text })
            }
            secureTextEntry
            style={styles.modalInput}
          />
          <Layout style={styles.modalButtons}>
            <Button
              status="basic"
              onPress={() => setAddModalVisible(false)}
              style={styles.modalButton}
            >
              Cancelar
            </Button>
            <Button onPress={handleAddUsuario} style={styles.modalButton}>
              Guardar
            </Button>
          </Layout>
        </Card>
      </Modal>

      <Modal
        visible={isEditModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setEditModalVisible(false)}
      >
        <Card disabled style={styles.modalCard}>
          <Text category="h6" style={styles.modalTitle}>
            Editar Usuario
          </Text>
          <Input
            placeholder="NIT"
            value={newUsuario.nit}
            onChangeText={(text) => setNewUsuario({ ...newUsuario, nit: text })}
            style={styles.modalInput}
          />
          <Input
            placeholder="Nombre"
            value={newUsuario.nombre}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, nombre: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Email"
            value={newUsuario.email}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, email: text })
            }
            keyboardType="email-address"
            style={styles.modalInput}
          />
          <Input
            placeholder="Teléfono"
            value={newUsuario.telefono}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, telefono: text })
            }
            keyboardType="phone-pad"
            style={styles.modalInput}
          />
          <Input
            placeholder="Suscripción"
            value={newUsuario.suscripcion}
            onChangeText={(text) =>
              setNewUsuario({ ...newUsuario, suscripcion: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Pin"
            value={newUsuario.pin}
            onChangeText={(text) => setNewUsuario({ ...newUsuario, pin: text })}
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Layout style={styles.modalButtons}>
            <Button
              status="basic"
              onPress={() => setEditModalVisible(false)}
              style={styles.modalButton}
            >
              Cancelar
            </Button>
            <Button onPress={handleEditUsuario} style={styles.modalButton}>
              Actualizar
            </Button>
          </Layout>
        </Card>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    ...(Platform.OS === "web" && { maxWidth: 800, alignSelf: "center" }), // Limitar ancho en web
  },
  cardContent: {
    flex: 1,
    flexDirection: Platform.OS === "web" ? "row" : "column", // Horizontal en web, vertical en móvil
    justifyContent: "space-between",
    flexWrap: "wrap", // Permitir que los elementos se ajusten en varias líneas si es necesario
  },
  cardText: {
    ...(Platform.OS === "web" && { flex: 1, minWidth: 150 }), // Distribución uniforme en web
    ...(Platform.OS !== "web" && { marginBottom: 4 }), // Espaciado en móvil
  },
  actionContainer: {
    marginLeft: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 50,
    paddingHorizontal: 20,
    elevation: 5,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    width: 300,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#3366ff",
  },
  modalInput: {
    marginBottom: 16,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
  },
});
