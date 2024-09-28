import axios from "../../Frontend/hooks/axios";
import { getToken } from "./TokenService";

export async function fetchUserCreditsWon(userId) {
  const token = await getToken();
  const { data } = await axios.get(`/users/${userId}/total_credits_won`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function fetchUserCreditsLost(userId) {
  const token = await getToken();
  const { data } = await axios.get(`/users/${userId}/total_credits_lose`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
}
