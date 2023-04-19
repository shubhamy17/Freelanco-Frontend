import Link from "next/link";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { getProposalsOfClient } from "../../api/auth";

const Basic = ({ gig, tabSelected }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  return (
    <>
      {gig?.plans?.length > 0 ? (
        gig?.plans[tabSelected]?.price !== 0 && (
          <div className="w-full max-w-sm p-4 bg-white rounded-lg sm:p-8 text-black">
            {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        Basic Plan
      </h5> */}
            <div className="flex items-baseline text-gray-900 ">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">
                {gig?.plans?.length > 0 ? (
                  gig?.plans[tabSelected]?.price
                ) : (
                  <></>
                )}
              </span>
            </div>

            <ul role="list" className="space-y-5 my-7">
              <li className="flex space-x-3">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Check icon</title>
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                  {gig?.plans[tabSelected]?.package_description}
                </span>
              </li>
            </ul>
            {isLoggedIn ? (
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                onClick={() =>
                  router.push({
                    pathname: "/checkout",
                    query: { gig: JSON.stringify(gig) },
                  })
                }
              >
                Choose plan
              </button>
            ) : (
              <button
                disabled
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center mt-20"
              >
                Please Log In
              </button>
            )}
            {/* </Link> */}
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
};

const GigActions = () => {
  const router = useRouter();
  let gig = {};
  if (router.query.gig) {
    gig = JSON.parse(router.query.gig);
  }

  const [tabSelected, setSelected] = useState(0);
  const { user, isLoggedIn } = useAuth();

  const isMyGig = user?._id == gig?.user_ref;

  const tabClass =
    "text-sm text-center font-normal text-serif p-4 text-blue-800 cursor-pointer";

  const selectedClass = " bg-white border-b-4 border-b-blue-800 text-bold";

  const notSelectedClass = "";

  const [clientProposals, setClientProposals] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getProposalsOfClient();
      setClientProposals(
        res.filter((proposal) => proposal.gig_token_id == gig.tokenId)
      );
      console.log(
        "Client",
        res.filter((proposal) => proposal.gig_ref == gig._id)
      );
    };
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <div className="min-h-[calc(70vh)] flex-col shadow-lg border-1 bg-white mt-20 ml-10 w-full">
      {clientProposals.length === 0 ? (
        <div>
          {!isMyGig && (
            <div className="flex justify-around">
              <p
                className={
                  tabClass +
                  (tabSelected === 0 ? selectedClass : notSelectedClass)
                }
                onClick={() => setSelected(0)}
              >
                Basic
              </p>
              {gig.plans?.length >= 1 ? (
                gig?.plans[1]?.price !== 0 && (
                  <p
                    className={
                      tabClass +
                      (tabSelected === 1 ? selectedClass : notSelectedClass)
                    }
                    onClick={() => setSelected(1)}
                  >
                    Standard
                  </p>
                )
              ) : (
                <></>
              )}
              {gig.plans?.length >= 1 ? (
                gig?.plans[2]?.price !== 0 && (
                  <p
                    className={
                      tabClass +
                      (tabSelected === 2 ? selectedClass : notSelectedClass)
                    }
                    onClick={() => setSelected(2)}
                  >
                    Premium
                  </p>
                )
              ) : (
                <></>
              )}
            </div>
          )}
          {!isMyGig && <Basic gig={gig} tabSelected={tabSelected} />}
        </div>
      ) : (
        <>
          <div className="mt-5 rounded-2xl">
            <p className="font-bold p-10">Statistics</p>
            <div className="flex-col">
              <div className="w-full flex space-x-4 items-center justify-center text-center">
                <div className="flex flex-col">
                  <span className="font-bold">0</span>
                  <span className="capitalize">Total Proposals</span>
                </div>
              </div>
              <div className="w-full flex space-x-4 items-center justify-center text-center">
                <div className="flex flex-col">
                  <span className="font-bold">0</span>
                  <span>Interviewing</span>
                </div>
              </div>
              <div className="w-full flex space-x-4 items-center justify-center text-center">
                <div className="flex flex-col">
                  <span className="font-bold">0</span>
                  <span>Rejected</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <span className="mt-5 mb-2 underline cursor-pointer font-bold">
              Your Proposals
            </span>
            {clientProposals.map((proposal, idx) => (
              <div className="flex justify-between gap-x-4">
                <span className="text-gray-500">
                  {new Date(proposal.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>{" "}
                <span className="font-extrabold">
                  {Number(proposal.total_charges).toFixed(2)} MATIC
                </span>{" "}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {isLoggedIn && (
              <button
                type="button"
                className="text-white bg-blue-600 w-3/4 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-10 py-2.5 inline-flex justify-center text-center mt-10"
                onClick={() => setClientProposals([])}
              >
                View Plans
              </button>
            )}
            {isLoggedIn ? (
              <button
                type="button"
                className="text-white bg-blue-600 w-3/4 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-10 py-2.5 inline-flex justify-center text-center mt-2 mb-10"
                onClick={() =>
                  router.push({
                    pathname: "/checkout",
                    query: { gig: JSON.stringify(gig) },
                  })
                }
              >
                Create New Offer
              </button>
            ) : (
              <button
                disabled
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center mt-20"
              >
                Please Log In
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GigActions;
