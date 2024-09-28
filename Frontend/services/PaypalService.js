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
export async function update_credits(credits) {
  const { user, setUser } = useContext(AuthContext);
  const token = await getToken();
  console.log(credits);
  data_store = {
    account_number: credits.purchase_units.ammount.value,
  };
  console.log(data_store);
  const { data } = await axios.put("/bank_accounts", credits, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
}
