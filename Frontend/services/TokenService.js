import * as SecureStore from "expo-secure-store";

let token = null;
//------- funcion para guardar token en local storage para web -------------//
export function setToken(newToken) {
  token = newToken;
  if (token !== null) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}
export async function getToken() {
  token = localStorage.token;
  if (token !== null) {
    return token;
  }
  token = await SecureStore.getItemAsync("token");
  return token;
}
