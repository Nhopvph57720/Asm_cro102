import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigation = useNavigation();

  const apiTree = "http://192.168.1.101:3000/product_tree";
  const apiPot = "http://192.168.1.101:3000/product_pot";

  const handleSearch = async (text) => {
    setSearchText(text);

    if (text.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const [treeRes, potRes] = await Promise.all([
        axios.get(apiTree),
        axios.get(apiPot),
      ]);
      const allProducts = [...treeRes.data, ...potRes.data];

      const filteredProducts = allProducts.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );

      setSearchResults(filteredProducts);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    }
  };

  const handleSelectProduct = (product) => {
    // Thêm vào tìm kiếm gần đây
    setRecentSearches((prev) => {
      const updated = [
        product,
        ...prev.filter((item) => item.id !== product.id),
      ];
      return updated.slice(0, 5);
    });
    
    // Chuyển hướng sang trang chi tiết sản phẩm
    navigation.navigate("Detail", { product });
  };

  const removeRecentSearch = (id) => {
    setRecentSearches((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          onPress={() => handleSearch(searchText)}
          style={styles.searchButton}
        >
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tìm kiếm gần đây */}
      {recentSearches.length > 0 && (
        <View style={styles.recentSearchContainer}>
          <Text style={styles.recentTitle}>Tìm kiếm gần đây</Text>
          <FlatList
            data={recentSearches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.recentItem}
                onPress={() => handleSelectProduct(item)}
              >
                <Text style={styles.recentText}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeRecentSearch(item.id)}>
                  <MaterialIcons name="close" size={20} color="gray" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Danh sách kết quả tìm kiếm */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSelectProduct(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}đ</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    padding: 5,
  },
  recentSearchContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  recentText: {
    fontSize: 14,
    color: "#333",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "green",
  },
});