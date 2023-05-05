import Image from "next/image";
import React from "react";

const Brands = () => {
  return (
    <section className="bg-black opacity-95">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center">
              <span className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]">
                <Image
                  src="/clogo.png"
                  alt=""
                  className="h-10 w-full"
                  width={100}
                  height={100}
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </span>
              <span className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png"
                  alt=""
                  className="h-10 w-full"
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </span>
              <span className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]">
                <img
                  src="/tally.png"
                  alt=""
                  className="h-10 w-full"
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </span>
              <span className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]">
                <img
                  src="/poly.png"
                  alt=""
                  className="h-10 w-full"
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
