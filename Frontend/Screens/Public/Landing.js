import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wager Wars</Text>
      <View style={styles.games}>
        <View style={styles.gameContainer}>
          <View style={styles.imageShadow}>
            <Image
              source={require("../../assets/mario.png")}
              style={styles.gameImage}
            ></Image>
          </View>
        </View>
        <View style={styles.gameContainer2}>
          <View style={styles.imageShadow}>
            <Image
              source={require("../../assets/cyberpunk.png")}
              style={styles.gameImage}
            ></Image>
          </View>
        </View>
        <View style={styles.gameContainer3}>
          <View style={styles.imageShadowCenter}>
            <Image
              source={require("../../assets/flappybirdlogo.png")}
              style={styles.gameImageCenter}
            ></Image>
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>Step into the arena of Wager Wars!</Text>
      <Text style={styles.subtitle}>
        {" "}
        <Text style={styles.firstSpan}>Challenge.</Text> Compete.{" "}
        <Text style={styles.secondSpan}>Conquer.</Text>
      </Text>

      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}> Login </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}> Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23838",
    alignItems: "center",
  },
  title: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 50,
    marginTop: 60,
    color: "white",
  },
  games: {
    marginTop: 40,
    height: "40%",
    width: "100%",
  },
  gameContainer: {
    position: "absolute",
    width: "100%",
    height: "50%",
    alignItems: "center",
    padding: 10,
    transform: [{ rotateZ: "25deg" }],
    left: 90,
    top: 20,
  },
  gameContainer2: {
    position: "absolute",
    width: "100%",
    height: "50%",
    alignItems: "center",
    padding: 10,
    transform: [{ rotateZ: "-25deg" }],
    right: 90,
    top: 20,
  },
  gameContainer3: {
    position: "absolute",
    width: "100%",
    height: "50%",
    alignItems: "center",
    padding: 10,
  },
  gameImageCenter: {
    marginRight: 20,
    height: 180,
    width: 180,
  },
  imageShadowCenter: {
    paddingTop: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    height: 210,
    width: 210,
    backgroundColor: "black",
  },

  gameImage: {
    marginRight: 20,
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  imageShadow: {
    paddingTop: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    height: 180,
    width: 180,
    backgroundColor: "black",
  },
  subtitle: {
    fontSize: 25,
    color: "white",
    top: -60,
    fontFamily: "Fredoka_600SemiBold",
    textAlign: "center",
    marginBottom: 10,
  },
  firstSpan: {
    color: "#F9C527",
  },
  secondSpan: {
    color: "#2D9BF0",
  },
  buttons: {
    flex: 1,
    marginTop: 90,
    gap: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "70%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Fredoka_600SemiBold",
  },
});
