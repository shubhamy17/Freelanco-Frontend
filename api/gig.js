import axiosInstance from "../axios";

export const createGig = (formData) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(`/gigs`, formData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const getAllGig = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(`/gigs`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const getPopular = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(`/gigs/popularGigs/all`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const getGigByUserId = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(`/gigs/getGigsByUserId`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const getGigByCategory = (data) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(`/gigs/getGigByCategory`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export const updateRating = (id, data) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(`/gigs/${id}/reviews`, data)
      .then((res) => {
        resolve(res.data);
        console.log("rating--->", res.data);
      })
      .catch((err) => reject(err));
  });

export const getGigById = (id) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(`/gigs/${id}`)
      .then((res) => {
        resolve(res.data);
        console.log("rating--->", res.data);
      })
      .catch((err) => reject(err));
  });

export const getGigBySearch = (searchString) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(`/gigs/search/${searchString}`)
      .then((res) => {
        resolve(res.data);
        console.log("rating--->", res.data);
      })
      .catch((err) => reject(err));
  });
