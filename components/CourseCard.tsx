import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const CourseCard = () => {
  const { courseId } = useLocalSearchParams();
  return (
    <View>
      <Text>Course {courseId}</Text>
    </View>
  )
}

export default CourseCard