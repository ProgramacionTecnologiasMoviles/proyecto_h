import axiosLib from "axios";
const axios = axiosLib.create({
  baseURL: "http://192.168.208.108:8000/api",
  headers: {
    Accept: "application/json",
  },
});
export default axios;
