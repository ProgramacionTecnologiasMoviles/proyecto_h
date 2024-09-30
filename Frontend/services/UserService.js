import axios from "../../Frontend/hooks/axios";
import { getToken } from "./TokenService";

export async function updateUserData(params, userId) {
  const token = await getToken();
  const { data } = await axios.put(`/users/${userId}`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
