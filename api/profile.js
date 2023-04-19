
import axiosInstance from "../axios";

export const updateUserProfile = (freelancerIid, formData) => {
  console.log(freelancerIid, formData);
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`/profile/${freelancerIid}`, formData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const freelancerProfile = (freelancerIid) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/profile/${freelancerIid}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};