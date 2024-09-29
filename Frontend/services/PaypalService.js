import axios from "../../Frontend/hooks/axios";
import React, { useContext } from "react";
import { getToken, setToken } from "./TokenService";
import { AuthContext } from "../contexts/WebSocketContext";

export async function bank_information(info) {
  const token = await getToken();
  data_store = {
    bank_name: "Paypal",
    date_of_use: info.create_time.toString().split("T")[0],
    account_number: info.payer.email_address,
  };
  const { data } = await axios.post("/bank_accounts", data_store, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
}
export async function add_credits(amount, user) {
  const token = await getToken();
  data_store = {
    id: user.id,
    credits: amount,
  };
  console.log(data_store);
  const { data } = await axios.post("/adding_credits", data_store, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
}
