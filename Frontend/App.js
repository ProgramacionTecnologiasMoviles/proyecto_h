import { View } from "react-native";
import { useCallback, useEffect } from "react";
import RoutesPub from "./RoutesPub";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

const App = () => {
  const [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <WebSocketProvider>
      <View onLayout={onLayout} style={{ flex: 1 }}>
        <RoutesPub />
      </View>
    </WebSocketProvider>
  );
};
export default App;
