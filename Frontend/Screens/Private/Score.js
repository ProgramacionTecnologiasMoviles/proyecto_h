import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AuthContext } from "../../contexts/WebSocketContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useWebSocket } from "../../contexts/WebSocketContext";
import { match_info, players_id_match } from "../../services/GameService";
import { credits_transation } from "../../services/GameService";
import { removeTrailingZeros } from "../../services/GameService";
import { get_name_player } from "../../services/GameService";

export default function Score({ route, navigation }) {
  const { loser } = route.params;
  const { ws } = useWebSocket();
  const { user } = useContext(AuthContext);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [w_name, setWname] = useState("");
  const [l_name, setLname] = useState("");
  const [winner, setWinner] = useState("");
  const [info, setInfo] = useState(false);
  const [info_game, setInfogame] = useState(false);
  const { gameId, hostPlayer } = route.params;
  const isLoser = loser == user.id;

  //recibe los datos de los id de los jugadores del websocket
  useEffect(() => {
    const fetchPlayersInfo = async () => {
      if (!info) {
        try {
          credentials = {
            id: removeTrailingZeros(gameId),
          };
          const data = await players_id_match(credentials);
          if (!data) throw new Error("Received undefined data");
          setPlayer1(data.hostUser);
          setPlayer2(data.guessUser);
          setInfo(true);
        } catch (error) {
          console.error("Failed to fetch player data:", error);
        }
      }
    };
    fetchPlayersInfo();
  }, []);

  useEffect(() => {
    if (player1 && player2 && loser) {
      if (loser == player1) {
        setWinner(player2);
      } else if (loser == player2) {
        setWinner(player1);
      } else {
        console.error("Loser does not match any player");
      }
    }
  }, [player1, player2, loser, ws]);
  useEffect(() => {
    if (winner && loser) {
      const name_function = async () => {
        try {
          nameCredentials = {
            winner_id: winner,
            loser_id: loser,
          };
          const names = await get_name_player(nameCredentials);
          if (!names) throw new Error("Received undefined data");
          console.log("sdssdd", names);
          setWname(names.winner_name);
          setLname(names.loser_name);
          setInfogame(true);
        } catch (error) {
          console.error("Failed to fetch names:", error);
        }
      };
      name_function();
    }
  }, [winner, loser]);

  useEffect(() => {
    if (!info_game) {
      if (winner && hostPlayer) {
        const updateGameData = async () => {
          setInfogame(true);
          try {
            const matchCredentials = {
              hostUser: user.id,
              guessUser: parseInt(loser, 10),
              creditsbetted: 10,
              game: 1,
              winner: winner,
              loser: parseInt(loser, 10),
              score: 1,
              id: removeTrailingZeros(gameId),
            };
            await match_info(matchCredentials);
            const creditCredentials = {
              user_winner: winner,
              user_loser: loser,
              credits_bet: 1,
            };
            await credits_transation(creditCredentials);
            const nameCredentials = {
              winner_id: winner,
              loser_id: loser,
            };
          } catch (error) {}
        };
        updateGameData();
      }
    }
  }, [winner, hostPlayer, loser, gameId]);
  console.log(info_game);
  return (
    <View style={styles.container}>
      {isLoser ? (
        <>
          <View style={styles.podiumContainer}>
            <Text style={styles.header}>GANADOR </Text>
            <Text style={styles.header}>{w_name}</Text>

            {/* Winner Trophy */}
            <Image
              source={require("../../assets/giff.gif")}
              style={styles.trophy}
            />

            {/* Podium for Players */}
            <View style={styles.playersContainer}>
              <View style={[styles.playerPodium, styles.winnerPodium]}>
                <Image
                  source={require("../../assets/red_bird.png")}
                  style={styles.bird}
                />
                <Text style={styles.playerText}>1° Lugar : {w_name}</Text>
              </View>
              <View style={styles.playerPodium}>
                <Image
                  source={require("../../assets/yellow_bird.png")}
                  style={styles.bird}
                />
                <Text style={styles.playerText}>2° Lugar : {l_name}</Text>
              </View>
            </View>
            <View style={styles.navBar}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.linkText}>Go to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.podiumContainer}>
          <Text style={styles.header}>GANADOR </Text>
          <Text style={styles.header}>{w_name}</Text>

          <Image
            source={require("../../assets/giff.gif")}
            style={styles.trophy}
          />

          <View style={styles.playersContainer}>
            <View style={[styles.playerPodium, styles.winnerPodium]}>
              <Image
                source={require("../../assets/yellow_bird.png")}
                style={styles.bird}
              />
              <Text style={styles.playerText}>1° Lugar : {w_name}</Text>
            </View>
            <View style={styles.playerPodium}>
              <Image
                source={require("../../assets/red_bird.png")}
                style={styles.bird}
              />
              <Text style={styles.playerText}>2° Lugar : {l_name}</Text>
            </View>
          </View>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.linkText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    marginTop: 140,
    bottom: 10,
    width: "100%",
    alignItems: "center", // Center the link text horizontally
  },
  linkText: {
    color: "blue",
    fontSize: 26,
    fontFamily: "Fredoka_500Medium",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff3b4",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 92,
    color: "#295F98",
    marginBottom: 20,
  },
  podiumContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  trophy: {
    width: 380,
    height: 380,
    marginBottom: 30,
  },
  playersContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  playerPodium: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  winnerPodium: {
    marginBottom: 40,
  },
  bird: {
    width: 200,
    height: 200,
  },
  playerText: {
    fontFamily: "Fredoka_500Medium",
    fontSize: 36,
    marginTop: 10,
  },
});
