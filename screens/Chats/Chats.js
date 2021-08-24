import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { userList } from "../../services/data.json";
import { Feather as Icon } from "@expo/vector-icons";
import { LIGHT_COLOR, SECONDARY_BLUE } from "../../constants/colors";
const { width: wWidth, height: wHeight } = Dimensions.get("window");

const Chats = () => {
  //render the chat screen recent conversations
  const renderItem = (item) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.avatarContiner}>
          <View style={styles.avatarBox}></View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text>{item.item.name}</Text>
            <Text style={styles.silentText}>{item.item.lastMessage}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.silentText}>{item.item.lastSeen}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {/* Flatlist is mainly used to render an array of items on screen without affecting the perfomance of the application*/}

      <FlatList
        data={userList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      {/* Floating Icon at the bottom right*/}
      <View>
        <TouchableOpacity style={styles.floatingIcon}>
          <Icon name="message-square" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: LIGHT_COLOR },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wWidth - 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  avatarContiner: { flexDirection: "row", alignItems: "center" },
  avatarBox: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "grey",
  },
  silentText: { color: "grey" },
  floatingIcon: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: SECONDARY_BLUE,
    borderRadius: 100,
  },
});
export default Chats;
