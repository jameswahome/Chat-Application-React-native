import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonTouch from "../../components/Button";
import ErrorNotification from "../../components/Error";
import HeadingLogin from "../../components/Heading";
import InputText from "../../components/Input";
import ButtonText from "../../components/TextButton";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";

const SignUp = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.root}>
      <HeadingLogin style={styles.title}>SignUp Screen</HeadingLogin>
      <Icon
        style={styles.closeIcon}
        name="close"
        size={24}
        color="black"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
      <ErrorNotification errorNot="" />
      <InputText
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <InputText
        style={styles.input}
        placeholder="username"
        keyboardType="default"
        value={email}
        onChangeText={setEmail}
      />

      <InputText
        style={styles.input}
        placeholder="phonenumber"
        keyboardType="phone-pad"
        value={email}
        onChangeText={setEmail}
      />

      <InputText
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <ButtonTouch
        title="SignUp"
        style={styles.loginButton}
        onPress={() => {
          signUp(email, password);
        }}
      />
      <ButtonText
        title="Login"
        onPress={() => {
          navigation.pop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    paddingTop: 120,
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  title: {
    marginBottom: 48,
  },
  closeIcon: {
    position: "absolute",
    top: 60,
    right: 16,
  },
});
export default SignUp;
