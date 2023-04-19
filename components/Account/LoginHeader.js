import React from "react";
import Image from "next/image";
// import quotesImage from "../public/quotes.png";

const LoginHeader = () => {
  return (
    <div className="h-full flex flex-col items-center p-8 rounded-md">
      <Image
        src="/quotes.png"
        alt=""
        className="h-24 w-32"
        width={70}
        height={70}
        style={{
          filter: "brightness(1) invert(1)",
        }}
      />
      <h1 className="px-24 py-5 font-serif font-black text-2xl text-blue-800 text-center">
        The blockchain does one <br /> thing: it replaces third-party <br />
        trust with mathematical <br /> proof that something <br /> happend
      </h1>
      <span className="w-16 border-b-4 mt-2 rounded-full border-[#1E509B]"></span>
      <p className="font-sans text-md mt-1 text-[#1E509B] text-center">
        Adam Dapper
      </p>
    </div>
  );
};

export default LoginHeader;
