import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  return (
    <View style={styles.container}>
      <Text>App</Text>
      <Text>React Native with Expo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
