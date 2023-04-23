import React, { useEffect, useState } from "react";
import { getProposalsOfClient } from "../api/auth";
import GigCard from "../components/Gigs/GigCard";
import useAuth from "../hooks/useAuth";
import ClientOrdersManagement from "../components/Client/OrderManagement";
import { getProposalByGigRef } from "../api/proposal";
import Link from "next/link";
import Image from "next/image";
import CircularProgress from '@mui/material/CircularProgress';

const ClientProfile = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [userGigs, setUserGigs] = useState([{}]);

  const [proposalsData, setProposalsData] = useState([]);

  const [sentProposals, setSentProposals] = useState([]);
  const [approvedProosals, setApprovedProosals] = useState([]);
  const [successfulProposals, setSuccessfulProposals] = useState([]);
  const [selectedOrder, setSeletedOrder] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  console.log(successfulProposals[selectedOrder]?.gig_detail?.rating);

  useEffect(() => {
    const getData = async () => {
      const result = await getProposalByGigRef();
      setProposalsData(result);

      setApprovedProosals(
        result.filter((r) => r.status == "Approved" || r.status == "Completed")
        // .filter(
        //   (proposal, index, self) =>
        //     index ===
        //     self.findIndex(
        //       (p) => p.gig_detail._id === proposal.gig_detail._id
        //     )
        // )
      );

      setSuccessfulProposals(result.filter((r) => r.status == "Successful"));

      // setSentProposals(result.filter((r) => r.status == "Sent"));

      setSentProposals(
        result
          .filter((r) => r.status == "Sent")
          .filter(
            (proposal, index, self) =>
              index === self.findIndex((p) => p.token_id === proposal.token_id)
          )
      );
      setIsLoading(false);
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

  return (
    <div className="flex mt-20 pr-28">
      <div className="mr-20">{/* <MyGigDetails gig={gig} /> */}</div>
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
            Pending Proposals
          </h1>
          <div className="flex gap-x-2 items-center justify-center">
            <h1
              className={
                selectedTab == 1
                  ? "text-2xl text-blue-800 font-semibold"
                  : "text-md cursor-pointer px-4 py-2.5 bg-gray-100 rounded-2xl text-blue-800"
              }
              onClick={() => setSelectedTab(1)}
            >
              Ongoing Orders
            </h1>
            <h1
              className={
                selectedTab == 1
                  ? "text-md cursor-pointer px-4 py-2.5 bg-gray-100 rounded-2xl text-blue-800"
                  : selectedTab == 2
                    ? "text-2xl text-blue-800 font-semibold"
                    : "text-md cursor-pointer px-4 py-2.5 bg-gray-100 rounded-2xl text-blue-800"
              }
              onClick={() => setSelectedTab(2)}
            >
              Completed Orders
            </h1>
          </div>
        </div>
        {selectedTab == 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-6">
            {isLoading ? (
              <div className="flex justify-center align-center ">
                <CircularProgress />
              </div>
            ) : sentProposals.length > 0 ? (
              sentProposals.map((gig, idx) => {
                return (
                  <GigCard
                    gig={gig.gig_detail}
                    key={idx}
                    proposalsAll={proposalsData}
                  />
                );
              })
            ) : (
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="min-h-[calc(70vh)] flex items-center justify-center flex-col">
                  <img
                    src={"/empty.png"}
                    alt=""
                    className="w-1/4 h-1/4"
                    style={{
                      filter: "grayscale(1)",
                    }}
                  />
                  <p className="text-center text-gray-800 font-bold">
                    No proposals sent
                  </p>
                </div>
              </div>
            )}

          </div>
        )}
        {selectedTab == 1 && (
          <ClientOrdersManagement approvedProosals={approvedProosals} />
        )}
        {selectedTab == 2 && (
          <div className="flex-3/4 w-3/4 flex-col mb-20 shadow">
            {successfulProposals.length > 0 ? (
              successfulProposals.map((proposal, selectedOrder) => (
                <>
                  <div
                  // key={idx}
                  // className={
                  //   // showDialog === true ? "flex flex-col opacity-5" : "flex flex-col "
                  // }
                  >
                    <div className="flex justify-around border py-5">
                      <div className="flex-col">
                        <Image
                          // className="rounded-3xl w-full"
                          src={
                            "https://ipfs.io/ipfs/" +
                            successfulProposals[selectedOrder]?.gig_detail
                              ?.freelancer?.ipfsImageHash
                          }
                          alt=""
                          width={100}
                          height={100}
                          className="h-32 w-32 m-5 mr-0 rounded-2xl"
                        />
                      </div>
                      <div className="flex w-full flex-col mb-5">
                        <div className="flex justify-between w-full px-10 mt-5">
                          <div className="flex flex-col">
                            <Link
                              href={`/freelancer-profile/${successfulProposals[selectedOrder]?.client?._id}`}
                            // to={`/freelancer-profile/6`}
                            >
                              <span className="font-bold text-md hover:underline cursor-pointer">
                                {
                                  successfulProposals[selectedOrder]?.gig_detail
                                    ?.title
                                }{" "}
                                by{" "}
                                {
                                  successfulProposals[selectedOrder]?.gig_detail
                                    ?.freelancer.name
                                }{" "}
                              </span>
                            </Link>
                            <span className="font-light text-gray-500">
                              {
                                successfulProposals[selectedOrder]?.gig_detail
                                  ?.freelancer?.wallet_address
                              }
                            </span>
                          </div>
                        </div>
                        <p className="ml-10 py-2 mt-4 mr-4 text-sm border-2 p-8 rounded-xl">
                          {successfulProposals[selectedOrder]?.terms?.slice(
                            0,
                            240
                          )}
                          ...
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-around w-full px-10 mb-10 py-5">
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-md">
                          {successfulProposals[
                            selectedOrder
                          ]?.total_charges?.toFixed(2)}{" "}
                          MATIC
                        </span>
                        <span className="font-light text-gray-500">
                          Fixed Price
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-md">
                          {successfulProposals[selectedOrder]?.status}
                        </span>
                        <span className="font-light text-gray-500">Status</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center gap-x-1">
                          <span className="font-bold text-md">
                            {successfulProposals[
                              selectedOrder
                            ]?.reviews?.[0].rating.toFixed(2)}
                          </span>
                          <svg class="svg-icon" viewBox="0 0 20 20">
                            <path d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="min-h-[calc(70vh)] flex items-center justify-center flex-col">
                  <img
                    src={"/empty.png"}
                    alt=""
                    className="w-1/4 h-1/4"
                    style={{
                      filter: "grayscale(1)",
                    }}
                  />
                  <p className="text-center text-gray-800 font-bold">
                    No completed orders
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
