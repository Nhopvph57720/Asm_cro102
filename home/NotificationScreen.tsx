import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      
      {/* Date */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Thứ tư, 03/09/2021</Text>
      </View>
      
      {/* Notification Content */}
      <ScrollView style={styles.notificationContainer}>
        <View style={styles.notificationItem}>
          <View style={styles.notificationImageContainer}>
            <Image 
              source={{ uri: 'https://s3-alpha-sig.figma.com/img/8dc1/c3fd/4c79faa42e885c9a92c6e6b29666fdf3?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FFz6vrg3heJzGqD5T~qU131PwnKSvB4lqg2RYekeI1PInWeoy727oEsEa4j0iYIFeUekAAeUd-Jr~BUR26WnQOjem0DTJ5hnbIGffF1ivFQUfainR7~WHUdafGp7x4DxSPul44D4inhAr8MGCu2REi~yOTB~LBfB2oQqDHuoojfUJZLaOuMzCw57Bwmk5D8vMqC5svJG3oe1ckk0kIJVZTFPn8ZrhrHvRW-qUXKn7SNraVmExHQix147zlNQRLDdBa8EhVvX4mLNvy1WqdpxWsvNJk1vkg4vRPTVkx7eEflHldiKc1NZY7KhOo0jOCTCjHd5kR3EqwajoyblTuGX6A__' }} 
              style={styles.placeholderImage} 
            />
          </View>
          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.successText}>Đặt hàng thành công</Text>
            </View>
            <Text style={styles.productName}>Spider Plant | Ưa bóng</Text>
            <Text style={styles.orderInfo}>2 sản phẩm</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholderRight: {
    width: 24,
  },
  dateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  notificationContainer: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  notificationImageContainer: {
    marginRight: 12,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  successText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  productName: {
    fontSize: 14,
    marginBottom: 2,
  },
  orderInfo: {
    fontSize: 13,
    color: '#666',
  },
});