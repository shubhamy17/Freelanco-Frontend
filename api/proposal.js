import axiosInstance from "../axios";

export const addProposal = (formData) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/proposal`, formData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const getProposalByGigRef = (formData) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/proposal/getProposalByStatus`, formData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const getOrders = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/proposal/getOrders`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const updateProposal = (proposalId, status) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`/proposal/${proposalId}/${status}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const getProposolsOfDao = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/proposal/getProposolsOfDao`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};
export const getDaoTreasury = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/proposal/getDaoTreasury`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};
