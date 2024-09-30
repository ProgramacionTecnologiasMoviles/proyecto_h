import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import axios from "../../hooks/axios";
import FormTextField from "../../components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [errors, setErrors] = useState("");

  //-----------------Esta harcodeado el national_id/credits-------------------//
  async function handleRegister() {
    try {
      const { data } = await axios.post("/users", {
        fullname: name,
        username: username,
        national_id: nationalId,
        email: email,
        password: password,
        age: edad,
        credits: 0,
      });
    } catch (e) {
      console.log(e);
      if (e.response.status == 500) {
        setErrors("el email ya se encuentra registrado");
        console.log(errors);
      }
    } finally {
      navigation.navigate("Landing");
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>WAGER WARS</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Full name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Full name"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Username</Text>
            <TextInput
              value={username}
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Email</Text>
            <TextInput
              value={email}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              errors={errors}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              value={password}
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Age</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => setEdad(text)}
              value={edad}
              maxLength={2}
              placeholder="Age"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>National Id</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => setNationalId(text)}
              value={nationalId}
              maxLength={10}
              placeholder="National Id"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F23838",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  title: {
    fontSize: 50,
    color: "white",
    fontFamily: "Fredoka_700Bold",
    marginVertical: 10,
  },
  form: {
    width: "100%",
    height: "80%",
    padding: 20,
    borderWidth: 4,
    borderRadius: 20,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputText: {
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 20,
    color: "white",
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 4,
    marginTop: 5,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: "#F7F7F7",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Fredoka_600SemiBold",
  },
});
