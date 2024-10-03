import axiosLib from "axios";

const base_ip = process.env.EXPO_PUBLIC_BASE_IP;

const axios = axiosLib.create({
  baseURL: `http://${base_ip}:8000/api`,
  headers: {
    Accept: "application/json",
  },
});
export default axios;
