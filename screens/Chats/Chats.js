import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { userList } from "../../services/data.json";
import { Feather as Icon } from "@expo/vector-icons";
import { LIGHT_COLOR, SECONDARY_BLUE } from "../../constants/colors";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import Loading from "../../components/loading";
const { DateTime } = require("luxon");
import moment from "moment";

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const Chats = ({ navigation }) => {
  const contextType = useContext(UserContext);
  //render the chat screen recent conversations
  const allMessages = gql`
    query {
      usersMessageList {
        _id
        messageslists {
          body
        }
        user {
          username
          profileimage
        }
        receiver {
          username
          profileimage
          _id
        }
        createdAt
        updatedAt
      }
    }
  `;

  const usersprofile = gql`
    query {
      oneuser(username: "${contextType.username}") {
        _id
        profileimage
      }
    }
  `;
  const MessageSubscription = gql`
    subscription {
      newmessageList {
        user {
          username
          _id
        }
        receiver {
          username
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

  function FetchUsersProfile() {
    const { loading, error, data } = useQuery(usersprofile);
    if (loading) return <Loading />;
    if (error) return <Text> Error! {error} </Text>;

    return data.oneuser;
  }

  const user = FetchUsersProfile();

  const { loading, error, data, subscribeToMore } = useQuery(allMessages);
  if (loading) return <Loading />;
  if (error) return <Text> Error! {error} </Text>;

  const myMessages = data.usersMessageList;
  const subscribeToNewTopics = () => {
    subscribeToMore({
      document: MessageSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newmessageList;

        return Object.assign({}, prev, {
          usersMessageList: {
            usersMessageList: [newFeedItem, prev.usersMessageList],
          },
        });
      },
    });
  };
  subscribeToNewTopics();

  const sortedMessages = myMessages.slice().sort((a, b) => {
    const dateA = new Date(b.updatedAt);
    const DateB = new Date(a.updatedAt);

    return dateA - DateB;
  });

  const contactListLength = sortedMessages.length;

  const renderItem = (item) => {
    const lastMessage = item.item.messageslists.length - 1;
    const usersprofile = item.item.receiver.profileimage;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Conversation", {
            setTapUser: item.item.receiver._id,
            name: item.item.receiver.username,
          });
        }}
        style={[styles.cardContainer]}
      >
        <View style={styles.avatarContiner}>
          <View style={styles.avatarBox}>
            {usersprofile === null ? (
              <Image
                style={styles.image}
                source={{
                  uri: "https://res.cloudinary.com/jaymojay/image/upload/v1634151683/24-248253_user-profile-default-image-png-clipart-png-download_qm0dl0.png",
                }}
              />
            ) : (
              <Image
                style={styles.image}
                source={{
                  uri: usersprofile,
                }}
              />
            )}
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text>{item.item.receiver.username}</Text>
            <Text style={styles.silentText}>
              {item.item.messageslists[lastMessage].body}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.silentText}>
            {moment(item.item.updatedAt).format("ddd, LT")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.root}>
      {/* Flatlist is mainly used to render an array of items on screen without affecting the perfomance of the application*/}

      <FlatList
        data={sortedMessages}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
      {/* Floating Icon at the bottom right*/}
      <View>
        <TouchableOpacity
          style={styles.floatingIcon}
          onPress={() => navigation.navigate("Contacts")}
        >
          <Icon name="message-square" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    height: 60,
    width: 60,
  },
});
export default Chats;
