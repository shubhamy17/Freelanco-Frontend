import React, { useEffect, useState } from "react";
import { getProposalByGigRef } from "../../api/proposal";
import useAuth from "../../hooks/useAuth";
import MyGigDetails from "./MyGigDetails";
import MyOffers from "./MyOffers";
import MyOrders from "./MyOrders";

const GigManagement = ({ gig }) => {
  const { user } = useAuth();
  const [proposalsData, setProposalsData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);

  console.log(gig);

  useEffect(() => {
    const getData = async () => {
      const result = await getProposalByGigRef({
        gig_token_id: gig?.tokenId,
      });
      setProposalsData(result.filter((r) => r.status == "Sent"));

      setApprovedData(
        result.filter((r) => r.status == "Approved" || r.status == "Completed")
      );

      console.log(
        "Sent",
        result.filter((r) => r.status == "Sent")
      );
      console.log(
        "Rejected",
        result.filter((r) => r.status == "Rejected")
      );
    };
    if (user) {
      getData();
    }
  }, [user]);

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="flex mx-20 mt-20">
      <div className="mr-20">
        <MyGigDetails gig={gig} />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex gap-x-2 w-full justify-between mb-5">
          <h1
            className={
              selectedTab == 0
                ? "text-2xl text-blue-800 font-semibold"
                : "text-md cursor-pointer px-4 py-2.5 bg-gray-100 rounded-2xl text-blue-800"
            }
            onClick={() => setSelectedTab(0)}
          >
            Offers Received
          </h1>
          <h1
            className={
              selectedTab == 1
                ? "text-2xl text-blue-800 font-semibold"
                : "text-md cursor-pointer px-4 py-2.5 bg-gray-100 rounded-2xl text-blue-800"
            }
            onClick={() => setSelectedTab(1)}
          >
            Orders Pending
          </h1>
        </div>
        {selectedTab == 0 && (
          <>
            <MyOffers proposalsData={proposalsData} />
          </>
        )}
        {selectedTab == 1 && <MyOrders ordersData={approvedData} />}
      </div>
    </div>
  );
};

export default GigManagement;
