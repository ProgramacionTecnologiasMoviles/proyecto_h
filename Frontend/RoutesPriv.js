import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Screens/Private/Home";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Game from "./Screens/Private/Game";
import LobbyGame from "./Screens/Private/LobbyGame";
// import Dashboard from "./Screens/Private/Dashboard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Score from "./Screens/Private/Score";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "black",
            margin: 20,
            borderRadius: 20,
            height: 60,
            position: "absolute",
            borderColor: "black",
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({}) => (
              <AntDesign name="home" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Game"
          component={Game}
          options={{
            tabBarIcon: ({}) => (
              <FontAwesome5 name="gamepad" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="LobbyGame"
          component={LobbyGame}
          options={{
            tabBarIcon: ({}) => (
              <FontAwesome5 name="gamepad" size={24} color="white" />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({}) => (
              <FontAwesome name="user" size={24} color="white" />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Score"
          component={Score}
          options={{
            tabBarIcon: ({}) => (
              <FontAwesome name="user" size={24} color="white" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
