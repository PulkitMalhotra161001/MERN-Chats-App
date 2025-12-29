import axios from "axios";

export const axiosInstance = axios.create({
  // backend running port
  baseURL: "http://localhost:5001/api",
  // send cookies in every single request
  withCredentials: true,
});
