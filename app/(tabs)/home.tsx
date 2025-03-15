import React, { useState } from "react";
import {
  Layout,
  Text,
  Input,
  Button,
  Card,
  Toggle,
  CheckBox,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { FlatList, ScrollView, Alert, StyleSheet } from "react-native";

export default function HomeScreen() {
  // Estados
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [paymentMethods, setPaymentMethods] = useState({
    efectivo: false,
    debito: false,
    credito: false,
    transferencia: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [electronicInvoice, setElectronicInvoice] = useState(false);
  const [name, setName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [taxRegime, setTaxRegime] = useState(new IndexPath(0));
  const [paymentAmount, setPaymentAmount] = useState("");

  const [productsInCart, setProductsInCart] = useState([]);

  // Lista de productos simulada
  const products = [
    { id: "1", name: "Producto A", price: 10 },
    { id: "2", name: "Producto B", price: 20 },
    { id: "3", name: "Producto C", price: 30 },
  ];

  // Opciones para Select
  const taxRegimeOptions = ["Persona Natural", "Persona Jurídica"];

  // Función para buscar productos
  const handleSearch = () => {
    const foundProduct = products.find((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (foundProduct) {
      setSelectedProduct(foundProduct);
      setTotalPrice(foundProduct.price * (parseInt(quantity) || 1));
    } else {
      Alert.alert(
        "Producto no encontrado",
        "No se encontró ningún producto con ese nombre."
      );
    }
  };

  // Calcular precio total
  const calculateTotalPrice = (newQuantity) => {
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * newQuantity);
    }
  };

  // Agregar producto al carrito
  const addProductToCart = () => {
    const qty = parseInt(quantity) || 1;
    if (selectedProduct) {
      const product = { ...selectedProduct, quantity: qty };
      setProductsInCart([...productsInCart, product]);
      setSelectedProduct(null);
      setQuantity("1");
      setSearchQuery("");
      Alert.alert(
        "Producto agregado",
        `${product.name} ha sido agregado al carrito.`
      );
    } else {
      Alert.alert("Error", "No hay producto seleccionado para agregar.");
    }
  };

  // Eliminar producto del carrito
  const removeProductFromCart = (id) => {
    setProductsInCart(productsInCart.filter((product) => product.id !== id));
    Alert.alert(
      "Producto eliminado",
      "El producto ha sido eliminado del carrito."
    );
  };

  // Renderizar producto en la lista de productos
  const renderProduct = ({ item }) => (
    <Card
      style={styles.productCard}
      onPress={() => {
        setSelectedProduct(item);
        setTotalPrice(item.price * (parseInt(quantity, 10) || 1));
      }}
    >
      <Text category="s1" style={styles.productName}>
        {item.name}
      </Text>
      <Text category="p2" appearance="hint">
        Código: {item.id}
      </Text>
      <Text category="s2" style={styles.productPrice}>
        ${item.price.toFixed(2)}
      </Text>
    </Card>
  );

  // Renderizar producto en el carrito
  const renderCartItem = ({ item }) => (
    <Card style={styles.cartItem}>
      <Layout style={styles.cartItemContent}>
        <Text category="s1" style={styles.cartItemName}>
          {item.name}
        </Text>
        <Text category="p2" appearance="hint">
          Cantidad: {item.quantity} | Precio: ${item.price.toFixed(2)}
        </Text>
        <Button
          style={styles.removeButton}
          status="danger"
          size="tiny"
          onPress={() => removeProductFromCart(item.id)}
        >
          Eliminar
        </Button>
      </Layout>
    </Card>
  );

  // Renderizar el botón de búsqueda como accesorio
  const renderSearchButton = () => (
    <Button
      size="small"
      onPress={handleSearch} // Aseguramos que sea una referencia a la función
      style={styles.searchButton}
    >
      Buscar
    </Button>
  );

  // Renderizar los checkboxes de métodos de pago
  const renderPaymentMethodCheckboxes = () => (
    <Layout style={styles.paymentMethodsContainer}>
      {Object.keys(paymentMethods).map((method) => (
        <CheckBox
          key={method}
          checked={paymentMethods[method]}
          onChange={(checked) =>
            setPaymentMethods((prevState) => ({
              ...prevState,
              [method]: checked,
            }))
          }
          style={styles.paymentMethodCheckbox}
        >
          {method.charAt(0).toUpperCase() + method.slice(1)}
        </CheckBox>
      ))}
    </Layout>
  );

  return (
    <Layout style={styles.container}>
      {/* Búsqueda */}
      <Layout style={styles.searchContainer}>
        <Input
          placeholder="Buscar producto..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          accessoryRight={renderSearchButton} // Usamos una función separada
        />
      </Layout>

      {/* Lista de productos */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        style={styles.productList}
      />

      {/* Selección de cantidad */}
      {selectedProduct && (
        <Layout style={styles.quantityContainer}>
          <Text category="label" style={styles.quantityLabel}>
            Cantidad:
          </Text>
          <Input
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity}
            onChangeText={(text) => {
              setQuantity(text);
              calculateTotalPrice(parseInt(text, 10) || 1);
            }}
          />
          <Button
            style={styles.addButton}
            onPress={addProductToCart}
            appearance="filled"
          >
            Agregar
          </Button>
        </Layout>
      )}

      {/* Lista de productos en el carrito */}
      <Text category="h6" style={styles.cartTitle}>
        Productos en el carrito:
      </Text>
      <FlatList
        data={productsInCart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        style={styles.cartList}
        ListEmptyComponent={
          <Text category="p1" appearance="hint" style={styles.emptyText}>
            No hay productos en el carrito.
          </Text>
        }
      />

      {/* Contenedor inferior */}
      <ScrollView contentContainerStyle={styles.bottomContainer}>
        {/* Medio de pago */}
        <Layout style={styles.section}>
          <Text category="label" style={styles.sectionLabel}>
            Medio de pago:
          </Text>
          {renderPaymentMethodCheckboxes()}
        </Layout>

        {/* Monto entregado (si es efectivo) */}
        {paymentMethods.efectivo && (
          <Layout style={styles.section}>
            <Input
              placeholder="Valor entregado"
              value={paymentAmount.toString()}
              onChangeText={(text) =>
                setPaymentAmount(text.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              style={styles.input}
            />
            <Text category="s1" style={styles.changeText}>
              Cambio: $
              {(parseFloat(paymentAmount || 0) - totalPrice).toFixed(2)}
            </Text>
          </Layout>
        )}

        {/* Facturación electrónica */}
        <Layout style={styles.section}>
          <Text category="label" style={styles.sectionLabel}>
            Facturación Electrónica:
          </Text>
          <Toggle
            checked={electronicInvoice}
            onChange={(value) => setElectronicInvoice(value)}
          />
        </Layout>

        {/* Campos de facturación */}
        {electronicInvoice && (
          <Layout style={styles.invoiceFields}>
            <Input
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Input
              placeholder="N. Documento"
              value={documentNumber}
              onChangeText={setDocumentNumber}
              keyboardType="numeric"
              style={styles.input}
            />
            <Input
              placeholder="Celular"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <Input
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />
            <Text category="label" style={styles.sectionLabel}>
              Régimen Tributario:
            </Text>
            <Select
              value={taxRegimeOptions[taxRegime.row]}
              selectedIndex={taxRegime}
              onSelect={(index) => setTaxRegime(index)}
              style={styles.select}
            >
              {taxRegimeOptions.map((option, index) => (
                <SelectItem key={index} title={option} />
              ))}
            </Select>
          </Layout>
        )}
      </ScrollView>
      {/* Precio final */}
      <Layout style={styles.totalContainer}>
        <Text category="h6" style={styles.totalLabel}>
          Precio final:
        </Text>
        <Text category="h4" status="success">
          ${totalPrice.toFixed(2)}
        </Text>
      </Layout>
    </Layout>
  );
}

// Estilos personalizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f9fc",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderRadius: 12,
  },
  searchButton: {
    marginLeft: 8,
    borderRadius: 8,
  },
  productList: {
    marginBottom: 16,
  },
  productCard: {
    marginBottom: 12,
    borderRadius: 12,
    padding: 8,
    backgroundColor: "#fff",
    elevation: 3,
  },
  productName: {
    fontWeight: "bold",
    color: "#222",
  },
  productPrice: {
    color: "#3366ff",
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityLabel: {
    marginRight: 8,
  },
  quantityInput: {
    width: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  addButton: {
    borderRadius: 8,
  },
  cartTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  cartList: {
    marginBottom: 16,
  },
  cartItem: {
    marginBottom: 12,
    borderRadius: 12,
    padding: 8,
    backgroundColor: "#fff",
    elevation: 3,
  },
  cartItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartItemName: {
    fontWeight: "bold",
    color: "#222",
  },
  removeButton: {
    borderRadius: 8,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    paddingBottom: 100, // Añadimos espacio inferior para evitar que la barra de tabs cubra los elementos
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    marginBottom: 8,
  },
  paymentMethodsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  paymentMethodCheckbox: {
    marginRight: 8,
    marginBottom: 8,
  },
  select: {
    borderRadius: 8,
  },
  input: {
    marginBottom: 15,
    borderRadius: 8,
  },
  changeText: {
    marginTop: 8,
    color: "#28a745",
  },
  invoiceFields: {
    marginBottom: 16,
  },
  totalContainer: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  totalLabel: {
    marginBottom: 10,
  },
});
