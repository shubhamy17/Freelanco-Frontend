import axiosInstance from "../axios";

export const getNotification = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/notification`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
