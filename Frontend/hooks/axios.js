import axiosLib from "axios";
const axios = axiosLib.create({
  baseURL: "http://192.168.20.51:8000/api",
  headers: {
    Accept: "application/json",
  },
});
export default axios;
