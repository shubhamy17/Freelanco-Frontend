import React from "react";
// import openImg from "../assets/open.png";

const Header = () => {
  const recentSearches = [
    "Machine Learning",
    "Data Science",
    "Blockchain dApps",
  ];

  return (
    <>
      <div
        className="flex h-[90vh] pt-32 bg-cover justify-start"
        style={{
          backgroundImage: `url('/blo.jpg')`,
        }}
      >
        {/* Heading */}
        <div className="flex-col w-2/3 items-center pl-20">
          <h1 className="text-6xl font-serif font-light text-white">
            Find the most trusted{" "}
            <span className="text-thin italic">
              {" "}
              <br /> freelance{" "}
            </span>{" "}
            services <br /> for your business
          </h1>

          {/* <div className="flex justify-start items-center my-2">
            <input
              type="text"
              className="placeholder:italic placeholder:text-slate-500 w-2/3 block rounded-l-lg bg-white h-10 border border-slate-300 py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm hover:border-blue-400"
              placeholder="Try 'building mobile app'"
            />
            <div className="h-10 w-10 bg-blue-400 rounded-r-lg flex justify-center items-center hover:bg-blue-300 cursor-pointer mr-2">
              <img
                style={{
                  filter: "brightness(0) invert(1)",
                }}
                className="h-5 w-5"
                src="https://img.icons8.com/ios-glyphs/344/search--v1.png"
                alt=""
              />
            </div>
          </div> */}
          {/* <div className="flex space-x-2 items-center">
            <span className="font-light text-md pl-2 mr-2 text-white">
              Populor:{" "}
            </span>
            {recentSearches.map((history, idx) => (
              <div
                key={idx}
                className="text-white text-sm hover:underline cursor-pointer border rounded-2xl px-2"
              >
                {history}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Header;
