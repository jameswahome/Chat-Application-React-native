import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { SECONDARY_LIGHT } from "../constants/colors";

const Loading = ({ loading }) => {
  if (!loading) {
    return <View />;
  }
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <ActivityIndicator color={SECONDARY_LIGHT} size="large" />
        <Text style={styles.text}> Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  text: {
    marginTop: 8,
    marginLeft: 4,
    fontSize: 18,
    fontWeight: "500",
  },
});
export default Loading;
