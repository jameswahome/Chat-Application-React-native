import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import {
  LIGHT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_LIGHT,
} from "../../constants/colors";
import { Feather as Icon, Entypo } from "@expo/vector-icons";
import ProfileCard from "../../components/ProfileCard";
import { UserContext } from "../../context/UserContext";
import { launchImageLibrary } from "react-native-image-picker";

const { width: wWidth, height: wHeight } = Dimensions.get("window");

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const Settings = () => {
  const userDetails = useContext(UserContext);
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch(`https://apimarketpalace.com/upload`, {
      method: "POST",
      body: createFormData(photo, { userId: "123" }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => console.log("this will upload image")}>
        <View style={styles.profileCardContainer}>
          <View style={styles.avatar}>
            {photo && (
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 30, height: 300 }}
              />
            )}
            <View style={styles.plusContainer}>
              <Icon name="plus" size={20} color={LIGHT_COLOR} />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>{userDetails.username} </Text>
            <Text style={styles.silent}>tap to update your profilepicture</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    height: 40,
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
export default Settings;
