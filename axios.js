import axios from "axios";
// const baseURL = "https://freelanco-dao-api.onrender.com/";
import { baseURL } from "./constants";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 50000000,
});

const updateToken = () => {
  new Promise((res, rej) => {
    res(localStorage.getItem("token"));
  })
    .then((token) => {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
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
