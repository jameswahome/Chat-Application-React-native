import React from "react";
import { Text, StyleSheet } from "react-native";

const HeadingLogin = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {" "}
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    color: "black",
  },
});
export default HeadingLogin;
