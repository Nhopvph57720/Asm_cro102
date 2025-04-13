import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const PayScreen = () => {
  const navigation = useNavigation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("fast");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit_card");
  const [shippingFee, setShippingFee] = useState(15000);
  const [totalPrice, setTotalPrice] = useState(0);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [estimatedDelivery, setEstimatedDelivery] = useState("5-7");
  
  const [fullName, setFullName] = useState("Trần Minh Trí");
  const [email, setEmail] = useState("tranminhtri@gmail.com");
  const [phone, setPhone] = useState("0123456789");
  const [address, setAddress] = useState("60 Láng Hạ, Ba Đình, Hà Nội");

  const cartItems = [
    { id: 1, name: "Cây Trúc Bách Hợp", price: 250000, quantity: 1 },
    { id: 2, name: "Chậu Gốm Tròn Medium", price: 180000, quantity: 1 },
    { id: 3, name: "Phân bón hữu cơ Planta", price: 85000, quantity: 1 },
  ];

  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(subtotal + shippingFee);
    
    // Kiểm tra form hợp lệ
    if (fullName && email && phone && address) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    
    // Set thời gian giao hàng dự kiến
    setEstimatedDelivery(selectedShipping === "fast" ? "2-3" : "5-7");
  }, [fullName, email, phone, address, shippingFee, selectedShipping]);

  const handleShippingSelect = (method) => {
    setSelectedShipping(method);
    setShippingFee(method === "fast" ? 30000 : 15000);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSubmit = () => {
    if (isFormValid) {
      setSuccessModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#777" style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="Họ tên" 
              value={fullName} 
              onChangeText={setFullName} 
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#777" style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="Email" 
              value={email} 
              onChangeText={setEmail} 
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Feather name="phone" size={20} color="#777" style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="Số điện thoại" 
              value={phone} 
              onChangeText={setPhone} 
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Feather name="map-pin" size={20} color="#777" style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="Địa chỉ" 
              value={address} 
              onChangeText={setAddress} 
            />
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
          
          <TouchableOpacity
            style={[styles.option, selectedShipping === "slow" && styles.selectedOption]}
            onPress={() => handleShippingSelect("slow")}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Giao hàng tiêu chuẩn</Text>
                <Text style={styles.optionSubtitle}>Dự kiến giao hàng: 5-7 ngày</Text>
              </View>
              <Text style={styles.optionPrice}>15.000đ</Text>
            </View>
            {selectedShipping === "slow" && (
              <MaterialIcons name="check-circle" size={24} color="#28a745" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.option, selectedShipping === "fast" && styles.selectedOption]}
            onPress={() => handleShippingSelect("fast")}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Giao hàng nhanh</Text>
                <Text style={styles.optionSubtitle}>Dự kiến giao hàng: 2-3 ngày</Text>
              </View>
              <Text style={styles.optionPrice}>30.000đ</Text>
            </View>
            {selectedShipping === "fast" && (
              <MaterialIcons name="check-circle" size={24} color="#28a745" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          
          <TouchableOpacity
            style={[styles.option, selectedPaymentMethod === "credit_card" && styles.selectedOption]}
            onPress={() => handlePaymentSelect("credit_card")}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Thẻ tín dụng/ghi nợ</Text>
                <Text style={styles.optionSubtitle}>VISA, MASTERCARD, JCB</Text>
              </View>
              <Feather name="credit-card" size={24} color="#777" />
            </View>
            {selectedPaymentMethod === "credit_card" && (
              <MaterialIcons name="check-circle" size={24} color="#28a745" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.option, selectedPaymentMethod === "bank_transfer" && styles.selectedOption]}
            onPress={() => handlePaymentSelect("bank_transfer")}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Chuyển khoản ngân hàng</Text>
                <Text style={styles.optionSubtitle}>Internet Banking, Mobile Banking</Text>
              </View>
              <Feather name="smartphone" size={24} color="#777" />
            </View>
            {selectedPaymentMethod === "bank_transfer" && (
              <MaterialIcons name="check-circle" size={24} color="#28a745" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.option, selectedPaymentMethod === "cod" && styles.selectedOption]}
            onPress={() => handlePaymentSelect("cod")}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Thanh toán khi nhận hàng</Text>
                <Text style={styles.optionSubtitle}>COD - Cash On Delivery</Text>
              </View>
              <Feather name="dollar-sign" size={24} color="#777" />
            </View>
            {selectedPaymentMethod === "cod" && (
              <MaterialIcons name="check-circle" size={24} color="#28a745" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tổng đơn hàng</Text>
          
          <View style={styles.orderSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính</Text>
              <Text style={styles.summaryValue}>{formatPrice(totalPrice - shippingFee)}đ</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
              <Text style={styles.summaryValue}>{formatPrice(shippingFee)}đ</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Tổng thanh toán</Text>
              <Text style={styles.totalValue}>{formatPrice(totalPrice)}đ</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerTotalLabel}>Tổng cộng</Text>
          <Text style={styles.footerTotalValue}>{formatPrice(totalPrice)}đ</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.payButton, !isFormValid && styles.payButtonDisabled]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.payButtonText}>Thanh toán ngay</Text>
        </TouchableOpacity>
      </View>
      
      {/* Modal Thông báo đặt hàng thành công */}
      <Modal
        visible={successModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Feather name="arrow-left" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>THÔNG BÁO</Text>
              <View style={{width: 24}} />
            </View>
            
            <View style={styles.successMessage}>
              <Text style={styles.successText}>Bạn đã đặt hàng thành công</Text>
            </View>
            
            <View style={styles.orderInfoContainer}>
              <Text style={styles.orderInfoTitle}>Thông tin khách hàng</Text>
              <View style={styles.divider} />
              <Text style={styles.orderInfoText}>{fullName}</Text>
              <Text style={styles.orderInfoText}>{email}</Text>
              <Text style={styles.orderInfoText}>{address}</Text>
              <Text style={styles.orderInfoText}>{phone}</Text>
              
              <Text style={[styles.orderInfoTitle, {marginTop: 20}]}>Phương thức vận chuyển</Text>
              <View style={styles.divider} />
              <Text style={styles.orderInfoText}>
                {selectedShipping === "fast" ? "Giao hàng Nhanh - 30.000đ" : "Giao hàng Tiêu chuẩn - 15.000đ"}
              </Text>
              <Text style={styles.orderInfoText}>(Dự kiến giao hàng: {estimatedDelivery} ngày)</Text>
              
              <Text style={[styles.orderInfoTitle, {marginTop: 20}]}>Hình thức thanh toán</Text>
              <View style={styles.divider} />
              <Text style={styles.orderInfoText}>
                {selectedPaymentMethod === "credit_card" 
                  ? "Thẻ VISA/MASTERCARD" 
                  : selectedPaymentMethod === "bank_transfer" 
                    ? "Chuyển khoản ngân hàng" 
                    : "Thanh toán khi nhận hàng"}
              </Text>
              
              <Text style={[styles.orderInfoTitle, {marginTop: 20}]}>Đơn hàng đã chọn</Text>
              <View style={styles.divider} />
              {cartItems.map(item => (
                <View key={item.id} style={styles.cartItemRow}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>{formatPrice(item.price)}đ</Text>
                </View>
              ))}
              
              <View style={[styles.divider, {marginTop: 10}]} />
              
              <View style={styles.totalRow}>
                <Text style={styles.totalPaidLabel}>Đã thanh toán</Text>
                <Text style={styles.totalPaidValue}>{formatPrice(totalPrice)}đ</Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => {
                setSuccessModalVisible(false);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.viewMoreButtonText}>Xem Cảm nang trồng cây</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                setSuccessModalVisible(false);
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.homeButtonText}>Quay về Trang chủ</Text>
            </TouchableOpacity>
            
            <View style={styles.indicator} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 46,
    color: "#333",
    fontSize: 15,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#fff",
    position: "relative",
  },
  selectedOption: {
    borderColor: "#28a745",
    backgroundColor: "#f0f9f2",
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 13,
    color: "#777",
  },
  optionPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  checkIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  orderSummary: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalContainer: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: 13,
    color: "#777",
  },
  footerTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
  },
  payButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 15,
  },
  payButtonDisabled: {
    backgroundColor: "#a0d8b3",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalContent: {
    flex: 1,
    position: "relative",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  successMessage: {
    alignItems: "center",
    paddingVertical: 20,
  },
  successText: {
    fontSize: 16,
    color: "#28a745",
    fontWeight: "600",
  },
  orderInfoContainer: {
    paddingHorizontal: 20,
  },
  orderInfoTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  orderInfoText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  cartItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cartItemName: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalPaidLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  totalPaidValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
  },
  viewMoreButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 30,
    alignItems: "center",
  },
  viewMoreButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  homeButton: {
    padding: 15,
    marginHorizontal: 20,
    marginTop: 15,
    alignItems: "center",
  },
  homeButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  indicator: {
    width: 60,
    height: 5,
    backgroundColor: "#ddd",
    borderRadius: 3,
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
});

export default PayScreen;