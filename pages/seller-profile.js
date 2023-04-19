import React, { useState } from "react";
import SellerDetails from "../components/Freelancer/SellerDetails";
import FreelancerProfile from "../components/Freelancer/FreelancerProfile";
import { useRouter } from "next/router";

const FreelancerDetails = ({ freelancer }) => {
  const [freelancerUser, setFreelancerUser] = useState(null);
  const allowEdit = true;

  return (
    <div className="flex mx-20 space-x-8 mt-20">
      <div className="flex-3/4 w-1/4">
        <FreelancerProfile allowEdit={allowEdit} freelancerUser={freelancerUser} setFreelancerUser={setFreelancerUser} />
      </div>
      <div className="flex-1/4 w-3/4">
        <SellerDetails allowEdit={allowEdit} freelancerUser={freelancerUser} setFreelancerUser={setFreelancerUser} />
      </div>
    </div>
  );
};

export default FreelancerDetails;
