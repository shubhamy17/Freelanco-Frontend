import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import GigCard from "../Gigs/GigCard";
import { getGigByUserId } from "../../api/gig";

const YourGigs = () => {
  const { user } = useAuth();
  const [userGigs, setUserGigs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const result = await getGigByUserId();
        console.log("USER GIGS: ", result);
        setUserGigs(result.filter((obj) => obj.hasOwnProperty("tokenId")));
      }
    };
    getData();
  }, [user]);

  return (
    <div className="flex-col">
      <div className="flex space-x-3 p-4 items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">My Gigs</h1>
          <h1 className="font-bold text-md">
            ${user?.freelancer?.total_earned}
          </h1>
        </div>

        <div className="bg-blue-500 rounded-full p-2 flex items-center space-x-2 px-4 cursor-pointer">
          <Link href="/createGig">
            <span className="text-white text-sm">Post</span>
          </Link>
          <img
            src="https://cdn-icons-png.flaticon.com/512/748/748113.png"
            className="w-4 h-4"
            alt=""
            style={{
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-6">
        {userGigs?.map((gig, idx) => {
          return <GigCard gig={gig} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default YourGigs;
