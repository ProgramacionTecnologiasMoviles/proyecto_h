import axios from "axios";

const url = "http://192.168.115.42:3000";
const useCreateGame = async () => {
  try {
    const response = await axios.get(`${url}/game`);
    console.log(response.data.data.gameId);
    return response.data.data.gameId;
  } catch (error) {
    console.log(error);
  }
};

export default useCreateGame;
