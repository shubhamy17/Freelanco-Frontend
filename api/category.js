import axiosInstance from "../axios";

export const getAllCategories = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(`/category`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const getCategoryImage = (category) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(`/images/` + category)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
