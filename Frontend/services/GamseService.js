import axios from "../../Frontend/hooks/axios";
import { getToken, setToken } from "./TokenService";

export async function create_match(credentials) {
  const { data } = await axios.post("/create_match", credentials);
  return data.id;
}
