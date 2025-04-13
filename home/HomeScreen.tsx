import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar as RNStatusBar,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

const HomeScreen = () => {
  const [productTree, setProductTree] = useState([]);
  const [productPot, setProductPot] = useState([]);
  const [productToolst, setProductToolst] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const apiTree = "http://192.168.1.101:3000/product_tree";
  const apiPot = "http://192.168.1.101:3000/product_pot";
  const apiToolst = "http://192.168.1.101:3000/product_tools";

  useEffect(() => {
    console.log("Loading...");
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    try {
      const [treeRes, potRes, toolsRes] = await Promise.all([
        axios.get(apiTree),
        axios.get(apiPot),
        axios.get(apiToolst),
      ]);
      setProductTree(treeRes.data);
      setProductPot(potRes.data);
      setProductToolst(toolsRes.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Detail", { product: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        {item.onffo && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.onffo}</Text>
          </View>
        )}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}đ</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Feather name="shopping-bag" size={16} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title, onViewMore, viewMoreText }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onViewMore}>
        <Text style={styles.viewAllText}>Xem tất cả</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.statusBarPlaceholder} />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Chào mừng đến với</Text>
          <Text style={styles.title}>Planta</Text>
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate("GioHang")}
        >
          <MaterialIcons name="shopping-cart" size={24} color="#28a745" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.bannerContainer}>
          <Image
            source={require("../assets/images/banner.png")}
            style={styles.banner}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.3)']}
            style={styles.bannerOverlay}
          >
            <Text style={styles.bannerText}>Không gian xanh cho cuộc sống</Text>
          </LinearGradient>
        </View>

        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, {backgroundColor: '#E8F5E9'}]}>
              <Feather name="leaf" size={22} color="#28a745" />
            </View>
            <Text style={styles.categoryName}>Cây cảnh</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, {backgroundColor: '#FFF3E0'}]}>
              <Feather name="box" size={22} color="#FF9800" />
            </View>
            <Text style={styles.categoryName}>Chậu cây</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, {backgroundColor: '#E3F2FD'}]}>
              <Feather name="tool" size={22} color="#2196F3" />
            </View>
            <Text style={styles.categoryName}>Dụng cụ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryItem}>
            <View style={[styles.categoryIcon, {backgroundColor: '#F3E5F5'}]}>
              <Feather name="star" size={22} color="#9C27B0" />
            </View>
            <Text style={styles.categoryName}>Khuyến mãi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <SectionHeader 
            title="Cây trồng phổ biến" 
            onViewMore={() => navigation.navigate("TreeScreen", { productTree })}
            viewMoreText="Xem thêm cây trồng"
          />
          
          <FlatList
            data={productTree.slice(0, 4)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
          />
          
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => navigation.navigate("TreeScreen", { productTree })}
          >
            <Text style={styles.viewMoreText}>Xem thêm cây trồng</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <SectionHeader 
            title="Chậu cây trồng"
            onViewMore={() => navigation.navigate("PotScreen", { productPot })} 
          />
          
          <FlatList
            data={productPot.slice(0, 4)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
          />
          
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => navigation.navigate("PotScreen", { productPot })}
          >
            <Text style={styles.viewMoreText}>Xem thêm chậu cây</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.newProductContainer}>
          <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
          <View style={styles.spNew}>
            <View style={styles.textContainer}>
              <Text style={styles.newProductTitle}>Lemon Balm Grow Kit</Text>
              <Text style={styles.newProductDescription}>
                Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta và hướng dẫn chi tiết
              </Text>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Xem ngay</Text>
              </TouchableOpacity>
            </View>
            <Image 
              source={require("../assets/images/buttonbanner.png")} 
              style={styles.newProductImage} 
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <SectionHeader 
            title="Dụng cụ làm vườn" 
            onViewMore={() => navigation.navigate("ToolsScreen", { productToolst })}
          />
          
          <FlatList
            data={productToolst.slice(0, 4)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  statusBarPlaceholder: {
    height: RNStatusBar.currentHeight || 0,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    elevation: 2,
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28a745",
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f0f8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  banner: {
    width: "100%",
    height: 200,
    borderRadius: 0,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  bannerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllText: {
    color: "#28a745",
    fontSize: 14,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  card: {
    width: cardWidth,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
    height: 40,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#28a745',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMoreButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 20,
  },
  viewMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  newProductContainer: {
    margin: 20,
    backgroundColor: "#eef7ff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  spNew: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  newProductTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  newProductDescription: {
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  newProductImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  exploreButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});