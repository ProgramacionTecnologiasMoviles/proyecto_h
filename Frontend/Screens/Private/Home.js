import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/WebSocketContext";
import { create_match } from "../../services/GamseService";
import PaypalComponent from "../../components/PaypalComponent";

export default function Home({ navigation }) {
  const [number, onChangeNumber] = React.useState("");
  const { user, setUser } = useContext(AuthContext);
  const handleSubmit = () => {
    navigation.navigate("LobbyGame", { gameId: number, hostPlayer: false });
  };

  const handlePlay = async () => {
    credentials = {
      hostUser: user.id,
      game: 1,
      creditsbetted: 10,
    };
    const gameId = await create_match(credentials);
    navigation.navigate("LobbyGame", { gameId, hostPlayer: true });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hi {user.username}</Text>
        <Text style={styles.title}>Coins - 0</Text>
      </View>
      <View style={styles.gameContainer}>
        <View style={styles.imageShadow}>
          <Image
            source={require("../../assets/flappybirdlogo.png")}
            style={styles.gameImage}
          ></Image>
        </View>
      </View>
      <View style={styles.playContainer}>
        <Image
          source={require("../../assets/playButtonImage.png")}
          style={styles.playButtonImage}
        ></Image>
        <Pressable title="" onPress={handlePlay} style={styles.playButton} />
      </View>
      <View style={styles.joinGameContainer}>
        <Text style={styles.joinGameText}>Join a Game</Text>
        <TextInput
          placeholder="Room code"
          style={styles.joinGameInput}
          keyboardType="numeric"
          value={number}
          onChangeText={onChangeNumber}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.Paypal}>
        <PaypalComponent ammount={1} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9C527",
    alignItems: "center",
  },
  Paypal: {
    margin: 15,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    height: 100,
    fontWeight: "bold",
  },
  gameContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    padding: 10,
  },
  gameImage: {
    marginRight: 20,
    height: 300,
    width: 300,
  },
  imageShadow: {
    paddingTop: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    height: 335,
    width: 338,
    backgroundColor: "black",
  },
  playContainer: {
    marginTop: -60,
    width: "100%",
    alignItems: "center",
  },
  playButtonImage: {
    height: 100,
    width: 200,
  },
  playButton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  joinGameContainer: {
    flex: 1,
    alignItems: "center",
    height: "40%",
    width: "100%",
  },
  joinGameText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  joinGameInput: {
    width: "70%",
    padding: 10,
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 20,
    marginTop: 15,
    backgroundColor: "white",
  },
});
