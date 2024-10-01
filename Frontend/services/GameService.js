import axios from "../hooks/axios";
import { getToken, setToken } from "./TokenService";

export async function create_match(credentials) {
  const { data } = await axios.post("/create_match", credentials);
  return data.id;
}

export async function match_info(credentials) {
  const token = await getToken();
  const { data } = await axios
    .put(`/match`, credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}

export async function credits_transation(credentials) {
  const token = await getToken();
  const { data } = await axios
    .post("/update_Credits", credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
