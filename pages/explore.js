import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CategoryCard } from "../components/Explore/Deck";
import GigCard from "../components/Gigs/GigCard";
import GigsWelcome from "../components/Gigs/GigsWelcome";
import useAuth from ".././hooks/useAuth";
import Deck from "../components/Explore/Deck";
import { getProposalsOfClient } from "../api/auth";
import { getAllGig, getPopular } from "../api/gig";
import CircularProgress from '@mui/material/CircularProgress';

const GigsListing = () => {
  const [recommendedGigs, setRecommendedGigs] = useState([]);
  const [mostPopular, setMostPopular] = useState([]);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user, search } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const res = await getPopular();
      setMostPopular(
        res.filter((r) => r.freelancer.wallet_address !== user.wallet_address)
      );
      setIsLoading(false);
    };
    if (user) getData();
  }, [user]);

  useEffect(() => {
    if (search) {
      const filtered = mostPopular.filter((gig) => {
        const searchFields = [gig.title, gig.category, gig.sub_category, ...gig.skill];
        return searchFields.some(field => field.toLowerCase().includes(search.toLowerCase()));
      });
      setFilteredGigs(filtered);
    } else {
      setFilteredGigs(mostPopular);
    }
  }, [search, mostPopular]);

  return (
    <div className="flex-col mt-20 transition ease-in-out delay-80 w-full">
      <div className="flex gap-x-5 my-12">
        <div className="mt-10 w-full mr-5">
          <Deck />
        </div>
      </div>
      <div className="px-20 transition ease-in-out delay-80 ">
        <p className="text-2xl font-semibold mt-5 ml-5">Most Popular Gigs</p>
        <div className="flex  flex-wrap gap-x-8 gap-y-6 mt-5 mb-20">
          {isLoading && user ? (
            // Display the loading component while data is being fetched
            <CircularProgress />
          ) : filteredGigs.length > 0 ? (
            filteredGigs.map((gig) => <GigCard key={gig._id} gig={gig} />)
          ) : (
            // Display the empty state if no gigs are found
            <div className="min-h-[calc(70vh)] flex items-center justify-center flex-col absoluteCenter">
              <img
                src={"/empty.png"}
                alt=""
                className="w-1/4 h-1/4"
                style={{
                  filter: "grayscale(1)",
                }}
              />
              <p className="text-center text-gray-800 font-bold">
                No gigs found
              </p>
            </div>
          )}
        </div>
        {/* <p className="text-2xl font-semibold mt-10">Gigs you may like</p>
        <div className="flex flex-wrap gap-x-8 gap-y-6 mt-5">
          {recommendedGigs.length > 0 ? (
            recommendedGigs.map((gig) => <GigCard gig={gig} />)
          ) : (
            <>No Gigs</>
          )}
        </div> */}
      </div>
    </div >
  );
};

export default GigsListing;
