import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Screens/Private/Home";
import { AntDesign } from "@expo/vector-icons";
// import Dashboard from "./Screens/Private/Dashboard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import User from "./Screens/Private/User";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
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
          tabBarIcon: ({}) => <AntDesign name="home" size={24} color="white" />,
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
        name="User"
        component={User}
        options={{
          tabBarIcon: ({}) => (
            <FontAwesome name="user" size={24} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
