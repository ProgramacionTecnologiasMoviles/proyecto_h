import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { AuthContext } from "../../contexts/WebSocketContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useWebSocket } from "../../contexts/WebSocketContext";
import { match_info } from "../../services/GameService";
import { credits_transation } from "../../services/GameService";

export default function Score({ route }) {
  const { loser } = route.params;
  const { ws } = useWebSocket();
  const { user } = useContext(AuthContext);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [winner, setWinner] = useState("");
  const { gameId, hostPlayer } = route.params;
  const isLoser = loser == user.id;
  function removeTrailingZeros(input) {
    return parseInt(input, 10);
  }
  //recibe los datos de los id de los jugadores del websocket
  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("indo fe de ", data);
      if (data.players) {
        setPlayer1(parseInt(data.players[0]));
        setPlayer2(parseInt(data.players[1]));
      }
    };
    return () => {
      ws.onmessage = null;
    };
  }, [ws]);
  // actualiza los valores de winner
  useEffect(() => {
    console.log("Players updated:", player1, player2);
  }, [player1, player2]);

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

  // envia la informacion del match al backend
  async function update_match(credentials) {
    try {
      await match_info(credentials);
      console.log("Informacion de la partida actualizada");
    } catch (error) {
      console.log(e);
    }
  }

  console.log("winner existe ", winner);
  console.log("hostplayer existe ", hostPlayer);

  if (hostPlayer && winner) {
    if (winner == user.id) {
      console.log("hostplayer", user.id);
      credentials_match_info = {
        hostUser: user.id,
        guessUser: parseInt(loser),
        creditsbetted: 10,
        game: 1,
        winner: winner,
        loser: parseInt(loser),
        score: 1,
        id: removeTrailingZeros(gameId),
      };
      update_match(credentials_match_info);
      credentials_credits = {
        user_winner: winner,
        user_loser: loser,
        credits_bet: 1,
      };
      credits_transation(credentials_credits);
    } else {
      console.log("hostplayer", user.id);
      let credentials_match_info = {
        hostUser: user.id,
        guessUser: parseInt(winner),
        creditsbetted: 10,
        game: 1,
        winner: winner,
        loser: parseInt(loser),
        score: 1,
        id: removeTrailingZeros(gameId),
      };
      update_match(credentials_match_info);
      credentials_credits = {
        user_winner: winner,
        user_loser: loser,
        credits_bet: 1,
      };
      credits_transation(credentials_credits);
    }
  }

  return (
    <View style={styles.container}>
      {isLoser ? (
        <>
          <Text>Perdedor {loser}</Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>Ganador {winner}</Text>
          <View style={styles.podiumContainer}>
            <Image
              source={require("../../assets/trophy.png")}
              style={styles.trophy}
            />
            <View style={styles.playersContainer}>
              <View style={styles.playerPodium}>
                <Image
                  source={require("../../assets/sprites/yellowbird-upflap.png")}
                  style={styles.bird}
                />
                <Text style={styles.playerText}>Player 1</Text>
              </View>
              <View style={[styles.playerPodium, styles.winnerPodium]}>
                <Image
                  source={require("../../assets/sprites/redbird-upflap.png")}
                  style={styles.bird}
                />
                <Text style={styles.playerText}>Player 2</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16325B",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: 80,
    color: "white",
  },
  podiumContainer: {
    alignItems: "center",
  },
  trophy: {
    width: 100,
    height: 150,
    marginBottom: 20,
  },
  playersContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  playerPodium: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  winnerPodium: {
    marginTop: -40,
  },
  bird: {
    width: 100,
    height: 70,
  },
  playerText: {
    margin: 50,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
