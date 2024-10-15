import { View, Text, Button, StyleSheet, Alert, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

type CoursesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Courses'>;

interface ClassDetailRouteParams {
  id: string;
  comments: string;
  date: string;
  teacher: string;
}

export default function ClassDetail() {
  const route = useRoute();
  const { id, teacher, comments, date } = route.params as ClassDetailRouteParams;
  const navigation = useNavigation<CoursesScreenNavigationProp>();

  // State để theo dõi trạng thái "Like" của lớp học
  const [isLiked, setIsLiked] = useState(false);

  // Hàm để kiểm tra trạng thái "Like" của lớp học
  const checkIfClassLiked = async () => {
    const cart = await AsyncStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart) : [];
    const isClassLiked = cartItems.some((item: any) => item.id === id);
    setIsLiked(isClassLiked);
  };

  // Sử dụng useFocusEffect để kiểm tra trạng thái mỗi khi màn hình được hiển thị
  useFocusEffect(
    React.useCallback(() => {
      checkIfClassLiked();
    }, [id])
  );

  // Hàm để thêm hoặc xóa lớp học khỏi giỏ hàng
  const toggleLike = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      let cartItems = cart ? JSON.parse(cart) : [];

      if (!isLiked) {
        // Nếu chưa "Like", thêm vào giỏ hàng
        const newClass = { id, teacher, comments, date };
        cartItems.push(newClass);
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        Alert.alert('Success', 'Class liked!');
      } else {
        // Nếu đã "Like", xóa khỏi giỏ hàng
        cartItems = cartItems.filter((item: any) => item.id !== id);
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        Alert.alert('Success', 'Class unliked!');
      }

      // Cập nhật trạng thái "Like"
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
      Alert.alert('Error', 'Failed to toggle like.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Class Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Class ID: <Text style={styles.highlight}>{id}</Text></Text>
          <Text style={styles.detailText}>Teacher: <Text style={styles.highlight}>{teacher}</Text></Text>
          <Text style={styles.detailText}>Comments: <Text style={styles.highlight}>{comments}</Text></Text>
          <Text style={styles.detailText}>Date: <Text style={styles.highlight}>{date}</Text></Text>
        </View>

        <Pressable
          onPress={toggleLike}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#ddd' : '#007bff' }, // hiển thị hiệu ứng khi nhấn
          ]}
        >
          <Text style={styles.buttonText}>{isLiked ? "Unlike" : "Like"}</Text>
        </Pressable>

        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#ddd' : '#B7B7B7' }, // hiển thị hiệu ứng khi nhấn
          ]}
        >
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3, 
    width: '100%',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  highlight: {
    color: '#007bff',
  },
  button: {
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});