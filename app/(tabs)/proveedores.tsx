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
import { StyleSheet, Alert, TouchableOpacity, Platform } from "react-native";

export default function SuppliersScreen() {
  const [suppliers, setSuppliers] = useState([
    {
      id: "1",
      name: "Proveedor A",
      contact: "contactoA@example.com",
      phone: "123456789",
    },
    {
      id: "2",
      name: "Proveedor B",
      contact: "contactoB@example.com",
      phone: "987654321",
    },
    {
      id: "3",
      name: "Proveedor C",
      contact: "contactoC@example.com",
      phone: "456123789",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    phone: "",
  });
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.contact || !newSupplier.phone) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos correctamente."
      );
      return;
    }
    const supplier = {
      id: Date.now().toString(),
      ...newSupplier,
    };
    setSuppliers([...suppliers, supplier]);
    setNewSupplier({ name: "", contact: "", phone: "" });
    setAddModalVisible(false);
    Alert.alert("Éxito", "Proveedor agregado.");
  };

  const handleEditSupplier = () => {
    if (!newSupplier.name || !newSupplier.contact || !newSupplier.phone) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos correctamente."
      );
      return;
    }
    const updatedSuppliers = suppliers.map((s) =>
      s.id === selectedSupplier.id ? { ...s, ...newSupplier } : s
    );
    setSuppliers(updatedSuppliers);
    setNewSupplier({ name: "", contact: "", phone: "" });
    setEditModalVisible(false);
    setSelectedSupplier(null);
    Alert.alert("Éxito", "Proveedor modificado correctamente.");
  };

  const handleDeleteSupplier = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este proveedor?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setSuppliers(suppliers.filter((s) => s.id !== id));
            Alert.alert("Éxito", "Proveedor eliminado.");
          },
        },
      ]
    );
  };

  const renderDeleteIcon = (props, id) => (
    <TouchableOpacity onPress={() => handleDeleteSupplier(id)}>
      <Icon {...props} name="trash-2-outline" fill="#ff3d71" />
    </TouchableOpacity>
  );

  const renderSupplier = ({ item }) => (
    <Card
      style={styles.supplierCard}
      onPress={() => {
        setSelectedSupplier(item);
        setNewSupplier({
          name: item.name,
          contact: item.contact,
          phone: item.phone,
        });
        setEditModalVisible(true);
      }}
    >
      <Layout style={styles.supplierContent}>
        <Text category="s1" style={styles.supplierName}>
          {item.name}
        </Text>
        <Text category="p2" appearance="hint">
          Contacto: {item.contact} | Teléfono: {item.phone}
        </Text>
        {renderDeleteIcon({ width: 24, height: 24 }, item.id)}
      </Layout>
    </Card>
  );

  return (
    <Layout style={styles.container}>
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
        data={filteredSuppliers}
        renderItem={renderSupplier}
        keyExtractor={(item) => item.id}
        style={styles.supplierList}
        ListEmptyComponent={
          <Text category="p1" appearance="hint" style={styles.emptyText}>
            No se encontraron proveedores.
          </Text>
        }
      />

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
            value={newSupplier.name}
            onChangeText={(text) =>
              setNewSupplier({ ...newSupplier, name: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Contacto"
            value={newSupplier.contact}
            onChangeText={(text) =>
              setNewSupplier({ ...newSupplier, contact: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Teléfono"
            value={newSupplier.phone}
            onChangeText={(text) =>
              setNewSupplier({ ...newSupplier, phone: text })
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
            <Button onPress={handleAddSupplier} style={styles.modalButton}>
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
            value={newSupplier.name}
            onChangeText={(text) =>
              setNewSupplier({ ...newSupplier, name: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Contacto"
            value={newSupplier.contact}
            onChangeText={(text) =>
              setNewSupplier({ ...newSupplier, contact: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Teléfono"
            value={newSupplier.phone}
            onChangeText={(text) =>
              setNewSupplier({ ...newSupplier, phone: text })
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
            <Button onPress={handleEditSupplier} style={styles.modalButton}>
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
    backgroundColor: "#f7f9fc",
  },
  searchInput: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  supplierList: {
    flex: 1,
  },
  supplierCard: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
    padding: 12,
  },
  supplierContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  supplierName: {
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
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
