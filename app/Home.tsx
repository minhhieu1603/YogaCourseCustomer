import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CourseDetail from './CourseDetail';
import ClassDetail from './ClassDetail';
import Courses from './Courses';
import Cart from './Cart';

export default function Home() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Courses" component={Courses} />
            <Stack.Screen name="CourseDetail" component={CourseDetail} />
            <Stack.Screen name="ClassDetail" component={ClassDetail} />
            <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
    )}