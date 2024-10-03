import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useEditDataUser } from "../../hooks/useEditDataUser";
import { logout } from "../../services/AuthService";
import { AuthContext } from "../../contexts/WebSocketContext";
import { useContext } from "react";

export default function User() {
  const { user, editing, setEditing, handleEdit } = useEditDataUser();
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{user.username}</Text>
        <Text style={styles.title}>Coins - {user.credits}</Text>
      </View>
      <View style={styles.userDataContainer}>
        <Text style={styles.label}>Fullname</Text>
        <TextInput
          style={styles.input}
          value={user.fullname}
          onChangeText={(text) => setFullname(text)}
          placeholderTextColor="#ccc"
          editable={editing}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#ccc"
          editable={editing}
        />
        <View style={styles.creditsBox}>
          <View style={styles.creditBox}>
            <Text style={styles.titleCredits}> Credits Spend</Text>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>1</Text>
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
            <Text style={styles.titleCredits}> Credits won</Text>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>1</Text>
            </View>
          </View>
          <View style={styles.creditBox}>
            <Text style={styles.titleCredits}> Credits withdrawn</Text>
            <View style={styles.amountBox}>
              <Text style={styles.amount}>{user.credits}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buyCreditsBox}>
          <Text style={styles.label}>Buy more credits</Text>
          <Text>Aqui va el boton de Paypal</Text>
        </View>

        {editing ? (
          <Pressable style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}> Update </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={() => setEditing(true)}>
            <Text style={styles.buttonText}> Edit Account </Text>
          </Pressable>
        )}

        <Pressable onPress={() => logout(setUser)}>
          <Text style={styles.logout}>Logout</Text>
        </Pressable>
      </View>
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
    fontWeight: "bold",
  },
  userDataContainer: {
    width: "100%",
    padding: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "900",
  },
  buyCreditsBox: {
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    height: 60,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    marginTop: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    // fontFamily: "Fredoka_600SemiBold",
  },
  logout: {
    textAlign: "center",
    marginTop: 10,
    color: "white",
    fontWeight: "bold",
  },
});
