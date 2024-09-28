import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function MatchBox({ title, amount }) {
  return (
    <View style={styles.matchContainer}>
      <Text style={styles.matchText}>{title}</Text>
      <Text style={styles.matchText}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  matchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 6,
    borderColor: "black",
    borderRadius: 15,
    width: "90%",
    padding: 20,
    marginBottom: 10,
  },
  matchText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
