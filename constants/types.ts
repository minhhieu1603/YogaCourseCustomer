// types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

// Định nghĩa các màn hình và tham số tương ứng
export type RootStackParamList = {
  Home: undefined; // Không có tham số
  Courses: undefined; // Không có tham số
  CourseDetail: { id: string,capacity: number, dateoftheweek: string,description: string,duration:number,priceperclass:number,timeofcourse:string,typeclass:string }; // Tham số id của CourseDetail là một string
  Cart: undefined; // Không có tham số cho Cart
  ClassDetail: { id: string, teacher: string, date: string, comments: string }; // Tham số của ClassDetail
};