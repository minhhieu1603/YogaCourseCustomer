import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Classes() {
  return (
    <View style={styles.container}>
      <Text>Classes</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});