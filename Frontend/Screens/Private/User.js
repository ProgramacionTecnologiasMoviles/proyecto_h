import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { AuthContext } from "../../contexts/WebSocketContext";
import { useContext } from "react";
import { logout } from "../../services/AuthService";
import { useFetchCreditsHistory } from "../../hooks/useFetchCreditsHistory";

export default function User() {
  const { user, setUser } = useContext(AuthContext);
  const { userHistory } = useFetchCreditsHistory(user.id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{user.username}</Text>
        <Text style={styles.title}>Coins - {user.credits}</Text>
      </View>
      <View style={styles.userDataContainer}>
        <Text style={styles.label}>Fullname</Text>
        <Text style={styles.input}>{user.fullname}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.input}>{user.email}</Text>
      </View>

      <View style={styles.creditsContainer}>
        <View style={styles.creditsBox}>
          <View style={styles.creditBox}>
            <Text style={styles.titleCredits}> Credits Won</Text>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>{userHistory.creditsWon}</Text>
            </View>
          </View>
          <View style={styles.creditBox}>
            <Text style={styles.titleCredits}> Credits available</Text>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>{user.credits}</Text>
            </View>
          </View>
        </View>
        <View style={styles.creditsBox}>
          <View style={styles.creditBox}>
            <Text style={styles.titleCredits}> Credits Loss</Text>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>{userHistory.creditsLoss}</Text>
            </View>
          </View>
          <View style={styles.creditBox}>
            <Text style={styles.titleCredits}> Credits withdrawn</Text>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>0</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buyCreditsBox}>
        <Text style={styles.label}>Buy more credits</Text>
        <Text>Aqui va el boton de Paypal</Text>
      </View>
      <Pressable onPress={() => logout(setUser)} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D9BF0",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: "5%",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    height: 100,
    fontFamily: "Fredoka_600SemiBold",
  },
  userDataContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 25,
    fontFamily: "Fredoka_600SemiBold",
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#000000",
    color: "black",
    marginBottom: 5,
    shadowOffset: { width: -4, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    textAlignVertical: "center",
    fontFamily: "Fredoka_600SemiBold",
    fontSize: 22,
  },
  creditsContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    marginRight: 20,
  },
  creditsBox: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 20,
  },
  creditBox: {
    width: "50%",
    alignItems: "center",
  },
  titleCredits: {
    fontSize: 20,
    fontFamily: "Fredoka_600SemiBold",
    marginBottom: 10,
  },
  amountBox: {
    height: 50,
    width: 50,
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 10,
  },
  amount: {
    fontSize: 20,
    fontFamily: "Fredoka_600SemiBold",
  },
  buyCreditsBox: {
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    height: 60,
    width: "50%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Fredoka_600SemiBold",
  },
});
