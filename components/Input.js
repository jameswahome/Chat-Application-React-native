import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputText = ({ style, ...props }) => {
  return <TextInput {...props} style={[styles.input, style]} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#e8e8e8",
    width: "100%",
    padding: 15,
    borderRadius: 8,
  },
});
export default InputText;
