import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getProposalsOfClient } from "../api/auth";
import GigActions from "../components/Gigs/GigActions";
import GigDetails from "../components/Gigs/GigDetails";
import GigManagement from "../components/Gigs/GigManagement";
import useAuth from "../hooks/useAuth";
import { getGigById } from "../api/gig";

const GigDetail = () => {
  const router = useRouter();
  let gigId = {};
  if (router.query.gig) {
    gigId = JSON.parse(router.query.gig);
  }
  const [gig, setGig] = useState({});
  useEffect(() => {
    async function fetchGig() {
      if (gigId) {
        const gigData = await getGigById(gigId);
        setGig(gigData);
      }
    }
    fetchGig();
  }, [gigId]);
  const { user } = useAuth();

  const isMyGig = user?._id == gig?.user_ref;

  return (
    <>
      {!isMyGig && (
        <div className="flex mx-20 mt-20">
          <div className="flex-3/4 w-3/4">
            <GigDetails gig={gig} />
          </div>
          <div className="flex-1/4 w-1/4">
            <GigActions gig={gig} />
          </div>
        </div>
      )}
      {isMyGig && gig != {} && <GigManagement gig={gig} />}
    </>
  );
};

export default GigDetail;
