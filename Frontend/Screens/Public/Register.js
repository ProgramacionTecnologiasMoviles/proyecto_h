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
import { LinearGradient } from "expo-linear-gradient";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [errors, setErrors] = useState("");

  //-----------------Esta harcodeado el national_id/credits-------------------//
  async function handleRegister() {
    try {
      const { data } = await axios.post("/users", {
        fullname: name,
        username: username,
        national_id: 1,
        email: email,
        password: password,
        age: edad,
        credits: 1000,
      });
      console.log(data);
    } catch (e) {
      console.log(e);
      if (e.response.status == 500) {
        setErrors("el email ya se encuentra registrado");
        console.log(errors);
      }
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#fffffe", "#fffffe"]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>WAGER WARS</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputext}>Nombres Completos</Text>
              <FormTextField
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Usuario"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputext}>Usuario</Text>
              <FormTextField
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Usuario"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputext}>Correo</Text>
              <FormTextField
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Correo electronico"
                errors={errors}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputext}>Contraseña</Text>
              <FormTextField
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputext}>Edad</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={(text) => setEdad(text)}
                value={edad}
                maxLength={2}
              />
            </View>
          </View>
          <View style={styles.container_credits}>
            <Text style={styles.textpay}>Agregar Metodo de Pago</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 55,
    color: "black",
    fontFamily: "PermanentMarker_400Regular",
    fontWeight: "900",
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: "black",
    borderWidth: 4,
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  textpay: {
    fontSize: 25,
    color: "black",
    fontFamily: "PermanentMarker_400Regular",
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    alignItems: "center",
    margin: 200,
  },
  label: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    marginBottom: 20,
    color: "#000000",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: "#F7F7F7",
    fontFamily: "Poppins-Regular",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  linkText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginTop: 10,
  },
});
