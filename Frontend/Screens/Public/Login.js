import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/WebSocketContext";
import { ScrollView } from "react-native";
import { login, loadUser } from "../../services/AuthService";

export default function Login({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      credentials = {
        email: email,
        password: password,
      };
      await login(credentials);
      const user = await loadUser();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>WAGER WARS</Text>
          <Text style={styles.subtitle}>Login to your Account</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputext}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="superhero@gmail.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#000"
            />
            <Text style={styles.inputext}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholderTextColor="#000"
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
    backgroundColor: "#F23838",
    alignItems: "center",
  },
  title: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 50,
    color: "white",
    marginBottom: 80,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Fredoka_500Medium",
    color: "white",
  },

  container: {
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 150,
    marginTop: 20,
    alignItems: "center",
  },
  inputext: {
    fontFamily: "Fredoka_500Medium",
    color: "white",
    fontSize: 20,
    padding: 10,
  },
  input: {
    height: 50,
    width: 300,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#000000",
    color: "black",
    marginBottom: 5,
    shadowOffset: { width: -4, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  button: {
    height: 60,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    marginTop: 155,
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontFamily: "Fredoka_600SemiBold",
  },
  linkText: {
    color: "white",
    fontFamily: "Fredoka_400Regular",
    fontSize: 16,
    marginTop: 10,
  },
});
