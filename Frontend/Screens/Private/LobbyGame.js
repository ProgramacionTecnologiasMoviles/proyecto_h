import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { AuthContext, useWebSocket } from "../../contexts/WebSocketContext";
import { add_player_match } from "../../services/GameService";
import { removeTrailingZeros } from "../../services/GameService";

export default function LobbyGame({ route, navigation }) {
  const { gameId, hostPlayer } = route.params;
  const [isPlayerAdded, setIsPlayerAdded] = useState(false);
  const { user } = useContext(AuthContext);
  const [player2Connected, setIsPlayer2Connected] = useState(false);
  const { ws, initializeWebSocket } = useWebSocket();

  useEffect(() => {
    try {
      if (gameId) {
        initializeWebSocket(gameId, user);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      if (event.data == gameId) {
        setIsPlayer2Connected(true);
      } else if (player2Connected && event.data == "start") {
        navigation.navigate("Game", { hostPlayer: hostPlayer, gameId: gameId });
      }
    };
  }, [ws, player2Connected]);

  const handleStart = () => {
    ws.send("start");
  };
  if (!hostPlayer && !isPlayerAdded) {
    credentials = {
      id: removeTrailingZeros(gameId),
      guessUser: user.id,
    };
    add_player_match(credentials);
    setIsPlayerAdded(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Room:</Text>
      <Text style={styles.gameId}>{gameId}</Text>
      <Text style={styles.waiting}>Waiting for other players...</Text>
      <View style={styles.containerPlayers}>
        <View style={styles.playerContainer}>
          <Text style={styles.playerName}>Player 1</Text>
          <Image
            style={styles.imagePlayer}
            source={require("../../assets/sprites/bird.png")}
          ></Image>
          <Entypo name="check" size={30} color="green" style={styles.check} />
        </View>
        <View style={styles.playerContainer}>
          {player2Connected ? (
            <>
              <Text style={styles.playerName}>Player 1</Text>
              <Image
                style={styles.imagePlayer}
                source={require("../../assets/sprites/bird-red.png")}
              ></Image>
              <Entypo
                name="check"
                size={30}
                color="green"
                style={styles.check}
              />
            </>
          ) : (
            <ActivityIndicator color="black" size={40} />
          )}
        </View>
      </View>
      <View style={styles.joinGameContainer}>
        <Text style={styles.joinGameText}>Coins to bet</Text>
        <TextInput
          placeholder="Coins"
          style={styles.joinGameInput}
          keyboardType="numeric"
        />
      </View>

      <Pressable
        onPress={handleStart}
        style={styles.playButton}
        disabled={!player2Connected}
      >
        <Text style={styles.startText}>START!</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9C527",
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  gameId: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  waiting: {
    margin: 10,
    fontSize: 20,
    fontWeight: "400",
    opacity: 0.6,
  },
  containerPlayers: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    height: 200,
    margin: 30,
    padding: 10,
    gap: 10,
  },
  playerContainer: {
    flex: 1,
    width: "100%",
    zIndex: 10,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 6,
    borderRadius: 40,
    backgroundColor: "rgba(199, 150, 0, 0.8)",
  },
  imagePlayer: {
    marginTop: 20,
    width: 120,
    height: 80,
  },
  playerName: {
    fontSize: 20,
    fontWeight: "700",
  },
  check: {
    marginTop: 10,
  },
  joinGameContainer: {
    alignItems: "center",
    height: 50,
    width: "100%",
  },
  joinGameText: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  joinGameInput: {
    width: "70%",
    padding: 10,
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "white",
  },
  playButtonContainer: {
    marginTop: 100,
    width: "100%",
    height: 30,
    backgroundColor: "white",
  },
  playButton: {
    width: "50%",
    height: 40,
    backgroundColor: "white",
    marginTop: 80,
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 10,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  startText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
