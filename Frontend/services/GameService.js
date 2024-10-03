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
export async function add_player_match(credentials) {
  const token = await getToken();
  const response = await axios.patch("/match", credentials, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function players_id_match(id) {
  try {
    const token = await getToken();
    const response = await axios.post("/match_info", id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data");
    }
  } catch (error) {
    console.error("Error fetching :", error);
    throw error;
  }
}

export async function get_name_player(id) {
  try {
    const token = await getToken();
    const response = await axios.post("/name_players", id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data");
    }
  } catch (error) {
    console.error("Error fetching :", error);
    throw error;
  }
}

export function removeTrailingZeros(input) {
  return parseInt(input, 10);
}
