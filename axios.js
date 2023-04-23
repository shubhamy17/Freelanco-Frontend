import axios from "axios";
// const baseURL = "https://freelanco-dao-api.onrender.com/";
import { baseURL } from "./constants-url";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 50000000,
  // withCredentials: true,
});

const updateToken = () => {
  new Promise((res, rej) => {
    res(localStorage.getItem("token"));
  })
    .then((token) => {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      axiosInstance.defaults.headers.common["User-Agent"] =
        "PostmanRuntime/7.32.2";
    })
    .catch((err) => console.log(err));
};

axiosInstance.interceptors.request.use(
  (config) => {
    updateToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
