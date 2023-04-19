import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default ({ isTopRated = true, gig, proposalsAll = [] }) => {
  const [isHover, setIsHover] = useState();
  const router = useRouter();
  const [image, setImage] = useState(null);

  const colorChangeClass = isHover ? "text-blue-800" : "text-black";

  const getData = () => {
    const getDataFromIPFS = async () => {
      try {
        console.log("URI:", "https://ipfs.io/" + gig.tokenUri);
        const json = await axios.get("https://ipfs.io/ipfs/" + gig.tokenUri);
        console.log("json: ", json);
        setImage("https://ipfs.io/ipfs/" + json.data.image.substring(7));
      } catch (e) {
        console.log("JSONL ", e);
      }
    };
    getDataFromIPFS();
  };

  useEffect(() => {
    if (gig.tokenUri) {
      console.log("GIGCARD: ", gig);
      getData();
    }
  }, []);

  return (
    <div
      className="w-full bg-white rounded-lg shadow-md cursor-pointer"
      style={{
        maxWidth: "250px",
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {image && (
        <Image
          className="rounded-t-lg cursor-pointer"
          src={image}
          alt="product image"
          width={500}
          height={500}
          style={{
            height: 200,
          }}
          onClick={() =>
            router.push({
              pathname: "/gig-detail",
              query: { gig: JSON.stringify(gig) },
            })
          }
        />
      )}

      <div className="flex justify-start items-center">
        <Image
          className="rounded-3xl m-4 max-h-sm"
          src={"https://ipfs.io/ipfs/" + gig?.freelancer?.ipfsImageHash}
          alt="product image"
          width={50}
          height={50}
        />
        <div className="flex-col">
          <p className="font-bold text-md hover:underline cursor-pointer">
            {gig?.freelancer?.name}
          </p>
          {gig?.freelancer?.isTopRated && (
            <p className="text-blue-800 text-xs">Top Rated Seller</p>
          )}
        </div>
      </div>
      <div className="px-5 pb-5">
        <h5
          className={
            "text-sm my-4 font-normal tracking-tight text-gray-900 " +
            colorChangeClass
          }
          onClick={() => {
            router.push({
              pathname: "/gig-detail",
              query: { gig: JSON.stringify(gig) },
            });
          }}
        >
          {gig?.title}
        </h5>

        <div className="flex items-center mt-2.5 mb-5">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {gig?.rating.toFixed(2)}
          </span>

          <span className="text-gray-500 text-xs ml-1">
            ({gig?.rating.toFixed(0)})
          </span>
        </div>
        <div className="flex items-center justify-between">
          {/* <div className="flex space-x-1">
            <div className="bg-white border-2 rounded-full flex items-center space-x-2 px-4 cursor-pointer h-12 justify-center hover:bg-gray-200">
              <img
                src="https://img.icons8.com/material-outlined/344/facebook-like--v1.png"
                alt=""
                className="h-4 w-4" //https://img.icons8.com/material-rounded/344/dislike.png
              />
            </div>
            <div className="bg-white border-2 rounded-full flex items-center space-x-2 px-4 cursor-pointer h-12 justify-center hover:bg-gray-200">
              <img
                src="https://img.icons8.com/material-rounded/344/dislike.png"
                alt=""
                className="h-4 w-4" //https://img.icons8.com/material-rounded/344/dislike.png
              />
            </div>
          </div> */}
          <span className="text-xl font-bold text-gray-900 ">
            ${gig?.plans?.length > 0 ? gig?.plans[0]?.price : <></>}
          </span>
        </div>
      </div>
    </div>
  );
};
