import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import MatchBox from "../../components/dashboard/MatchBox";
import { useFetchStatisticsUser } from "../../hooks/useFetchStatisticsUser";

export default function Dashboard() {
  const { userStatistics, loading } = useFetchStatisticsUser();
  console.log(loading, userStatistics);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.title}>Coins</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View style={styles.matchesContainer}>
          <MatchBox title={"Wins"} amount={userStatistics.credits_won} />
          <MatchBox title={"Loses"} amount={0} />
        </View>
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
    fontWeight: "bold",
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
  matchText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
