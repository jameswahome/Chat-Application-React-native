import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonTouch from "../../components/Button";
import ErrorNotification from "../../components/Error";
import HeadingLogin from "../../components/Heading";
import InputText from "../../components/Input";
import Loading from "../../components/loading";
import ButtonText from "../../components/TextButton";
import { AuthContext } from "../../context/AuthContext";

const Login = ({ navigation }) => {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorNot, setErrorNot] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = (email, password) => {
    //check if they're  fields which are null
    if (email.trim().length === 0 || password.trim().length === 0) {
      setErrorNot("all fields are required");
      return;
    }
    setIsLoading(true);

    //post to the database
    const requestBody = {
      query: `
      query Login($user: String!, $pass: String!) {
        login(username:$user, password:$pass){
          userId
          username
          token
          tokenExpiration
        }
      }
        `,
      variables: {
        user: email,
        pass: password,
      },
    };

    fetch("https://9837-105-160-37-97.ngrok.io/api", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token,
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
        setIsLoading(false);
        if (resData.data !== null) {
          login(resData.data.login.token, resData.data.login.username);

          setErrorNot("login successful");
          return;
        }
        if (resData.data === null) {
          setErrorNot(resData.errors[0].message);
          return;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <View style={styles.root}>
      <HeadingLogin style={styles.title}>Login Screen</HeadingLogin>
      <ErrorNotification errorNot={errorNot} />
      <InputText
        style={styles.input}
        placeholder="username or Email"
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
          loginHandler(email, password);
        }}
      />
      <ButtonText
        title="Create an Account"
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      />
      <Loading loading={isLoading} />
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
