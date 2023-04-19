import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getProposalsOfClient } from "../api/auth";
import GigActions from "../components/Gigs/GigActions";
import GigDetails from "../components/Gigs/GigDetails";
import GigManagement from "../components/Gigs/GigManagement";
import useAuth from "../hooks/useAuth";

const GigDetail = () => {
  const router = useRouter();
  let gig = {};
  if (router.query.gig) {
    gig = JSON.parse(router.query.gig);
  }
  const { user } = useAuth();

  const isMyGig = user?._id == gig?.user_ref;

  return (
    <>
      {!isMyGig && (
        <div className="flex mx-20 mt-20">
          <div className="flex-3/4 w-3/4">
            <GigDetails />
          </div>
          <div className="flex-1/4 w-1/4">
            <GigActions />
          </div>
        </div>
      )}
      {isMyGig && <GigManagement gig={gig} />}
    </>
  );
};

export default GigDetail;
