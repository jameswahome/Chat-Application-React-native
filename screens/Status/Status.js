import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LIGHT_COLOR, PRIMARY_COLOR } from "../../constants/colors";
import { Feather as Icon, Entypo } from "@expo/vector-icons";
import ProfileCard from "../../components/ProfileCard";

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const Status = () => {
  return (
    <View style={styles.root}>
      <ProfileCard
        create={true}
        title="My Status"
        subTitle="Tap to add status Update"
      />
      <View style={styles.section}>
        <View style={{ marginHorizontal: 10 }}>
          <Text> Recent Updates</Text>
        </View>
      </View>
      <ProfileCard
        create={false}
        title="Name Doe"
        subTitle="yesterday, 6:40 PM"
      />
      <View style={styles.floatinActionContainer}>
        <View style={styles.create}>
          <Entypo name="edit" size={25} color={PRIMARY_COLOR} />
        </View>
        <View style={styles.camera}>
          <Entypo name="camera" size={26} color={PRIMARY_COLOR} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: LIGHT_COLOR,
  },

  section: {
    backgroundColor: "gray",
    height: 30,
    justifyContent: "center",
  },
  floatinActionContainer: {
    position: "absolute",
    bottom: 10,
    right: 15,
    alignItems: "center",
  },
  create: {
    backgroundColor: LIGHT_COLOR,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowOpacity: 5,
  },
  camera: {
    marginVertical: 10,
    backgroundColor: LIGHT_COLOR,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowOpacity: 5,
  },
});
export default Status;
