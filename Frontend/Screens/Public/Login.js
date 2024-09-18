import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCreateGame from "../../hooks/useCreateGame";
import axios from "../../hooks/axios";
import FormTextField from "../../components/FormField";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/WebSocketContext";
import { login, loadUser } from "../../services/AuthService";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  PermanentMarker_400Regular,
} from "@expo-google-fonts/permanent-marker";
export default function Login({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erros, setErrors] = useState("");
  let [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  async function handleLogin() {
    console.log(email, password);
    try {
      console.log(email, password);
      credentials = {
        email: email,
        password: password,
      };
      await login(credentials);
      const user = await loadUser();
      console.log(user);
      setUser(user);
    } catch (e) {
      console.log(e);
      if (e.response) {
        console.log(e.response);
        console.log(e.response.status);
        console.log(e.response.data);
        console.log(e.response.headers);
      }
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>WAGER WARS</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputext}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="superhero@gmail.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#ccc"
            />
            <Text style={styles.inputext}>Contraseña</Text>

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholderTextColor="#ccc"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.linkText}>
              No tienes una cuenta? Registrate
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#183642",
  },
  inputext: {
    fontFamily: "PermanentMarker_400Regular",
    color: "white",
    fontSize: 25,
    padding: 10,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 75,
    color: "white",
    marginBottom: 100,
    fontFamily: "PermanentMarker_400Regular",
    alignContent: "center",
    fontWeight: "900",
    padding: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 150,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 50,
    backgroundColor: "#183642",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    color: "white",
  },
  button: {
    height: 50,
    width: "100%",
    backgroundColor: "#E2B007",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    borderRadius: 150,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Arial",
  },
  linkText: {
    color: "white",
    fontFamily: "PermanentMarker_400Regular",
    fontSize: 16,
    marginTop: 10,
  },
});
