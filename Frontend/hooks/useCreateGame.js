import axios from "axios";

const url = "http://192.168.54.42:8000/api";
const useCreateGame = async () => {
  try {
    data = { hostUser: 3, creditsbetted: 10, game: 1 };
    const response = await axios.post(`${url}/create_match`, data);
    console.log(response);
    console.log(response.data.id);
    return response.data.id;
  } catch (error) {
    console.log(error);
  }
};

export default useCreateGame;
