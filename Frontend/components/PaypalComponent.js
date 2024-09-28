import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { StyleSheet } from "react-native";
import { bank_information } from "../services/PaypalService";
import { update_credits } from "../services/PaypalService";
export default function PaypalComponent({ ammount }) {
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
            console.log(value);
            // update_credits(details);
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
