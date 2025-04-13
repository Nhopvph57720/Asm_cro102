import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView, TextInput, Alert, Modal } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

const UserScreen = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false);
  const [showPlantGuide, setShowPlantGuide] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [showBasicInfo, setShowBasicInfo] = useState(false);
  const [showStages, setShowStages] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    name: "Trần Minh Trí",
    email: "tranminhtri@gmail.com",
    address: "60 Láng Hạ, Ba Đình, Hà Nội",
    phone: "0123456789"
  });
  
  const [editedInfo, setEditedInfo] = useState({...userInfo});
  
  // Danh sách cây trồng mẫu
  const plantGuides = [
    {
      id: 1,
      name: "Panse Den",
      type: "Hybrid",
      image: "https://s3-alpha-sig.figma.com/img/8dc1/c3fd/4c79faa42e885c9a92c6e6b29666fdf3?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FFz6vrg3heJzGqD5T~qU131PwnKSvB4lqg2RYekeI1PInWeoy727oEsEa4j0iYIFeUekAAeUd-Jr~BUR26WnQOjem0DTJ5hnbIGffF1ivFQUfainR7~WHUdafGp7x4DxSPul44D4inhAr8MGCu2REi~yOTB~LBfB2oQqDHuoojfUJZLaOuMzCw57Bwmk5D8vMqC5svJG3oe1ckk0kIJVZTFPn8ZrhrHvRW-qUXKn7SNraVmExHQix147zlNQRLDdBa8EhVvX4mLNvy1WqdpxWsvNJk1vkg4vRPTVkx7eEflHldiKc1NZY7KhOo0jOCTCjHd5kR3EqwajoyblTuGX6A__",
      basicInfo: "Cây trồng trong nhà phổ biến, dễ chăm sóc. Cây ưa ánh sáng tán xạ, không cần tưới nước quá nhiều. Phù hợp đặt ở các vị trí như bàn làm việc, kệ sách, và có tác dụng thanh lọc không khí rất tốt.",
      stages: [
        { name: "Cây trồng", description: "Giai đoạn cây mới trồng, cần đảm bảo đất đủ ẩm nhưng không quá ướt. Đặt ở nơi có ánh sáng nhẹ." },
        { name: "Ưu bông", description: "Giai đoạn cây phát triển hoa. Cần cung cấp đủ ánh sáng và phân bón phù hợp để hoa phát triển tốt." }
      ]
    },
    {
      id: 2,
      name: "Cây Lan Ý",
      type: "Nội thất",
      image: "https://th.bing.com/th/id/OIP.m1LKkYMBPrHlUR1lP8N-LwHaHa?rs=1&pid=ImgDetMain",
      basicInfo: "Cây phù hợp trồng trong nhà, thanh lọc không khí. Lan Ý có khả năng chịu bóng tốt, phù hợp với điều kiện trong nhà. Lá cây to, xanh mướt tạo cảm giác mát mẻ và trong lành.",
      stages: [
        { name: "Cây trồng", description: "Giai đoạn cây mới trồng, cần đảm bảo đất thoáng và giữ độ ẩm vừa phải." },
        { name: "Tưới nước", description: "Giai đoạn cây cần nước, thường tưới 1-2 lần/tuần tùy vào điều kiện thời tiết." }
      ]
    },
    {
      id: 3,
      name: "Xương Rồng",
      type: "Sa mạc",
      image: "https://sfarm.vn/wp-content/uploads/2021/09/cay-hoa-xuong-rong-8.png",
      basicInfo: "Cây cảnh ít nước, thích hợp với người bận rộn. Xương rồng thích hợp với khí hậu khô, ít mưa. Cây này rất dễ chăm sóc và ít đòi hỏi sự chú ý thường xuyên.",
      stages: [
        { name: "Cây trồng", description: "Giai đoạn cây mới trồng, cần đất cát thoáng, ít nước. Tránh ánh nắng trực tiếp trong những ngày đầu." },
        { name: "Phát triển", description: "Giai đoạn cây trưởng thành, cần ánh sáng đầy đủ và chỉ tưới nước khi đất khô hoàn toàn." }
      ]
    }
  ];
  
  const handleInputChange = (field, value) => {
    setEditedInfo({...editedInfo, [field]: value});
  };
  
  const handleSave = () => {
    setUserInfo({...editedInfo});
    Alert.alert("Thông báo", "Đã lưu thông tin thành công!");
    setEditMode(false);
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Xác nhận đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Đăng xuất",
          onPress: () => {
            // Chuyển đến màn hình đăng nhập
            // Giả định navigation từ props
            if (navigation) {
              navigation.navigate('Login');
            } else {
              Alert.alert("Thông báo", "Đã đăng xuất thành công!");
            }
          }
        }
      ]
    );
  };
  
  const openPlantGuide = () => {
    setSelectedPlant(plantGuides[0]);
    setCurrentPlantIndex(0);
    setShowPlantGuide(true);
    // Reset trạng thái hiển thị khi mở cẩm nang mới
    setShowBasicInfo(false);
    setShowStages(false);
  };
  
  const nextPlant = () => {
    const nextIndex = (currentPlantIndex + 1) % plantGuides.length;
    setCurrentPlantIndex(nextIndex);
    setSelectedPlant(plantGuides[nextIndex]);
    // Reset trạng thái hiển thị khi chuyển sang cây khác
    setShowBasicInfo(false);
    setShowStages(false);
  };
  
  const prevPlant = () => {
    const prevIndex = (currentPlantIndex - 1 + plantGuides.length) % plantGuides.length;
    setCurrentPlantIndex(prevIndex);
    setSelectedPlant(plantGuides[prevIndex]);
    // Reset trạng thái hiển thị khi chuyển sang cây khác
    setShowBasicInfo(false);
    setShowStages(false);
  };
  
  // Màn hình Cẩm nang trồng cây
  const PlantGuideScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.editHeader}>
          <TouchableOpacity onPress={() => setShowPlantGuide(false)}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.editTitle}>{selectedPlant?.name || "Panse Den"}</Text>
          <View style={styles.spacer} />
        </View>
        
        <ScrollView style={styles.editContent}>
          <View style={styles.plantImageContainer}>
            <TouchableOpacity style={styles.arrowButton} onPress={prevPlant}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            
            <Image 
              source={{ uri: selectedPlant?.image || 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/anh-avatar-sieu-hai-huoc.jpg' }} 
              style={styles.plantImage} 
            />
            
            <TouchableOpacity style={styles.arrowButton} onPress={nextPlant}>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.plantActionButtons}>
            <TouchableOpacity style={styles.plantActionButton}>
              <Text style={styles.plantActionButtonText}>Cây trồng</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.plantActionButton, styles.plantActionButtonLight]}>
              <Text style={styles.plantActionButtonTextLight}>Ưu bông</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.infoSection}
            onPress={() => setShowBasicInfo(!showBasicInfo)}
          >
            <View style={styles.infoSectionHeader}>
              <Text style={styles.infoSectionTitle}>Kiến thức cơ bản</Text>
              <Ionicons name={showBasicInfo ? "remove" : "add"} size={24} color="black" />
            </View>
            <View style={styles.divider} />
          </TouchableOpacity>
          
          {showBasicInfo && (
            <View style={styles.expandedContent}>
              <Text style={styles.expandedText}>{selectedPlant?.basicInfo}</Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.infoSection}
            onPress={() => setShowStages(!showStages)}
          >
            <View style={styles.infoSectionHeader}>
              <Text style={styles.infoSectionTitle}>Các giai đoạn</Text>
              <Ionicons name={showStages ? "remove" : "add"} size={24} color="black" />
            </View>
            <View style={styles.divider} />
          </TouchableOpacity>
          
          {showStages && selectedPlant?.stages?.map((stage, index) => (
            <View key={index} style={styles.stageCard}>
              <Text style={styles.stageName}>{stage.name}</Text>
              <Text style={styles.stageDescription}>{stage.description}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  // Kiểm tra màn hình hiển thị
  if (showPlantGuide) {
    return <PlantGuideScreen />;
  }
  
  if (!editMode) {
    // Màn hình profile
    return (
      <SafeAreaView style={styles.container}>

        
        <ScrollView style={styles.content}>
          <View style={styles.profileSection}>
            <Image source={{ uri: 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/anh-avatar-sieu-hai-huoc.jpg' }}
              style={styles.avatar} 
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userEmail}>{userInfo.email}</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Chung</Text>
          <View style={styles.divider} />
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              setEditedInfo({...userInfo});
              setEditMode(true);
            }}
          >
            <View style={styles.menuItemContent}>
              <Text>Chỉnh sửa thông tin</Text>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={openPlantGuide}
          >
            <View style={styles.menuItemContent}>
              <Text>Cẩm nang trồng cây</Text>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Text>Lịch sử giao dịch</Text>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Text>Q & A</Text>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </View>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Text>Bảo mật và Điều khoản</Text>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Text>Điều khoản và điều kiện</Text>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Text>Chính sách quyền riêng tư</Text>
              <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    // Màn hình chỉnh sửa thông tin
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.editHeader}>
          <TouchableOpacity onPress={() => setEditMode(false)}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.editTitle}>CHỈNH SỬA THÔNG TIN</Text>
          <View style={styles.spacer} />
        </View>
        
        <ScrollView style={styles.editContent}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/anh-avatar-sieu-hai-huoc.jpg' }} 
              style={styles.editAvatar} 
            />
            <TouchableOpacity style={styles.changeAvatarButton}>
              <Text style={styles.changeAvatarText}>Thay đổi ảnh</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.instruction}>
            Thông tin sẽ được lưu cho lần mua kế tiếp.{'\n'}
            Chỉnh sửa thông tin chi tiết của bạn dưới đây.
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Họ tên</Text>
            <TextInput
              style={styles.textInput}
              value={editedInfo.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Nhập họ tên"
            />
            <View style={styles.divider} />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={editedInfo.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="Nhập email"
              keyboardType="email-address"
            />
            <View style={styles.divider} />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Địa chỉ</Text>
            <TextInput
              style={styles.textInput}
              value={editedInfo.address}
              onChangeText={(text) => handleInputChange('address', text)}
              placeholder="Nhập địa chỉ"
            />
            <View style={styles.divider} />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              style={styles.textInput}
              value={editedInfo.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
            />
            <View style={styles.divider} />
          </View>
          
          <TouchableOpacity 
            style={[styles.saveButton, {backgroundColor: "#4CAF50"}]} 
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>LƯU THÔNG TIN</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#777",
  },
  sectionTitle: {
    marginTop: 10,
    color: "#777",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutButton: {
    paddingVertical: 12,
  },
  logoutText: {
    color: "red",
  },
  // Styles cho màn hình chỉnh sửa
  editHeader: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  editTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  spacer: {
    width: 24, // Để cân bằng với nút back bên trái
  },
  editContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  editAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarText: {
    color: "#4CAF50",
    fontSize: 14,
  },
  instruction: {
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  textInput: {
    paddingVertical: 8,
    fontSize: 16,
  },
  saveButton: {
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    elevation: 2,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Styles cho màn hình Cẩm nang trồng cây
  plantImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  plantImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  arrowButton: {
    padding: 10,
  },
  plantActionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  plantActionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  plantActionButtonLight: {
    backgroundColor: '#e0e0e0',
  },
  plantActionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  plantActionButtonTextLight: {
    color: '#666',
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 15,
  },
  infoSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stageCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  stageName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stageDescription: {
    color: '#666',
  },
  // Thêm styles mới cho nội dung mở rộng
  expandedContent: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  expandedText: {
    color: '#666',
    lineHeight: 20,
  }
});