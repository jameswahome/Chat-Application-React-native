import React, { useState, useContext } from "react";
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
  KeyboardAvoidingView,
} from "react-native";
import {
  LIGHT_COLOR,
  PRIMARY_COLOR,
  PRIMARY_DARK,
  SECONDARY_LIGHT,
} from "../../constants/colors";
import { gql, useQuery } from "@apollo/client";
import { Feather as Icon, Entypo, MaterialIcons } from "@expo/vector-icons";
import ProfileCard from "../../components/ProfileCard";
import { Avatar, Divider, TouchableRipple } from "react-native-paper";
import { messageList } from "../../services/messages.json";
import { useKeyboard } from "../../components/UseKeyboard";
import Loading from "../../components/loading";
import { UserContext } from "../../context/UserContext";
import modalConfirmHandler from "../../requests/sendMessage";
import moment from "moment";
const { width: wWidth, height: wHeight } = Dimensions.get("window");

const Conversation = ({ route }) => {
  const [inputMessage, setInputMessage] = useState("");
  const contextType = useContext(UserContext);

  // const keyboardHeight = useKeyboard();
  // console.log(keyboardHeight);
  const userId = route.params.setTapUser;

  const allMessages = gql`
  query {
    singleUserMessageList(userId: "${userId}") {
      _id
      updatedAt
      createdAt
      user {
        username
        profileimage
        _id
      }
      receiver {
        username
        profileimage
        _id
      }
      messageslists {
        _id
        body
        createdAt
        user {
          
          username
          profileimage
        }
        creator {
          username
          profileimage
        }
      }
    }
  }
`;

  const MessageSubscription = gql`
    subscription {
      newmessageList {
        user {
          username
          profileimage
          _id
        }
        receiver {
          username
          profileimage
          _id
        }
        messageslists {
          body
          user {
            username
            profileimage
          }
          creator {
            username
            profileimage
          }
        }
      }
    }
  `;

  const { loading, error, data, subscribeToMore } = useQuery(allMessages);
  if (loading) return <Loading />;
  if (error) return <Text>Error! {error}</Text>;

  const myConversation = data.singleUserMessageList;

  const subscribeToNewTopics = () => {
    subscribeToMore({
      document: MessageSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newmessageList;

        return Object.assign({}, prev, {
          singleUserMessageList: {
            singleUserMessageList: [newFeedItem, prev.singleUserMessageList],
          },
        });
      },
    });
  };
  subscribeToNewTopics();
  const messageListLayout = (mesos) => {
    return (
      <>
        {mesos.item.creator.username === contextType.username ? (
          <View style={styles.messagesRight}>
            <Text style={styles.textMessage}>{mesos.item.body}</Text>
            <Text style={styles.time}>
              {moment(mesos.item.createdAt).format("ddd, LT")}
            </Text>
          </View>
        ) : (
          <View style={styles.messagesLeft}>
            <Text style={styles.textMessage}>{mesos.item.body}</Text>
            <Text style={styles.time}>
              {moment(mesos.item.createdAt).format("ddd, LT")}
            </Text>
          </View>
        )}
      </>
    );
  };

  const inputUsername = myConversation[0].receiver.username;
  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;

  const text = inputMessage;
  const handleSendMessage = () => {
    modalConfirmHandler({ text, inputUsername });
    setInputMessage("");
  };

  const messageLayout = (message) => {
    return (
      <View>
        <FlatList
          data={message.item.messageslists}
          keyExtractor={(item) => item._id.toString()}
          renderItem={messageListLayout}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <TouchableOpacity
          onPress={Keyboard.dismiss}
          style={styles.root}
          activeOpacity={1}
        >
          <FlatList
            data={myConversation}
            keyExtractor={(item) => item._id.toString()}
            renderItem={messageLayout}
          />

          <View style={styles.textInputMeso}>
            <View style={styles.inputLayout}>
              <View>
                <MaterialIcons name="attach-file" size={24} color="black" />
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  value={inputMessage}
                  onChangeText={setInputMessage}
                  placeholder="send message"
                />
              </View>
              <View>
                <Icon name="camera" size={24} color="black" />
              </View>
            </View>
            <View
              style={{
                backgroundColor: PRIMARY_COLOR,
                borderRadius: 10,
                width: "8%",
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {inputMessage === "" ? (
                <Icon name="mic" size={24} color="black" />
              ) : (
                <MaterialIcons
                  name="send"
                  size={24}
                  color="black"
                  onPress={() => handleSendMessage()}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    height: 40,
    bottom: 8,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 2,
  },
  inputWrapper: {
    backgroundColor: PRIMARY_COLOR,
    width: "80%",
    height: "100%",
    justifyContent: "center",
  },
  inputLayout: {
    backgroundColor: PRIMARY_COLOR,
    flexDirection: "row",
    borderRadius: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    alignSelf: "flex-end",
    fontSize: 12,
  },
});
export default Conversation;
