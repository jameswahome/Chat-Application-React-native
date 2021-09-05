import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { PRIMARY_COLOR } from "../constants/colors";

const ButtonTouch = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: PRIMARY_COLOR,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
export default ButtonTouch;
