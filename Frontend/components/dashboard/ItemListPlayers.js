import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ItemListPlayers({ name, wins, index }) {
  return (
    <View style={[styles.container, index === 0 && styles.first]}>
      <Text style={styles.text}>{name}</Text>
      <View style={{ flexDirection: "row" }}>
        {index == 0 && (
          <AntDesign
            name="Trophy"
            size={25}
            color="black"
            style={styles.trophy}
          />
        )}
        <Text style={styles.text}>{wins}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 40,
    borderWidth: 4,
    borderRadius: 10,
    paddingVertical: 5,
  },
  text: {
    fontSize: 23,
    fontFamily: "Fredoka_600SemiBold",
  },
  first: {
    borderColor: "#ff2a00",
    flexDirection: "row",
    borderWidth: 8,
  },
  trophy: {
    fontWeight: "bold",
    marginRight: 20,
  },
});
