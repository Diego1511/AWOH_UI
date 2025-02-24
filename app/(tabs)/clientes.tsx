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

export default function ClientesScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#1a2a44" : "#f7f9fc";
  const cardBackgroundColor = colorScheme === "dark" ? "#2d4373" : "#fff";
  const textColor = colorScheme === "dark" ? "#e4e9f2" : "#222";

  const [clientes, setClientes] = useState([
    {
      id: "1",
      cedula: "12345678",
      nombre: "Ana López",
      correo: "ana@email.com",
      telefono: "3201234567",
    },
    {
      id: "2",
      cedula: "87654321",
      nombre: "Carlos Ruiz",
      correo: "carlos@email.com",
      telefono: "3009876543",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newCliente, setNewCliente] = useState({
    cedula: "",
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [selectedCliente, setSelectedCliente] = useState(null);

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCliente = () => {
    if (
      !newCliente.cedula ||
      !newCliente.nombre ||
      !newCliente.correo ||
      !newCliente.telefono
    ) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }
    const cliente = {
      id: Date.now().toString(),
      cedula: newCliente.cedula,
      nombre: newCliente.nombre,
      correo: newCliente.correo,
      telefono: newCliente.telefono,
    };
    setClientes([...clientes, cliente]);
    setNewCliente({ cedula: "", nombre: "", correo: "", telefono: "" });
    setAddModalVisible(false);
    Alert.alert("Éxito", "Cliente agregado correctamente.");
  };

  const handleEditCliente = () => {
    if (
      !newCliente.cedula ||
      !newCliente.nombre ||
      !newCliente.correo ||
      !newCliente.telefono
    ) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }
    const updatedClientes = clientes.map((c) =>
      c.id === selectedCliente.id ? { ...c, ...newCliente } : c
    );
    setClientes(updatedClientes);
    setNewCliente({ cedula: "", nombre: "", correo: "", telefono: "" });
    setEditModalVisible(false);
    setSelectedCliente(null);
    Alert.alert("Éxito", "Cliente actualizado correctamente.");
  };

  const handleDeleteCliente = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este cliente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setClientes(clientes.filter((c) => c.id !== id));
            Alert.alert("Éxito", "Cliente eliminado.");
          },
        },
      ]
    );
  };

  const renderDeleteIcon = (props, id) => (
    <TouchableOpacity onPress={() => handleDeleteCliente(id)}>
      <Icon {...props} name="trash-2-outline" fill="#ff3d71" />
    </TouchableOpacity>
  );

  const renderCliente = ({ item }) => (
    <Card
      style={[styles.card, { backgroundColor: cardBackgroundColor }]}
      onPress={() => {
        setSelectedCliente(item);
        setNewCliente({
          cedula: item.cedula,
          nombre: item.nombre,
          correo: item.correo,
          telefono: item.telefono,
        });
        setEditModalVisible(true);
      }}
    >
      <Layout style={styles.cardContent}>
        <Text category="s1" style={[styles.cardText, { color: textColor }]}>
          {item.nombre}
        </Text>
        <Text category="p2" appearance="hint" style={styles.cardText}>
          Cédula: {item.cedula}
        </Text>
        <Text category="p2" appearance="hint" style={styles.cardText}>
          Correo: {item.correo}
        </Text>
        <Text category="p2" appearance="hint" style={styles.cardText}>
          Teléfono: {item.telefono}
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
        placeholder="Buscar cliente..."
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
        data={filteredClientes}
        renderItem={renderCliente}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text category="p1" appearance="hint" style={styles.emptyText}>
            No se encontraron clientes.
          </Text>
        }
      />

      <Button
        style={styles.addButton}
        status="success"
        accessoryLeft={(props) => <Icon {...props} name="plus-outline" />}
        onPress={() => setAddModalVisible(true)}
      >
        Agregar Cliente
      </Button>

      <Modal
        visible={isAddModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setAddModalVisible(false)}
      >
        <Card disabled style={styles.modalCard}>
          <Text category="h6" style={styles.modalTitle}>
            Nuevo Cliente
          </Text>
          <Input
            placeholder="Cédula"
            value={newCliente.cedula}
            onChangeText={(text) =>
              setNewCliente({ ...newCliente, cedula: text })
            }
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Nombre"
            value={newCliente.nombre}
            onChangeText={(text) =>
              setNewCliente({ ...newCliente, nombre: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Correo"
            value={newCliente.correo}
            onChangeText={(text) =>
              setNewCliente({ ...newCliente, correo: text })
            }
            keyboardType="email-address"
            style={styles.modalInput}
          />
          <Input
            placeholder="Teléfono"
            value={newCliente.telefono}
            onChangeText={(text) =>
              setNewCliente({ ...newCliente, telefono: text })
            }
            keyboardType="phone-pad"
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
            <Button onPress={handleAddCliente} style={styles.modalButton}>
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
            Editar Cliente
          </Text>
          <Input
            placeholder="Cédula"
            value={newCliente.cedula}
            onChangeText={(text) =>
              setNewCliente({ ...newCliente, cedula: text })
            }
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Nombre"
            value={newCliente.nombre}
            onChangeText={(text) =>
              setNewCliente({ ...newCliente, nombre: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Correo"
            value={newCliente.correo}
            onChangeText={(text) =>
              setNewCliente({ ...newCliente, correo: text })
            }
            keyboardType="email-address"
            style={styles.modalInput}
          />
          <Input
            placeholder="Teléfono"
            value={newCliente.telefono}
            onChangeText={(text) =>
              setNewCliente({ ...newCliente, telefono: text })
            }
            keyboardType="phone-pad"
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
            <Button onPress={handleEditCliente} style={styles.modalButton}>
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
