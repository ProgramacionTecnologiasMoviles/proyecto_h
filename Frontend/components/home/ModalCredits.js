import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCreateMatch } from "../../hooks/useCreateMatch";
import { AuthContext } from "../../contexts/WebSocketContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ModalCredits({ setOpenModal }) {
  const navigation = useNavigation();
  const [credits, setCredits] = useState("");
  const { user } = useContext(AuthContext);
  const [notEnoughCredits, setNotEnoughCredits] = useState(false);

  const handlePlay = async () => {
    const { gameId } = await useCreateMatch(user, credits);
    if (gameId) {
      setOpenModal(false);
      navigation.navigate("LobbyGame", { gameId, hostPlayer: true });
    } else {
      setNotEnoughCredits(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundOverlay}></View>

      <View style={styles.smallBox}>
        <Pressable
          onPress={() => setOpenModal(false)}
          style={styles.closeButton}
        >
          <AntDesign name="closecircle" size={28} color="black" />
        </Pressable>
        <Text style={styles.title}>How many credits do u wanna bet?</Text>
        <TextInput
          placeholder="Credits to bet"
          style={styles.amountCreditsInput}
          keyboardType="numeric"
          value={credits}
          onChangeText={setCredits}
        />
        {notEnoughCredits && (
          <Text style={styles.title}>
            Not enough credits, You got {user.credits}
          </Text>
        )}
        <Pressable onPress={handlePlay} style={styles.button}>
          <Text style={styles.buttonText}>Create Match</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: -1,
  },
  smallBox: {
    width: "80%",
    height: "35%",
    backgroundColor: "#F9C527",
    margin: "auto",
    borderRadius: 20,
    zIndex: 1,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  closeButton: {
    padding: 10,
    marginLeft: "auto",
  },
  title: {
    fontSize: 20,
    fontFamily: "Fredoka_600SemiBold",
    textAlign: "center",
  },
  amountCreditsInput: {
    width: "70%",
    padding: 10,
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 20,
    marginVertical: 20,
    backgroundColor: "white",
  },
  button: {
    width: "50%",
    padding: 5,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 6,
    marginTop: "auto",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Fredoka_600SemiBold",
  },
});
