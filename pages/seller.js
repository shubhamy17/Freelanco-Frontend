import React, { useEffect, useState } from "react";
import YourProfile from "../components/Freelancer/FreelancerProfile";
import GigCard from "../components/Gigs/GigCard";
import YourGigs from "../components/Freelancer/YourGigs";
import { getGigByUserId } from "../api/gig";
import useAuth from "../hooks/useAuth";
import { getOrders, getProposalByGigRef } from "../api/proposal";
import OrderCard from "../components/Freelancer/OrderCard";
import YourDisputes from "../components/Freelancer/YourDisputes";
import { freelancerProfile } from "../api/profile";

const YourPurchases = () => {
  const { user } = useAuth();
  const [successfulOrders, setSuccessfulOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      //api -> get all proposals of freelancer
      const res = await getOrders();
      setSuccessfulOrders(res.filter((res) => res.status == "Successful"));
    };
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <div className="flex-1/4 w-3/4">
      {successfulOrders.length > 0 == true ? (
        <div className="flex-col w-[70vw]">
          <div className="flex space-x-3 p-4 items-center justify-between ">
            <div>
              <h1 className="font-bold text-xl my-2">Your Orders</h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-6">
            {/* <GigCard isTopRated={false} /> */}
            {successfulOrders.length > 0 ? (
              successfulOrders.map((order) => <OrderCard order={order} />)
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const FreelancerDashboard = () => {
  const [showManageDisputes, setShowManageDisputes] = useState(false);
  const { setCurrentFreelancerData, user } = useAuth();

  const getProfile = async (id) => {
    const data = await freelancerProfile(id);

    console.log("data----------->", data);

    setCurrentFreelancerData(data.user);
  };

  useEffect(() => {
    if (user) {
      getProfile(user.freelancer?._id);
    }
  }, [user]);
  return (
    <>
      <div className="flex mx-20 space-x-8 mt-20">
        <div className="flex-1/4 w-1/4">
          <YourProfile
            setShowManageDisputes={setShowManageDisputes}
            showManageDisputes={showManageDisputes}
          />
        </div>
        <div className="flex-3/4 w-3/4 flex-col mb-20">
          {showManageDisputes ? (
            <YourDisputes />
          ) : (
            <>
              <YourGigs />
              <YourPurchases />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FreelancerDashboard;
