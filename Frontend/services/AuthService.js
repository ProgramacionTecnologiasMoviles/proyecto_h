import axios from "../../Frontend/hooks/axios";
import { getToken, setToken } from "./TokenService";
import { destroyToken } from "./TokenService";

export async function login(credentials) {
  const { data } = await axios.post("/login", credentials);
  console.log("console log en servicio", data);
  await setToken(data.token);
}
export async function loadUser(credentials) {
  // Se recibe los datos del usuario a partir del token
  const token = await getToken();
  const { data: user } = await axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return user;
}

export async function logout(setUser) {
  destroyToken();
  await setUser(null);
}
