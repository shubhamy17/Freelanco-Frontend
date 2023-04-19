import Image from "next/image";
import React, { useState } from "react";

const GigsWelcome = () => {
  const [hideIt, setHideit] = useState("");

  return (
    <div
      className={
        "bg-indigo-600 text-white rounded shadow-xl py-5 px-5 w-full " + hideIt
      }
      // x-data="{welcomeMessageShow:true}"
      // x-show="welcomeMessageShow"
      // x-transition:enter="transition-all ease duration-500 transform"
      // x-transition:enter-start="opacity-0 scale-110"
      // x-transition:enter-end="opacity-100 scale-100"
      // x-transition:leave="transition-all ease duration-500 transform"
      // x-transition:leave-end="opacity-0 scale-90"
    >
      <div className="flex flex-wrap -mx-3 items-center justify-between">
        <div className="w-full sm:w-1/2 md:w-2/4 px-3 text-left">
          <div className="p-5 xl:px-8 md:py-5">
            <h3 className="text-2xl">Welcome, Scott!</h3>
            <h5 className="text-xl mb-3">Lorem ipsum sit amet</h5>
            <p className="text-sm text-indigo-200">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              sit asperiores perferendis odit enim natus ipsum reprehenderit eos
              eum impedit tenetur nemo corporis laboriosam veniam dolores quos
              necessitatibus, quaerat debitis.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-3 text-center">
          <div className="p-5 xl:px-8 md:py-5">
            <a
              className="block w-full py-2 px-4 rounded text-indigo-600 bg-gray-200 hover:bg-white hover:text-gray-900 focus:outline-none transition duration-150 ease-in-out mb-3"
              href="https://codepen.io/ScottWindon"
              target="_blank"
            >
              Find out more?
            </a>
            <button
              className="w-full py-2 px-4 rounded text-white bg-indigo-900 hover:bg-gray-900 focus:outline-none transition duration-150 ease-in-out"
              onClick={() => setHideit("hidden")}
            >
              No Thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigsWelcome;
