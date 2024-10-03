import { AuthContext } from "../../contexts/WebSocketContext";
import { useContext } from "react";
import { logout } from "../../services/AuthService";
import { useFetchCreditsHistory } from "../../hooks/useFetchCreditsHistory";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import React, { useState } from "react";
import { useRef } from "react";
import { capture_order, create_order } from "../../services/PaypalService";

export default function User() {
  const { user, setUser } = useContext(AuthContext);
  const { userHistory } = useFetchCreditsHistory(user.id);
  const webviewRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [number, onChangeNumber] = useState("");

  const handlePress = async () => {
    setLoading(true);
    if (number) {
      credentials = {
        currency: "USD",
        value: number,
      };
      const response = await create_order(credentials);
      console.log(response);
      if (response) {
        setUrl(response.url);
      }
    }
  };
  const handleNavigationStateChange = async (navState) => {
    const { url } = navState;
    if (url && url.includes("PayerID")) {
      setUrl(null);
      webviewRef.current.stopLoading();

      const orderId = url.match(/[?&]token=([^&]+)/)[1];
      const { data } = await capture_order(orderId, user.id);
      if (data) {
        setUser({ ...user, credits: user.credits + Number(number) });
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {url ? (
        <WebView
          source={{ uri: url }}
          ref={webviewRef}
          style={{ flex: 1, marginTop: 40 }}
          setSupportMultipleWindows={false}
          onNavigationStateChange={handleNavigationStateChange}
        />
      ) : (
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
            <View style={styles.inputCredits}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                textAlign={"center"}
                placeholder="Insertar el numero de creditos"
                keyboardType="numeric"
              />
            </View>
            {loading ? (
              <ActivityIndicator size="medium" color="#000" />
            ) : (
              <TouchableOpacity
                onPress={handlePress}
                style={styles.paypal}
                disabled={!number}
              >
                <Text style={styles.buttonTextPaypal}>Pay with PayPal</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.logout}>
            <Pressable onPress={() => logout(setUser)} style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D9BF0",
  },
  input: {
    height: 40,
    maxWidth: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    alignContent: "center",
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
    marginTop: 5,
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
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  button: {
    height: 60,
    width: "30%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  paypal: {
    height: 60,
    width: "50%",
    backgroundColor: "#FCBB32",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 20,
  },
  buttonTextPaypal: {
    color: "#0070BA",
    fontSize: 20,
    fontFamily: "Fredoka_600SemiBold",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Fredoka_600SemiBold",
  },
  logout: {
    alignItems: "center",
  },
});
