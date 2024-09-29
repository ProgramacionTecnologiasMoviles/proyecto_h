import React, { useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { StyleSheet } from "react-native";
import { AuthContext } from "../contexts/WebSocketContext";
import { add_credits, bank_information } from "../services/PaypalService";

export default function PaypalComponent({ ammount }) {
  const { user, setUser } = useContext(AuthContext);
  return (
    <PayPalScriptProvider>
      <PayPalButtons
        style={styles.buttons}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: ammount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            bank_information(details);
            add_credits(ammount, user);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
const styles = StyleSheet.create({
  buttons: {
    shape: "rect",
    layout: "vertical",
  },
});
