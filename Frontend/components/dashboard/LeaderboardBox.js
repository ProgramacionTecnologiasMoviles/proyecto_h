import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import ItemListPlayers from "./ItemListPlayers";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function LeaderboardBox({ leaderboard }) {
  return (
    <View style={styles.leaderboardContainer}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.subtitlesBox}>
        <Text style={styles.subtitle}>Player</Text>
        <Text style={styles.subtitle}>Wins</Text>
      </View>

      <FlatList
        data={leaderboard}
        renderItem={({ item, index }) => (
          <ItemListPlayers
            name={item.fullname}
            wins={item.matches_won_count}
            index={index}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.podiumContainer}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderboardContainer: {
    width: "80%",
    borderWidth: 6,
    height: "50%",
    marginBottom: 110,
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: "Fredoka_600SemiBold",
  },
  subtitlesBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Fredoka_600SemiBold",
  },
  podiumContainer: {
    width: "100%",
    margin: 10,
  },
});
