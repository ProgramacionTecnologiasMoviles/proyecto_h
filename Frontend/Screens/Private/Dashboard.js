import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import MatchBox from "../../components/dashboard/MatchBox";
import { useFetchStatisticsUser } from "../../hooks/useFetchStatisticsUser";
import LeaderboardBox from "../../components/dashboard/LeaderboardBox";
import { useContext } from "react";
import { AuthContext } from "../../contexts/WebSocketContext";

export default function Dashboard() {
  const { userStatistics, loading } = useFetchStatisticsUser();
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.title}>Coins - {user.credits}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.matchesContainer}>
            <MatchBox title={"Wins"} amount={userStatistics.wins} />
            <MatchBox title={"Losses"} amount={userStatistics.losses} />
          </View>
          <LeaderboardBox leaderboard={userStatistics.leaderboard} />
        </>
      )}
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
    flexDirection: "row",
    width: "100%",
    height: "10%",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 30,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontFamily: "Fredoka_700Bold",
  },
  matchesContainer: {
    flex: 1,
    height: "30%",
    width: "100%",
    paddingHorizontal: 40,
    alignItems: "center",
  },
  matchContainer: {
    flexDirection: "row",
    borderWidth: 6,
    borderColor: "black",
    borderRadius: 15,
    width: "90%",
    padding: 20,
    marginBottom: 10,
  },
});
