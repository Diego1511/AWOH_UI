import React, { useState } from "react";
import {
  Layout,
  Text,
  Card,
  List,
  Input,
  Button,
  Modal,
  Icon,
} from "@ui-kitten/components";
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from "react-native";

export default function ProveedoresScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#1a2a44" : "#f7f9fc";
  const cardBackgroundColor = colorScheme === "dark" ? "#2d4373" : "#fff";
  const textColor = colorScheme === "dark" ? "#e4e9f2" : "#222";

  const [proveedores, setProveedores] = useState([
    { id: "1", nombre: "Proveedor A", contacto: "proveedorA@email.com" },
    { id: "2", nombre: "Proveedor B", contacto: "proveedorB@email.com" },
    { id: "3", nombre: "Proveedor C", contacto: "proveedorC@email.com" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newProveedor, setNewProveedor] = useState({
    nombre: "",
    contacto: "",
  });
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const filteredProveedores = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProveedor = () => {
    if (!newProveedor.nombre || !newProveedor.contacto) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }
    const proveedor = {
      id: Date.now().toString(),
      nombre: newProveedor.nombre,
      contacto: newProveedor.contacto,
    };
    setProveedores([...proveedores, proveedor]);
    setNewProveedor({ nombre: "", contacto: "" });
    setAddModalVisible(false);
    Alert.alert("Éxito", "Proveedor agregado correctamente.");
  };

  const handleEditProveedor = () => {
    if (!newProveedor.nombre || !newProveedor.contacto) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }
    const updatedProveedores = proveedores.map((p) =>
      p.id === selectedProveedor.id ? { ...p, ...newProveedor } : p
    );
    setProveedores(updatedProveedores);
    setNewProveedor({ nombre: "", contacto: "" });
    setEditModalVisible(false);
    setSelectedProveedor(null);
    Alert.alert("Éxito", "Proveedor actualizado correctamente.");
  };

  const handleDeleteProveedor = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este proveedor?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setProveedores(proveedores.filter((p) => p.id !== id));
            Alert.alert("Éxito", "Proveedor eliminado.");
          },
        },
      ]
    );
  };

  const renderDeleteIcon = (props, id) => (
    <TouchableOpacity onPress={() => handleDeleteProveedor(id)}>
      <Icon {...props} name="trash-2-outline" fill="#ff3d71" />
    </TouchableOpacity>
  );

  const renderProveedor = ({ item }) => (
    <Card
      style={[styles.card, { backgroundColor: cardBackgroundColor }]}
      onPress={() => {
        setSelectedProveedor(item);
        setNewProveedor({ nombre: item.nombre, contacto: item.contacto });
        setEditModalVisible(true);
      }}
    >
      <Layout style={styles.cardContent}>
        <Text category="s1" style={[styles.cardText, { color: textColor }]}>
          {item.nombre}
        </Text>
        <Text category="p2" appearance="hint" style={styles.cardText}>
          Contacto: {item.contacto}
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
        placeholder="Buscar proveedor..."
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
        data={filteredProveedores}
        renderItem={renderProveedor}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text category="p1" appearance="hint" style={styles.emptyText}>
            No hay proveedores registrados.
          </Text>
        }
      />

      {/* Botón flotante para agregar proveedor, ajustado para quedar encima de la barra */}
      <Button
        style={styles.addButton}
        status="success"
        accessoryLeft={(props) => <Icon {...props} name="plus-outline" />}
        onPress={() => setAddModalVisible(true)}
      >
        Agregar Proveedor
      </Button>

      <Modal
        visible={isAddModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setAddModalVisible(false)}
      >
        <Card disabled style={styles.modalCard}>
          <Text category="h6" style={styles.modalTitle}>
            Nuevo Proveedor
          </Text>
          <Input
            placeholder="Nombre"
            value={newProveedor.nombre}
            onChangeText={(text) =>
              setNewProveedor({ ...newProveedor, nombre: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Contacto"
            value={newProveedor.contacto}
            onChangeText={(text) =>
              setNewProveedor({ ...newProveedor, contacto: text })
            }
            keyboardType="email-address"
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
            <Button onPress={handleAddProveedor} style={styles.modalButton}>
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
            Editar Proveedor
          </Text>
          <Input
            placeholder="Nombre"
            value={newProveedor.nombre}
            onChangeText={(text) =>
              setNewProveedor({ ...newProveedor, nombre: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Contacto"
            value={newProveedor.contacto}
            onChangeText={(text) =>
              setNewProveedor({ ...newProveedor, contacto: text })
            }
            keyboardType="email-address"
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
            <Button onPress={handleEditProveedor} style={styles.modalButton}>
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
    ...(Platform.OS === "web" && { maxWidth: 800, alignSelf: "center" }),
  },
  cardContent: {
    flex: 1,
    flexDirection: Platform.OS === "web" ? "row" : "column",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  cardText: {
    ...(Platform.OS === "web" && { flex: 1, minWidth: 150 }),
    ...(Platform.OS !== "web" && { marginBottom: 4 }),
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
    bottom: 70,
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
