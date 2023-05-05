import React from "react";
import Image from "next/image";
// import quotesImage from "../public/quotes.png";

const LoginHeader = () => {
  return (
    <div
      className="mt-20 flex flex-col items-center p-8 cursor-pointer rounded-xl"
      style={{
        zIndex: 10000,
        background: "rgba(0, 0, 0, 0.5)",
        color: "#f1f1f1",
      }}
    >
      <Image
        src="/quotes.png"
        alt=""
        className="h-24 w-32"
        width={70}
        height={70}
        style={{
          filter: "brightness(0) invert(1)",
        }}
      />
      <h1 className="px-12 py-5 font-serif font-black text-2xl text-white text-center">
        The blockchain does one <br /> thing: it replaces third-party <br />
        trust with mathematical <br /> proof that something <br /> happend
      </h1>
      <span className="w-16 border-b-4 mt-2 rounded-full border-white"></span>
      <p className="font-sans text-md mt-1 text-white text-center">
        Adam Dapper
      </p>
    </div>
  );
};

export default LoginHeader;
