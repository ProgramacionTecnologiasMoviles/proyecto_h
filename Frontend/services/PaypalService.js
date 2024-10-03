import axios from "../hooks/axios";
import { getToken } from "./TokenService";

export async function create_order(credentials) {
  try {
    const { data } = await axios.post("/create_order", credentials);
    console.log(data);
    if (data && data.data && data.data.links && data.data.links[1]) {
      const paymentUrl = data.data.links[1].href;
      const id_order = data.data.id;
      return { url: paymentUrl, id: id_order };
    }
  } catch (error) {
    console.error("Failed to fetch payment URL:", error);
  }
}
