import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import { TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/homescreen/HomeScreen";
import { Feather as Icon } from "@expo/vector-icons";
import Chats from "../screens/Chats/Chats";
import Status from "../screens/Status/Status";
import Calls from "../screens/Calls/Calls";
import { LIGHT_COLOR, PRIMARY_COLOR, PRIMARY_DARK } from "../constants/colors";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

//navigator components for chats, status, calls
const MaterialTopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
        // tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: PRIMARY_COLOR },
        tabBarActiveTintColor: LIGHT_COLOR,
        tabBarIndicatorStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Calls" component={Calls} />
    </Tab.Navigator>
  );
};
const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={PRIMARY_COLOR} style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={({ navigation, route }) => ({
              headerStyle: {
                elevation: 0,
                backgroundColor: PRIMARY_COLOR,
                shadowOpacity: 0,
              },
              title: "Chat Application",
              headerTintColor: LIGHT_COLOR,
              headerRight: () => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => console.log("search")}
                      style={{
                        marginHorizontal: 10,
                      }}
                    >
                      <Icon name="search" size={26} color={LIGHT_COLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log("menu Tab")}
                      style={{ marginHorizontal: 5 }}
                    >
                      <Icon
                        name="more-vertical"
                        size={26}
                        color={LIGHT_COLOR}
                      />
                    </TouchableOpacity>
                  </View>
                );
              },
            })}
            name="home"
            component={MaterialTopTab}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Main;
