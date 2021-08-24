import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LIGHT_COLOR, SECONDARY_LIGHT } from "../constants/colors";
import { Feather as Icon } from "@expo/vector-icons";

const ProfileCard = ({ title, subTitle, create }) => {
  return (
    <View style={styles.profileCardContainer}>
      <View style={styles.avatar}>
        {create ? (
          <View style={styles.plusContainer}>
            <Icon name="plus" size={20} color={LIGHT_COLOR} />
          </View>
        ) : null}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{title} </Text>
        <Text style={styles.silent}>{subTitle} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
    backgroundColor: "grey",
  },
  profileCardContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  plusContainer: {
    backgroundColor: SECONDARY_LIGHT,
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    paddingHorizontal: 10,
  },
  silent: { color: "grey" },
  label: {
    fontSize: 16,
  },
});

export default ProfileCard;
