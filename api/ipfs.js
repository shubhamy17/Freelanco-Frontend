
import axiosInstance from "../axios";

export const uploadImage = (formData) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/ipfs/upload_image`, formData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};


export const uploadJson = (formData) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`ipfs/upload_json`, formData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};