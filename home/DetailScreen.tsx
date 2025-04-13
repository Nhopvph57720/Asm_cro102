import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = ({ route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(0);
  const totalPrice = quantity * product.price;
  const navigation = useNavigation();

  const addToCart = async () => {
    try {
      let cart = await AsyncStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : [];
      
      const index = cart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        cart[index].quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      navigation.navigate("GioHang");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Kích cỡ:</Text>
          <Text style={styles.value}>{product.size}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Xuất xứ:</Text>
          <Text style={styles.value}>{product.origin}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Tình trạng:</Text>
          <Text style={styles.status}>{product.status}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(0, quantity - 1))} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.totalPrice}>Tạm tính: {totalPrice.toLocaleString()}.000đ</Text>
        <TouchableOpacity
          style={[styles.buyButton, { backgroundColor: quantity > 0 ? "#28a745" : "gray" }]}
          disabled={quantity === 0}
          onPress={addToCart}
        >
          <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
  status: {
    fontSize: 16,
    color: "#17a2b8",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 15,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc3545",
    textAlign: "center",
    marginVertical: 10,
  },
  buyButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
