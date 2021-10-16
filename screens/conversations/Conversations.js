import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  KeyboardEvent,
} from "react-native";
import {
  LIGHT_COLOR,
  PRIMARY_COLOR,
  PRIMARY_DARK,
  SECONDARY_LIGHT,
} from "../../constants/colors";
import { Feather as Icon, Entypo, MaterialIcons } from "@expo/vector-icons";
import ProfileCard from "../../components/ProfileCard";
import { Avatar, Divider, TouchableRipple } from "react-native-paper";
import { messageList } from "../../services/messages.json";
import { useKeyboard } from "../../components/UseKeyboard";

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const Conversation = (props) => {
  const [inputMessage, setInputMessage] = useState("");
  const { item } = props;
  const keyboardHeight = useKeyboard();
  console.log(keyboardHeight);

  const messageLayout = (message) => (
    <View>
      {message.item.name === "Jane" ? (
        <View style={styles.messagesRight}>
          <Text style={styles.textMessage}>{message.item.lastMessage}</Text>
        </View>
      ) : (
        <View style={styles.messagesLeft}>
          <Text style={styles.textMessage}>{message.item.lastMessage}</Text>
        </View>
      )}
    </View>
  );
  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity onPress={Keyboard.dismiss} style={styles.root}>
        <FlatList
          data={messageList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={messageLayout}
        />

        <View style={styles.textInputMeso}>
          <View style={styles.inputLayout}>
            <View>
              <MaterialIcons name="attach-file" size={24} color="black" />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput value={inputMessage} onChangeText={setInputMessage} />
            </View>
            <View>
              <Icon name="camera" size={24} color="black" />
            </View>
          </View>
          <View style={{ backgroundColor: PRIMARY_COLOR, borderRadius: 10 }}>
            {inputMessage === "" ? (
              <Icon name="mic" size={24} color="black" />
            ) : (
              <MaterialIcons name="send" size={24} color="black" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: LIGHT_COLOR,
  },
  inner: {
    flex: 1,
    justifyContent: "space-around",
  },
  messagesLeft: {
    borderRadius: 10,
    backgroundColor: PRIMARY_DARK,
    minHeight: 40,
    marginLeft: 2,
    marginRight: 6,
    marginBottom: 4,
    paddingVertical: 6,
    width: "80%",
  },
  messagesRight: {
    borderRadius: 10,
    backgroundColor: PRIMARY_COLOR,
    minHeight: 40,
    marginLeft: 6,
    marginRight: 2,
    marginBottom: 4,
    paddingVertical: 6,
    width: "80%",
    alignSelf: "flex-end",
  },
  textMessage: {
    color: "white",
    marginLeft: 5,
    marginTop: 3,
  },
  textInputMeso: {
    borderRadius: 10,
    paddingLeft: 2,
    paddingRight: 4,
    width: "100%",
    height: "9%",
    bottom: 6,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 2,
  },
  inputWrapper: {
    backgroundColor: PRIMARY_COLOR,
    width: "80%",
  },
  inputLayout: {
    backgroundColor: PRIMARY_COLOR,
    flexDirection: "row",
    borderRadius: 15,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Conversation;
