import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useEditDataUser } from "../../hooks/useEditDataUser";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native";

export default function User() {
  const { user, editing, setEditing, handleEdit } = useEditDataUser();

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <WebView
        source={{ uri: "http://192.168.20.51:8080/" }}
        style={{ flex: 1 }}
        setSupportMultipleWindows={false}
      />
    </SafeAreaView>
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
