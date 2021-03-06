import { StatusBar } from "expo-status-bar";
import React, { useMemo, useEffect, useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./container/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigator from "./navigators/AuthStackNavigator";
import { lightTheme } from "./themes/light";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";
import { useAuth } from "./hooks/useAuth";
import SplashScreen from "./screens/splashScreen/SplashScreen";
import { PRIMARY_COLOR } from "./constants/colors";

const RootStack = createStackNavigator();

export default function RootApp() {
  const { auth, state } = useAuth();

  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name="SplashScreen" component={SplashScreen} />;
    }
    return state.user ? (
      <RootStack.Screen name="MainStack">
        {() => (
          <UserContext.Provider value={state.user}>
            <Main />
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={PRIMARY_COLOR} style="light" />
      <AuthContext.Provider value={auth}>
        <NavigationContainer theme={lightTheme} independent={true}>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {renderScreens()}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
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
