import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SECONDARY_BLUE } from "../constants/colors";

const ButtonText = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8,
  },
  text: {
    color: SECONDARY_BLUE,
    fontWeight: "500",
    fontSize: 14,
  },
});
export default ButtonText;
