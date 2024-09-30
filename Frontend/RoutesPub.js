import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Screens/Public/Login";
import Register from "./Screens/Public/Register";
import { useState, useEffect } from "react";
import { loadUser } from "./services/AuthService";
import { AuthContext } from "./contexts/WebSocketContext";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./RoutesPriv";
import LobbyGame from "./Screens/Private/LobbyGame";
import Score from "./Screens/Private/Score";
import Game from "./Screens/Private/Game";

const Stack = createNativeStackNavigator();

export default function RoutesPub() {
  const [user, setUser] = useState();
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    async function runEffect() {
      console.log(user);
      try {
        const user = await loadUser();
        console.log(user);
        setUser(user);
      } catch (e) {
        console.log(e);
        console.log("No encontro ningun usuario", e);
      }
      setStatus("idd");
    }
    runEffect();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="LobbyGame" component={LobbyGame} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Score" component={Score} />
          </Stack.Navigator>
        ) : (
          <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
