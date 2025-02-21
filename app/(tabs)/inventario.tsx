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

export default function InventoryScreen() {
  const [products, setProducts] = useState([
    { id: "1", name: "Producto A", price: 10, stock: 50 },
    { id: "2", name: "Producto B", price: 20, stock: 30 },
    { id: "3", name: "Producto C", price: 30, stock: 20 },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0 || newProduct.stock < 0) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos correctamente."
      );
      return;
    }
    const product = {
      id: Date.now().toString(),
      ...newProduct,
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", price: 0, stock: 0 });
    setAddModalVisible(false);
    Alert.alert("Éxito", "Producto agregado al inventario.");
  };

  const handleEditProduct = () => {
    if (!newProduct.name || newProduct.price <= 0 || newProduct.stock < 0) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos correctamente."
      );
      return;
    }
    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id ? { ...p, ...newProduct } : p
    );
    setProducts(updatedProducts);
    setNewProduct({ name: "", price: 0, stock: 0 });
    setEditModalVisible(false);
    setSelectedProduct(null);
    Alert.alert("Éxito", "Producto modificado correctamente.");
  };

  const handleDeleteProduct = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que quieres eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setProducts(products.filter((p) => p.id !== id));
            Alert.alert("Éxito", "Producto eliminado.");
          },
        },
      ]
    );
  };

  const renderDeleteIcon = (props, id) => (
    <TouchableOpacity onPress={() => handleDeleteProduct(id)}>
      <Icon {...props} name="trash-2-outline" fill="#ff3d71" />
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <Card
      style={styles.productCard}
      onPress={() => {
        setSelectedProduct(item);
        setNewProduct({
          name: item.name,
          price: item.price,
          stock: item.stock,
        });
        setEditModalVisible(true);
      }}
    >
      <Layout style={styles.productContent}>
        <Text category="s1" style={styles.productName}>
          {item.name}
        </Text>
        <Text category="p2" appearance="hint">
          Precio: ${item.price.toFixed(2)} | Stock: {item.stock}
        </Text>
        {renderDeleteIcon({ width: 24, height: 24 }, item.id)}
      </Layout>
    </Card>
  );

  return (
    <Layout style={styles.container}>
      <Input
        placeholder="Buscar producto..."
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
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        style={styles.productList}
        ListEmptyComponent={
          <Text category="p1" appearance="hint" style={styles.emptyText}>
            No se encontraron productos.
          </Text>
        }
      />

      <Button
        style={styles.addButton}
        status="success"
        accessoryLeft={(props) => <Icon {...props} name="plus-outline" />}
        onPress={() => setAddModalVisible(true)}
      >
        Agregar Producto
      </Button>

      <Modal
        visible={isAddModalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setAddModalVisible(false)}
      >
        <Card disabled style={styles.modalCard}>
          <Text category="h6" style={styles.modalTitle}>
            Nuevo Producto
          </Text>
          <Input
            placeholder="Nombre"
            value={newProduct.name}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, name: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Precio"
            value={newProduct.price.toString()}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, price: parseFloat(text) || 0 })
            }
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Stock"
            value={newProduct.stock.toString()}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, stock: parseInt(text, 10) || 0 })
            }
            keyboardType="numeric"
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
            <Button onPress={handleAddProduct} style={styles.modalButton}>
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
            Editar Producto
          </Text>
          <Input
            placeholder="Nombre"
            value={newProduct.name}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, name: text })
            }
            style={styles.modalInput}
          />
          <Input
            placeholder="Precio"
            value={newProduct.price.toString()}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, price: parseFloat(text) || 0 })
            }
            keyboardType="numeric"
            style={styles.modalInput}
          />
          <Input
            placeholder="Stock"
            value={newProduct.stock.toString()}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, stock: parseInt(text, 10) || 0 })
            }
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
            <Button onPress={handleEditProduct} style={styles.modalButton}>
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
  productList: {
    flex: 1,
  },
  productCard: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
    padding: 12,
  },
  productContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  productName: {
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
