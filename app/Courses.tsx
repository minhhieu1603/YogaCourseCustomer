import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/constants/types';
import {
  ref,
  onValue,
} from 'firebase/database';
import { db } from '@/firebaseConfig';

type CoursesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Courses'>;
interface Course {
  capacity: number;
  dateoftheweek: string;
  description: string;
  duration: number;
  priceperclass: number;
  timeofcourse: string;
  typeclass: string;
}

const Courses = () => {
  const navigation = useNavigation<CoursesScreenNavigationProp>();
  const [courses, setCourses] = useState<{ [key: string]: Course }>({});
  const courseItems = Object.keys(courses);

  useEffect(() => {
    // Fetch courses from the database
    return onValue(ref(db, '/course'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let courseItems = { ...data };
      setCourses(courseItems);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Course List</Text>
      <FlatList
        data={courseItems}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable 
            onPress={() => navigation.navigate('CourseDetail', {
              id: item, 
              ...courses[item]
            })}
            style={styles.courseCard}
          >
            <Text style={styles.courseTitle}>Course {item}</Text>
            <Text style={styles.courseDescription}>{courses[item].description}</Text>
            <Text style={styles.courseDetails}>
              Duration: {courses[item].duration} hours | Price: ${courses[item].priceperclass}
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  courseDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  courseDetails: {
    fontSize: 14,
    color: '#888',
  },
});