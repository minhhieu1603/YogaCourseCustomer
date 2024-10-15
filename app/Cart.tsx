import { View, Text, StyleSheet, FlatList, Button, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CartItem {
  id: string;
  teacher: string;
  comments: string;
  course_id: number;
  date: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadCart = async () => {
        try {
          const cart = await AsyncStorage.getItem('cart');
          if (cart) {
            setCartItems(JSON.parse(cart));
          }
        } catch (error) {
          console.error('Error loading cart:', error);
          Alert.alert('Error', 'Failed to load cart.');
        }
      };

      loadCart();

      // Cleanup function (optional)
      return () => {
        // Any cleanup logic if needed
      };
    }, [])
  );

  const handleRemoveItem = async (id: string) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
      Alert.alert('Success', 'Class removed from cart!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      Alert.alert('Error', 'Failed to remove item from cart.');
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.classItem}>
      <Text>Class ID: {item.id}</Text>
      <Text>Teacher: {item.teacher}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Comments: {item.comments}</Text>
      <Pressable onPress={() => handleRemoveItem(item.id)} style={styles.button}>
        <Text style={styles.buttonText}>Remove</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartItems.length === 0 ? (
        <Text>No items in cart.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  classItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
