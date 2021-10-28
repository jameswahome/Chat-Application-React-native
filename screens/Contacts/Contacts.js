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

const Contacts = ({ navigation }) => {
  const contextType = useContext(UserContext);
  //render the chat screen recent conversations
  const users = gql`
    query {
      allusers {
        _id
        username
        phonenumber
        email
        profileimage
        updatedAt
      }
    }
  `;

  const usersprofile = gql`
query{
  oneuser(username: "${contextType.username}"){
    _id
    profileimage
  }
}
`;

  function FetchUsersProfile() {
    const { loading, error, data } = useQuery(usersprofile);
    if (loading) return <Loading />;
    if (error) return <Text>Error! ${error} </Text>;

    return data.oneuser;
  }

  const user = FetchUsersProfile();

  const { loading, error, data } = useQuery(users);
  if (loading) return <Loading />;
  if (error) return <Text>Error! ${error} </Text>;

  const Allusers = data.allusers;
  const allContactList = Allusers.reduce(function (result, element) {
    if (element.username !== contextType.username) {
      result.push(element);
    }
    return result;
  }, []);

  const confirmHandler = (inputUsername, inputId) => {
    console.log(inputId);
    //check if they're  fields which are null
    if (inputUsername.trim().length === 0) {
      throw new Error("all fields are required");
    }

    //post to the database
    const requestBody = {
      query: `
          mutation CreateEvent(  $username: ID! ) {
             CreateMessageList(receiver:$username){
                
                receiver{
                  _id
                  username
                  email
                }
                
                updatedAt
                createdAt
                _id
              }
            }
        `,
      variables: {
        username: inputUsername,
      },
    };

    fetch("https://apimarketpalace.com/api", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data !== null) {
          console.log(resData.data.CreateMessageList.receiver._id);
          navigation.navigate("Conversation", {
            setTapUser: resData.data.CreateMessageList.receiver._id,
            name: resData.data.CreateMessageList.receiver.username,
          });
        } else {
          navigation.navigate("Conversation", {
            setTapUser: inputUsername,
            name: inputId,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderItem = (item) => {
    const usersprofile = item.item.profileimage;

    return (
      <TouchableOpacity
        onPress={() => {
          confirmHandler(item.item._id, item.item.username);
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
            <Text>{item.item.username}</Text>
            <Text style={styles.silentText}>
              Hey, Im using Chat Application
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.root}>
      {/* Flatlist is mainly used to render an array of items on screen without affecting the perfomance of the application*/}

      <FlatList
        data={allContactList}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
      {/* Floating Icon at the bottom right*/}
      <View>
        <TouchableOpacity style={styles.floatingIcon}>
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
export default Contacts;
