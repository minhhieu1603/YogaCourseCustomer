import { View, Text, StyleSheet, Button, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { onValue, ref, off } from 'firebase/database';
import { db } from '@/firebaseConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/constants/types';

type CoursesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Courses'>;

interface ClassItem {
  id: string;
  comments: string;
  course_id: number;
  date: string;
  teacher: string;
}

interface CourseDetailRouteParams {
  id: string;
  capacity: number;
  dateoftheweek: string;
  description: string;
  duration: number;
  priceperclass: number;
  timeofcourse: string;
  typeclass: string;
}

export default function CourseDetail() {
  const route = useRoute();
  const { id, capacity, dateoftheweek, description, duration, priceperclass, timeofcourse, typeclass } = route.params as CourseDetailRouteParams;
  const navigation = useNavigation<CoursesScreenNavigationProp>();

  const [classes, setClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    const classRef = ref(db, '/class');

    // Fetch classes from the database
    const unsubscribe = onValue(classRef, querySnapShot => {
      let data = querySnapShot.val() || {};
      let allClasses = Object.keys(data).map((key) => ({ id: key, ...data[key] })) as ClassItem[];
      // Filter classes that match the course id
      const filteredClasses = allClasses.filter(item => item.course_id === Number(id));
      setClasses(filteredClasses);
    });

    // Cleanup listener on unmount
    return () => off(classRef, 'value', unsubscribe);
  }, [id]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.title}>Course Details</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>Course ID: <Text style={styles.colorText}>{id}</Text></Text>
          <Text style={styles.detailText}>Capacity: <Text style={styles.colorText}>{capacity}</Text></Text>
          <Text style={styles.detailText}>Date of the Week: <Text style={styles.colorText}>{dateoftheweek}</Text></Text>
          <Text style={styles.detailText}>Description: <Text style={styles.colorText}>{description}</Text></Text>
          <Text style={styles.detailText}>Duration: <Text style={styles.colorText}>{duration} hours</Text></Text>
          <Text style={styles.detailText}>Price per Class: <Text style={styles.colorText}>${priceperclass}</Text></Text>
          <Text style={styles.detailText}>Time of Course: <Text style={styles.colorText}>{timeofcourse}</Text></Text>
          <Text style={styles.detailText}>Type Class: <Text style={styles.colorText}>{typeclass}</Text></Text>
        </View>

        <Text style={styles.classTitle}>Classes:</Text>
        <FlatList
          horizontal
          data={classes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate('ClassDetail', {
                  id: item.id,
                  teacher: item.teacher,
                  date: item.date,
                  comments: item.comments,
                })
              }}
              style={styles.classItem}
            >
              <View>
                <Text style={styles.classItemTitle}>Class {item.id}</Text>
                <Text style={styles.classItemText}>Teacher: {item.teacher}</Text>
                <Text style={styles.classItemText}>Date: {item.date}</Text>
              </View>
              
            </Pressable>
            
          )}
          contentContainerStyle={styles.classList}
        />
        <Pressable onPress={handleBack} style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  wrap: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detailContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  colorText: {
    color: 'red',
    fontWeight: 'bold',
  },
  classTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  classItem: {
    height: 120,
    width: 150,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  classItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
  },
  classItemText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  classList: {
    paddingBottom: 20,
    flexGrow: 1,
  },
});
