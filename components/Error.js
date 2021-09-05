import React from "react";
import { View, Text, StyleSheet } from "react-native";
const ErrorNotification = ({ errorNot }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorNot}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "red",
    fontWeight: "bold",
  },
  container: {
    paddingVertical: 8,
  },
});
export default ErrorNotification;
