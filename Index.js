import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./container/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigator from "./navigators/AuthStackNavigator";
import { lightTheme } from "./themes/light";
import { AuthContext } from "./context/AuthContext";
import { useQuery, gql } from "@apollo/client";

const RootStack = createStackNavigator();

export default function RootApp() {
  const AllowLogin = gql`
    query {
      login(username: "james", password: "12345678") {
        userId
        username
        token
        tokenExpiration
      }
    }
  `;
  function LoginQuery() {
    const { loading, error, data } = useQuery(AllowLogin);
    if (loading) return console.log(loading);
    if (error) return console.error(error);
    console.log(data.login);
    return data.login;
  }

  const modalConfirmHandler = () => {
    //post to the database
    const requestBody = {
      query: `
      query {
        login(username: "james", password: "12345678") {
          userId
          username
          token
          tokenExpiration
        }
      }
        `,
    };

    fetch("http://192.168.1.35:8080/api", {
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
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const auth = useMemo(() => ({
    login: async (email, password) => {
      const logindetails = modalConfirmHandler();
      console.log(logindetails);

      console.log(`the email is ${email} and password ${password}`);
    },
    logout: async () => {
      console.log("loggedout");
    },
    signUp: async (email, password) => {
      console.log(`the email is ${email} and password ${password}`);
    },
  }));
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer theme={lightTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
