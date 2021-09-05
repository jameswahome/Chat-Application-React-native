import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonTouch from "../../components/Button";
import ErrorNotification from "../../components/Error";
import HeadingLogin from "../../components/Heading";
import InputText from "../../components/Input";
import ButtonText from "../../components/TextButton";
import { AuthContext } from "../../context/AuthContext";

const Login = ({ navigation }) => {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.root}>
      <HeadingLogin style={styles.title}>Login Screen</HeadingLogin>
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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <ButtonTouch
        title="Login"
        style={styles.loginButton}
        onPress={() => {
          login(email, password);
        }}
      />
      <ButtonText
        title="Create an Account"
        onPress={() => {
          navigation.navigate("SignUp");
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
    padding: 20,
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
});
export default Login;
