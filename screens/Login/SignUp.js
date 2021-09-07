import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonTouch from "../../components/Button";
import ErrorNotification from "../../components/Error";
import HeadingLogin from "../../components/Heading";
import InputText from "../../components/Input";
import ButtonText from "../../components/TextButton";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/loading";
import PhoneInput from "react-native-phone-input";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import TextMessages from "../../components/Text";
const SignUp = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorNot, setErrorNot] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = (number) => {
    // checks if its an actual phone number not 1234569897
    const isValidPhoneNumber = isPossiblePhoneNumber(phoneNumber);

    if (isValidPhoneNumber) {
      //removes the spaces in the phonenumber
      const phoneno = phoneNumber.replace(/ /g, "");
      return phoneno;
    }

    setErrorNot("invalid phonenumber");
    return isValidPhoneNumber;
  };
  const validateEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return email;
    }
    setErrorNot("invalid email");
    return re.test(String(email).toLowerCase());
  };

  const signupHandler = (event) => {
    const phoneno = validatePhoneNumber();
    const mail = validateEmail();

    if (
      password.trim().length === 0 ||
      username.trim().length === 0 ||
      phoneno === false ||
      mail === false
    ) {
      if (mail === false) {
        setErrorNot("enter a valid Email");
      } else if (phoneno === false) {
        setErrorNot("enter a valid phonenumber");
      } else {
        setErrorNot("All fields are required");
      }

      return;
    }
    setIsLoading(true);

    let requestBody = {
      query: `
				mutation CreateUser($email: String!, $pass: String!, $username: String!,  $phonenumber: String!){
				  createUser(createAcc: {email: $email, password: $pass, username: $username,  phonenumber: $phonenumber}){
					_id
					email
          username
				  }
				}
				`,
      variables: {
        email: mail.toLowerCase(),
        pass: password,
        username: username.toLowerCase(),
        phonenumber: phoneno,
      },
    };

    fetch("https://9837-105-160-37-97.ngrok.io/api", {
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
        setIsLoading(false);

        if (resData.data.createUser !== null) {
          setErrorNot("Signup successful");
          signUp(
            resData.data.createUser.email,
            resData.data.createUser.username
          );
          navigation.pop();
          return;
        }
        if (resData.data.createUser === null) {
          setErrorNot(resData.errors[0].message);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

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
      <ErrorNotification errorNot={errorNot} />
      <TextMessages style={styles.text}> Email </TextMessages>
      <InputText
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextMessages style={styles.text}>Username </TextMessages>
      <InputText
        style={styles.input}
        placeholder="username"
        keyboardType="default"
        value={username}
        onChangeText={setUsername}
      />
      <TextMessages style={styles.text}>Phone Number </TextMessages>

      <PhoneInput
        initialCountry={"ke"}
        style={{
          backgroundColor: "#e8e8e8",
          width: "100%",
          padding: 15,
          borderRadius: 8,
          marginVertical: 8,
        }}
        onChangePhoneNumber={setPhoneNumber}
      />
      <TextMessages style={styles.text}>Password </TextMessages>
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
          signupHandler();
        }}
      />
      <ButtonText
        title="Login"
        onPress={() => {
          navigation.pop();
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
    paddingTop: 100,
    padding: 16,
  },
  input: {
    marginVertical: 4,
  },
  loginButton: {
    marginVertical: 20,
  },
  title: {
    marginBottom: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 60,
    right: 16,
  },
  text: {
    textAlign: "left",
    width: "100%",
    padding: 8,
  },
});
export default SignUp;
