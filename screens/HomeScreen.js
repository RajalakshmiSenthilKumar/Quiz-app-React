import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from "../components/LandingPage";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Build Your knowledge</Text>
      <LandingPage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
