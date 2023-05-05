import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getDate } from "../../utils/helpers";
import { getGigById } from "../../api/gig";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { constSelector } from "recoil";

const Slider = () => {
  return <div>Slider</div>;
};



const GigDetails = ({ gig }) => {
  const router = useRouter();
  // let gigId = {};
  // if (router.query.gig) {
  //   gigId = JSON.parse(router.query.gig);
  // }
  // const [gig, setGig] = useState({});
  // useEffect(() => {
  //   async function fetchGig() {
  //     if (gigId) {
  //       const gigData = await getGigById(gigId);
  //       setGig(gigData);
  //     }
  //   }
  //   fetchGig();
  // }, [gigId]);

  const { user } = useAuth();

  const isMyGig = user?._id == gig?.user_ref;

  const showFreelancerProfile = () => {
    router.push({
      pathname: "/seller-profile",
      query: { freelancer: JSON.stringify(gig?.freelancer) },
    });
  };

  // const [image, setImage] = useState(null);

  // const getDataFromIPFS = async () => {
  //   const json = await axios.get("https://ipfs.io/ipfs/" + gig.tokenUri);

  //   // const imageF = await axios.get(
  //   // "https://ipfs.io/ipfs/" + json.data.image.substring(7)
  //   // );

  //   setImage("https://ipfs.io/ipfs/" + json.data.image.substring(7));
  // };

  const [showReviews, setShowReviews] = useState(false);

  // useEffect(() => {
  //   if (gig.tokenUri) {
  //     getDataFromIPFS();
  //   }
  // }, [gig]);

  return (
    <div className="min-h-[calc(70vh)] ">
      <div className="flex justify-between p-8">
        <div className="flex flex-col">
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
        {gig?.awsImageLink && (
          <Image
            className="rounded-3xl w-full h-[60vh]"
            src={gig?.awsImageLink}
            alt="product image"
            height={500}
            width={800}
          />
        )}
      </div>

      {showReviews == true ? (
        <div className="pl-8 mb-20">
          <div className="flex justify-between items-center">
            <p className="text-md font-bold">
              What people loved about this seller
            </p>

            <p
              className="text-md font-bold p-8 text-blue-800 hover:underline cursor-pointer"
              onClick={() => setShowReviews(false)}
            >
              Go Back
            </p>
          </div>

          {gig?.reviews?.length > 0 ? (
            gig?.reviews?.map((review) => (
              <>
                <div className="w-full my-2">
                  <div className="h-32 border text-center flex items-center justify-center">
                    <p className="font-light text-xs text-blue-800 p-4">
                      {" "}
                      {review?.comment}
                    </p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="font-light text-xs text-blue-800 p-4">
                      {" "}
                      {review?.wallet_address}
                    </p>
                    <p className="font-light text-xs text-blue-800 p-4">
                      {" "}
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
                          {review?.rating}
                        </span>
                      </div>
                    </p>
                  </div>
                </div>
              </>
            ))
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          {!isMyGig && (
            <>
              <div className="w-full pl-8">
                <div className="flex justify-between items-center">
                  <p className="text-md font-bold">
                    What people loved about this seller
                  </p>

                  <p
                    className="text-md font-bold p-8 text-blue-800 hover:underline cursor-pointer"
                    onClick={() => setShowReviews(true)}
                  >
                    See all reviews
                  </p>
                </div>
              </div>

              <div className="w-full pl-8">
                <div className="h-32 border text-center flex items-center justify-center">
                  <p className="font-light text-xs text-blue-800 p-4">
                    {" "}
                    {gig?.reviews?.length > 0
                      ? gig?.reviews?.[0].comment
                      : "0 Reviews"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full pl-8">
                <p className="font-light text-xs text-blue-800 p-4">
                  {" "}
                  {gig?.reviews?.[0]?.wallet_address}
                </p>
                <p className="font-light text-xs text-blue-800 p-4">
                  {" "}
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
                      {gig?.reviews?.length > 0
                        ? gig?.reviews?.[0].rating
                        : "0 Reviews"}
                    </span>
                  </div>
                </p>
              </div>
            </>
          )}
          <p className="font-bold pl-8 mt-8">About The Gig</p>
          <div className="w-full">
            <p className="text-sm p-8">{gig?.description?.slice(0, 830)}</p>
          </div>
          {!isMyGig && (
            <div className="flex m-10 -ml-2">
              <div className="w-full flex space-x-4 items-center justify-center">
                <div>
                  <img
                    src="https://img.icons8.com/material-outlined/344/clock--v1.png"
                    alt=""
                    className="h-6 w-6"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">
                    {gig?.duration === "short"
                      ? "Less than 30 hrs/week"
                      : "More than 30 hrs/week"}
                  </span>
                  <span className="capitalize">Fixed Price</span>
                </div>
              </div>
              <div className="w-full flex space-x-4 items-center justify-center">
                <div>
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                    className="h-6 w-6"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">
                    {gig?.duration === "short"
                      ? "1 to 3 months"
                      : "More than 3 months"}
                  </span>
                  <span>Project Length: {gig?.duration}</span>
                </div>
              </div>
              <div className="w-full flex space-x-4 items-center justify-center">
                <div>
                  <img
                    src="https://img.icons8.com/material-outlined/344/clock--v1.png"
                    alt=""
                    className="h-6 w-6"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">
                    {gig?.freelancer?.total_earned} MATIC
                  </span>
                  <span>Total Earned</span>
                </div>
              </div>
            </div>
          )}
          {!isMyGig && (
            <div className=" flex flex-col p-10 pl-6">
              <div className="flex-col space-x-1">
                <p className="font-bold mb-4">About The Seller</p>

                <div className="flex justify-between">
                  <div className="flex p-4 rounded-lg my-2">
                    <Image
                      src={
                        "https://ipfs.io/ipfs/" + gig?.freelancer?.ipfsImageHash
                      }
                      alt=""
                      width={500}
                      height={500}
                      className="h-16 w-16 rounded-full bg-gray-50 shadow-md"
                    />
                    <div className="flex flex-col justify-center">
                      <span className="flex justify-start space-x-2 items-center pl-4">
                        {" "}
                        <span className="text-xs text-gray-500">
                          Name:
                        </span>{" "}
                        <span
                          className="font-bold text-gray-500 cursor-pointer hover:underline"
                          onClick={() => showFreelancerProfile()}
                        >
                          {/* {job.freelancer_hired.name}{" "} */}
                          {gig?.freelancer?.name}
                        </span>
                      </span>
                      <span className="flex justify-start space-x-2 items-center pl-4">
                        {" "}
                        <span className="text-xs text-gray-500">
                          Wallet:
                        </span>{" "}
                        <span className="font-bold text-gray-500 text-sm cursor-pointer hover:underline">
                          {/* {job.freelancer_hired.wallet}{" "} */}
                          {gig?.freelancer?.wallet_address}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    <span
                      className={
                        "font-light border-2 px-3 py-1 rounded-md text-sm cursor-pointer p-5 border-blue-800 text-blue-800"
                      }
                      onClick={() =>
                        router.push({
                          pathname: "/conversation",
                          query: {
                            address: gig?.freelancer?.wallet_address,
                            gig_id: gig?.tokenId,
                          },
                        })
                      }
                    >
                      Contact Seller
                    </span>
                  </div>
                </div>
                <div className="flex p-4 rounded-lg my-2 h-32 border">
                  <div className="flex justify-around w-full px-10 my-5">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-bold text-md">
                        {/* {proposal?.rate} */}
                        {gig?.freelancer?.last_delivery}
                      </span>
                      <span className="font-light text-gray-500">
                        Last Delivery
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-bold text-md">
                        {/* {proposal?.freelancer?.total_earned} */}
                        {gig?.freelancer?.avg_response}
                      </span>
                      <span className="font-light text-gray-500">
                        Avg. Response Time
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-bold text-md">
                        {/* {proposal?.freelancer?.success_rate} */}
                        {gig?.freelancer?.createdAt.split("T")[0]}
                      </span>
                      <span className="font-light text-gray-500">
                        Member Since
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GigDetails;
