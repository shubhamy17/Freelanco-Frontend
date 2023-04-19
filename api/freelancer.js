import axiosInstance from "../axios";
// export const getFreelancerDetails = (id) =>
//   new Promise((resolve, reject) => {
//     axiosInstance
//       .get(`freelancer-details/${id}`)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => reject(err));
//   });

export const addFreelancer = (formData) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/freelancer`, formData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};
export const getWorkSamples = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/freelancer/getWorkSamples?${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};
// export const postProposal = (formData) =>
//   new Promise((resolve, reject) => {
//     axiosInstance
//       .post(`proposals`, formData)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => reject(err));
//   });

// export const getProposals = () =>
//   new Promise((resolve, reject) => {
//     axiosInstance
//       .get(`proposals`)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => reject(err));
//   });

// export const getContracts = () =>
//   new Promise((resolve, reject) => {
//     axiosInstance
//       .get(`contracts`)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => reject(err));
//   });

// export const updateContract = (jobId, formData) =>
//   new Promise((resolve, reject) => {
//     axiosInstance
//       .patch(`contracts-details/${jobId}`, formData)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => reject(err));
//   });
