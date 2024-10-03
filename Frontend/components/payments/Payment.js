import { WebView } from "react-native-webview";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { create_order } from "../../services/PaypalService";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Payment() {
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
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
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
});
