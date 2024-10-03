import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/WebSocketContext";
import { Modal } from "react-native";
import ModalCredits from "../../components/home/ModalCredits";
import { useJoinMatch } from "../../hooks/useJoinMatch";

import { create_match } from "../../services/GameService";
export default function Home({ navigation }) {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [gameId, onChangeGameId] = useState("");
  const [notEnoughCredits, setNotEnoughCredits] = useState(false);

  const handleSubmit = async () => {
    const { added } = await useJoinMatch(gameId, user.id);
    if (added) {
      navigation.navigate("LobbyGame", { gameId: gameId, hostPlayer: false });
      setNotEnoughCredits(false);
    } else {
      setNotEnoughCredits(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Hi {user.username}</Text>
          <Text style={styles.title}>Coins - {user.credits}</Text>
        </View>
        <View style={styles.gameContainer}>
          <View style={styles.imageShadow}>
            <Image
              source={require("../../assets/flappybirdlogo.png")}
              style={styles.gameImage}
            ></Image>
          </View>
        </View>
        <View style={styles.playContainer}>
          <Image
            source={require("../../assets/playButtonImage.png")}
            style={styles.playButtonImage}
          ></Image>
          <Pressable
            title=""
            onPress={() => {
              setOpenModal(true), setNotEnoughCredits(false);
            }}
            style={styles.playButton}
          />
        </View>
        <View style={styles.joinGameContainer}>
          <Text style={styles.joinGameText}>Join a Game</Text>
          <TextInput
            placeholder="Room code"
            style={styles.joinGameInput}
            keyboardType="numeric"
            value={gameId}
            onChangeText={onChangeGameId}
            onSubmitEditing={handleSubmit}
          />
        </View>
        {notEnoughCredits && (
          <Text style={styles.missingCredits}>
            You don't have enough credits to join the match
          </Text>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}
      >
        <ModalCredits setOpenModal={setOpenModal} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9C527",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    height: 100,
    fontFamily: "Fredoka_600SemiBold",
  },
  gameContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    padding: 10,
  },
  gameImage: {
    marginRight: 20,
    height: 300,
    width: 300,
  },
  imageShadow: {
    paddingTop: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    height: 335,
    width: 338,
    backgroundColor: "black",
  },
  playContainer: {
    marginTop: -60,
    width: "100%",
    alignItems: "center",
  },
  playButtonImage: {
    height: 80,
    width: 200,
  },
  playButton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  joinGameContainer: {
    flex: 1,
    alignItems: "center",
    height: "20%",
    width: "100%",
  },
  joinGameText: {
    marginTop: 20,
    fontSize: 25,
    fontFamily: "Fredoka_600SemiBold",
  },
  joinGameInput: {
    width: "70%",
    padding: 10,
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 20,
    marginTop: 15,
    backgroundColor: "white",
  },
  missingCredits: {
    marginBottom: 100,
    fontSize: 20,
    fontFamily: "Fredoka_500Medium",
    textAlign: "center",
  },
});
