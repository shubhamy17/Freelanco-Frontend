import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyGigDetails = ({ gig }) => {
  const [image, setImage] = useState(null);
  const getData = () => {
    const getDataFromIPFS = async () => {
      console.log("GIG: ", gig);
      const json = await axios.get("https://ipfs.io/ipfs/" + gig.tokenUri);

      // const imageF = await axios.get(
      // "https://ipfs.io/ipfs/" + json.data.image.substring(7)
      // );
      setImage("https://ipfs.io/ipfs/" + json.data.image.substring(7));
    };
    getDataFromIPFS();
  };

  useEffect(() => {
    if (gig.tokenUri) {
      getData();
    }
  }, [gig]);

  return (
    <>
      <div className="flex justify-between p-8">
        <div className="flex flex-col w-[20vw]">
          <div className="flex space-x-6 justify-start items-center">
            <div className="font-bold hover:underline text-3xl">
              {gig?.title}
            </div>
          </div>
          <div className="flex space-x-4 items-center justify-start">
            <span className="text-xs text-gray-500">
              {/* Posted on: {getDate(job?.createdAt)}{" "} */}
              Posted on: {gig?.createdAt?.split("T")[0]}
            </span>
          </div>
        </div>
        <div>
          <div className="flex space-x-2 justify-center items-center">
            {gig?.skill?.map((skill, idx) => (
              <div
                key={idx}
                className="p-2 mt-2 flex items-center justify-center space-x-5 bg-blue-200 text-gray-800 cursor-pointer transition delay-100 rounded-lg text-xs"
              >
                {" "}
                {skill}{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full pl-8">
        {image && (
          <Image
            className="rounded-3xl w-full"
            src={image}
            alt="product image"
            height={500}
            width={800}
          />
        )}
      </div>
    </>
  );
};

export default MyGigDetails;
