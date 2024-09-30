import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AuthContext } from "../../contexts/WebSocketContext";
import { useContext } from "react";

export default function Score({ route }) {
  const { loser } = route.params;

  const { user } = useContext(AuthContext);

  const isLoser = loser == user.id;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {isLoser ? "Haz perdido :(" : "Haz ganado!"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9C527",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "10%",
    marginTop: 55,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
