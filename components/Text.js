import React from "react";
import { Text, StyleSheet } from "react-native";

const TextMessages = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {" "}
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "black",
  },
});
export default TextMessages;
