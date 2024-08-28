import { Text } from "react-native";

export default function GameId({ gameId }) {
  return (
    <Text
      style={{
        position: "absolute",
        top: 50,
        left: 20,
        fontSize: 24,
        fontWeight: "bold",
        zIndex: 2,
      }}
    >
      Game ID: {gameId}
    </Text>
  );
}
