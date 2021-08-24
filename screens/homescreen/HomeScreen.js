import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.homeScreenRoot}>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreenRoot: {
    flex: 1,
  },
});

export default HomeScreen;
