import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./container/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigator from "./navigators/AuthStackNavigator";
import { lightTheme } from "./themes/light";
import { AuthContext } from "./context/AuthContext";

const RootStack = createStackNavigator();

export default function RootApp() {
  const auth = useMemo(() => ({
    login: async (email, password) => {
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
