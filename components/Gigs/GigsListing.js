import React from "react";
import GigCard from "./GigCard";
import useAuth from "../../hooks/useAuth";

const GigsListing = ({ gigs }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-6">
      {gigs.filter((gig) => {
        if (user) {
          return gig?.freelancer?.wallet_address != user.wallet_address;
        } else {
          return gig;
        }
      }).length > 0 ? (
        gigs?.map((gig) => {
          return <GigCard gig={gig} />;
        })
      ) : (
        <div className="min-h-[calc(70vh)] flex items-center justify-center flex-col">
          <img
            src={"/empty.png"}
            alt=""
            className="mx-20 w-2/4 h-1/4"
            style={{
              filter: "grayscale(1)",
            }}
          />
          <p className="text-center text-gray-800 font-bold">
            No results found
          </p>
        </div>
      )}
    </div>
  );
};

export default GigsListing;
