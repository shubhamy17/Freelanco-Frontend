// import React, { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { useRouter } from "next/router";

// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { signIn } from "next-auth/react";
// import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
// import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
// import { AxiosRetry } from "moralis/common-core";
// import axios from "axios";
// // import Web3 from "web3";
// // import { registerUser } from "../api/auth";
// // import { getCategories } from "../api/basic";

// const RegisterForm = ({ setWantsToLogin }) => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const router = useRouter();
//   const { setUser, setIsLoggedIn } = useAuth();
//   const { account } = useMoralis();
//   const { connectAsync } = useConnect();
//   const { disconnectAsync } = useDisconnect();
//   const { isConnected } = useAccount();
//   const { signMessageAsync } = useSignMessage();
//   const { requestChallengeAsync } = useAuthRequestChallengeEvm();
//   const { push } = useRouter();

//   const signUp = async () => {
//     if (isConnected) {
//       await disconnectAsync();
//     }

//     const { account, chain } = await connectAsync({
//       connector: new MetaMaskConnector(),
//     });

//     console.log(account, chain);
//     const result = await axios.post("http://localhost:8080/", {
//       wallet_address: account,
//       chainId: chain.id,
//     });
//     // const { message } = await requestChallengeAsync();
//     const message = result.data.message;
//     const signature = await signMessageAsync({ message: message });

//     // redirect user after success authentication to '/user' page
//     await axios
//       .post("http://localhost:8080/verify", {
//         message: message,
//         signature: signature,
//         email,
//         name,
//       })
//       .then((result) => {
//         console.log(result);
//         localStorage.setItem("access_token", result.data.token);
//         setIsLoggedIn(true);
//         router.push("/");
//       })
//       .catch((error) => {
//         console.log(error);
//         alert(error.response.data.err);
//       });

//     // await registerUser({
//     //   email,
//     //   name,
//     //   wallet_address: account,
//     // })
//     //   .then((res) => {
//     //     alert(res.message);
//     //     setWantsToLogin(true);
//     //   })
//     //   .catch((err) => alert(err.response.data.error));
//   };

//   return (
//     <div className="flex flex-col ml-20 mt-20">
//       <h1 className="text-7xl font-black text-blue-800">Welcome</h1>
//       <p className="mt-2 text-gray-400 text-sm font-light">
//         Make the world decentralised.
//       </p>
//       <form className="flex flex-col mt-2" onSubmit={(e) => e.preventDefault()}>
//         <>
//           <label for="name" className="text-sm font-semibold text-gray-500">
//             Name
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="placeholder:italic placeholder:text-slate-400 block bg-white h-12 my-2 w-3/4 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
//           />
//           <label for="email" className="text-sm font-semibold text-gray-500">
//             Email address
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="placeholder:italic placeholder:text-slate-400 block bg-white h-12 my-2 w-3/4 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
//           />
//           <label for="email" className="text-sm font-semibold text-gray-500">
//             Wallet
//           </label>
//           <input
//             type="text"
//             disabled={true}
//             placeholder={account ? String(account) : "Connect your wallet"}
//             className="placeholder:italic placeholder:text-slate-400 block bg-gray-100 bg-opacity-5 h-12 my-2 w-3/4 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
//           />
//           <button
//             onClick={() => {
//               if (email && account) {
//                 signUp();
//               }
//             }}
//             className="w-3/4 border border-blue-800 rounded-2xl my-4 py-2 text-blue-800 font-light"
//           >
//             Sign Up
//           </button>
//         </>
//       </form>
//       <div className="flex row justify-start space-x-2">
//         <p className="font-sm font-light">Already a member?</p>{" "}
//         <span
//           className="text-blue-500 cursor-pointer hover:underline"
//           onClick={() => setWantsToLogin(true)}
//         >
//           {" "}
//           Sign in{" "}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;
