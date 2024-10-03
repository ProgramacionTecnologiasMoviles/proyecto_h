import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { create_order } from "../../services/PaypalService";

export default function User() {
  const webviewRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [id_order, setIdOrder] = useState(null);

  credentials = {
    currency: "USD",
    value: "100",
  };
  const handlePress = async () => {
    const response = await create_order(credentials);
    console.log(response);
    if (response) {
      setUrl(response.url);
    }
  };
  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url && url.includes("PayerID")) {
      setUrl(null);
      webviewRef.current.stopLoading();
    }
  };

  return (
    <View style={styles.container}>
      {url ? (
        <WebView
          source={{ uri: url }}
          ref={webviewRef}
          style={{ flex: 1 }}
          setSupportMultipleWindows={false}
          onNavigationStateChange={handleNavigationStateChange}
        />
      ) : (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Pay with PayPal</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
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
