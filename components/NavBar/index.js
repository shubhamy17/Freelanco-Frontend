import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { requestMessage, verifySignature } from "../../api/auth";

import jwt_decode from "jwt-decode";

// import { ConnectButton } from "web3uikit";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useAuth from "../../hooks/useAuth";

import {
  useAccount,
  useConnect,
  useSignMessage,
  useDisconnect,
  useNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const NavBar = () => {
  const router = useRouter();
  const {
    isLoggedIn,
    user,
    setIsLoggedIn,
    setToken,
    isSellerYet,
    setUser,
    AsSeller,
    setAsSeller,
    chainId,
  } = useAuth();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { chain } = useNetwork();

  console.log("C:", chain);
  console.log("A:", address);
  console.log("CHAINID: ", chainId);

  const isDarkPage =
    router.pathname === "/" ||
    router.pathname === "/dao" ||
    router.pathname.includes("/dao-home");

  const isSignInPage =
    router.pathname === "/login" ||
    router.pathname == "/dao-login" ||
    router.pathname == "/checkout" ||
    router.pathname == "/freelancer";
  const isSearchPage =
    router.pathname === "/gigs" || router.pathname == "/explore";

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
    setUser(null);
    setIsLoggedIn(false);
  };

  // RainbowKit.onWalletChange(async (wallet) => {
  //   connectAndSign();
  //   // const data = await response.json();
  // });

  useEffect(() => window.addEventListener("scroll", changeNavbarColor));


  const colorChangeClass = colorChange
    ? "bg-white text-blue-800"
    : isDarkPage
      ? "bg-transparent text-white"
      : "bg-transparent text-blue-800";

  const borderClass = isDarkPage
    ? colorChange
      ? " border-blue-800"
      : " "
    : " border-blue-800";

  return (
    <nav
      className={
        "flex justify-between py-3 fixed top-0 left-0 right-0 transition ease-in-out delay-100 px-28 " +
        colorChangeClass
      }
      style={{
        zIndex: 10000,
      }}
    >
      <h2 className="cursor-pointer flex items-center">
        <Link href="/" className="font-extrabold text-4xl ">
          Freelanco.
        </Link>
        <span className={"text-md ml-2 px-2 border rounded-2xl" + borderClass}>
          Beta
        </span>

        {isSearchPage && (
          <>
            <div className="flex justify-start items-center ml-5 mt-1">
              <input
                type="text"
                className="placeholder:italic placeholder:text-slate-500 w-[30vw] block rounded-l-lg bg-white h-10 border border-slate-300 py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-blue-800 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-blue-800"
                placeholder={
                  isSearchPage
                    ? "What service are you looking for today?"
                    : "Try 'building mobile app'"
                }
              />
              <div className="h-10 w-10 bg-blue-800 rounded-r-lg flex justify-center items-center hover:bg-blue-800 cursor-pointer mr-2">
                <img
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                  className="h-5 w-5"
                  src="https://img.icons8.com/ios-glyphs/344/search--v1.png"
                  alt=""
                />
              </div>
            </div>
          </>
        )}
      </h2>

      <div className="flex justify-end gap-x-6 my-2">
        {!isSignInPage && (
          <>
            {isLoggedIn && (
              <>
                {/* <span
                  className={
                    "font-light border-2 px-3 py-1 rounded-md text-sm cursor-pointer -mt-1 " +
                    borderClass
                  }
                >
                  <Link href="/login">Post a Job</Link>
                </span> */}
                {router.pathname === "/freelancer" ||
                  router.pathname === "/seller" ||
                  router.pathname === "/seller-profile" ? (
                  <></>
                ) : (
                  <>
                    <span
                      className={
                        "font-light border-2 px-3 py-1 rounded-md text-sm cursor-pointer -mt-1 " +
                        borderClass
                      }
                    >
                      <Link href="/conversation">Messages</Link>
                    </span>
                    <span
                      className={
                        "font-light border-2 px-3 py-1 rounded-md text-sm cursor-pointer -mt-1 " +
                        borderClass
                      }
                    >
                      {user?.freelancer_ref ? (
                        router.pathname.includes("gig") ||
                          router.pathname === "/" ? (
                          <Link href="/seller">Profile</Link>
                        ) : (
                          <Link href="seller">Switch to Seller</Link>
                        )
                      ) : (
                        <>
                          <a href="/freelancer">Become a Seller</a>
                        </>
                      )}
                    </span>
                    <span
                      className={
                        "font-light border-2 px-3 py-1 rounded-md text-sm cursor-pointer -mt-1 " +
                        borderClass
                      }
                    >
                      <Link href="/client-profile">Orders</Link>
                    </span>
                  </>
                )}
              </>
            )}

            {router.pathname === "/dao-login" ? (
              <></>
            ) : (
              <>
                {!isLoggedIn ? (
                  <>
                    <a
                      href="https://freelancodao.gitbook.io/freelancodao/"
                      className="font-light cursor-pointer text-sm mt-1"
                      target="_Blank"
                    >
                      White Paper
                    </a>
                    <Link
                      href="/faq"
                      className="font-light cursor-pointer text-sm mt-1"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/dao-login"
                      className="font-light cursor-pointer text-sm mt-1"
                    >
                      DAO
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}

            {!isLoggedIn ? (
              <>
                <Link href="/explore">
                  <span
                    className={
                      "font-light cursor-pointer text-sm mt-1  " + borderClass
                    }
                  >
                    Explore
                  </span>
                </Link>

                <span
                  className={
                    "font-light border-2 px-3 py-1 rounded-md text-sm cursor-pointer -mt-1 " +
                    borderClass
                  }
                >
                  <Link href="/login">Connect</Link>
                </span>
              </>
            ) : (
              <>
                {/* when logged in */}
                {router.pathname === "/explore" ||
                  router.pathname === "/gigs" ? (
                  isSellerYet ? (
                    <a href="/seller">
                      <span className="font-light cursor-pointer text-sm mt-1">
                        Profile
                      </span>
                    </a>
                  ) : (
                    <></>
                  )
                ) : (
                  <>
                    <Link href="/explore">
                      <span
                        className={
                          "font-light border-2 px-3 py-1.5 rounded-md text-sm cursor-pointer -mt-1 " +
                          borderClass
                        }
                      >
                        Explore
                      </span>
                    </Link>
                    <span
                      onClick={() => signOut()}
                      href="/dao-login"
                      className={
                        "font-light border-2 px-3 py-1 rounded-md text-sm cursor-pointer -mt-1 " +
                        borderClass
                      }
                    >
                      Sign Out
                    </span>
                  </>
                )}
              </>
            )}
          </>
        )}
        {/* <div onClick={() => connectAndSign()}> */}

        {/* </div> */}
        {isSignInPage ? (
          <ConnectButton />
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
