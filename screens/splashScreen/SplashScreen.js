import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { PRIMARY_COLOR } from "../../constants/colors";

const SplashScreen = ({ loading }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>A Chat Application</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
});
export default SplashScreen;
