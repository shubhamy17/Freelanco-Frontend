import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProposolsOfDao } from "../../api/proposal";
import { useRouter } from "next/router";

const proposals = [
  {
    reason: "I dont like the freelancer",
    by: "0xjkelekl414lk1mlk1lmad",
    against: "0xjkelekl414lk1mlk1lmad",
    gigToken: "0",
    offerID: "239132094141241",
    proposalId: "23131412412",
    daoCharges: "21",
    totalCharges: "23131",
  },
];

const ProposalsListing = ({ daoProposals }) => {
  const router = useRouter();

  return (
    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Proposal
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Status
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Made By
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              #
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          {daoProposals.map((proposal, idx) => {
            return (
              <tr class="hover:bg-gray-50">
                <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div class="relative h-10">
                    {/* <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
                  </div>
                  <div class="text-sm">
                    <div class="font-medium text-gray-700">
                      {proposal?.proposalId.slice(0, 24)}...
                    </div>
                    <div class="text-gray-400">{proposal?.createdAt}</div>
                  </div>
                </th>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    {proposal?.status}
                  </span>
                </td>
                <td class="px-6 py-4">
                  {proposal?.status == "Over_By_Freelancer"
                    ? proposal?.freelancer_address
                    : proposal?.client_address}
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      OfferId: {proposal?.offerId.slice(0, 12)}...
                    </span>
                    <span class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                      {proposal?.dao_fees} MATIC
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex justify-end gap-4">
                    <p
                      x-data="{ tooltip: 'Edite' }"
                      // href={"/dao-home/" + proposal.proposalId}
                      className="cursor-pointer"
                      onClick={() =>
                        router.push({
                          pathname: "/dao-home/proposal-detail",
                          query: {
                            proposal: JSON.stringify(proposal),
                          },
                        })
                      }
                    >
                      <svg class="svg-icon" viewBox="0 0 20 20">
                        <path
                          fill="none"
                          d="M19.175,4.856L15.138,0.82c-0.295-0.295-0.817-0.295-1.112,0L8.748,6.098c-0.307,0.307-0.307,0.805,0,1.112l1.462,1.462l-1.533,1.535L7.215,8.746c-0.307-0.307-0.805-0.307-1.112,0l-5.278,5.276c-0.307,0.307-0.307,0.805,0,1.112l4.037,4.037c0.154,0.153,0.355,0.23,0.556,0.23c0.201,0,0.403-0.077,0.556-0.23l5.28-5.276c0.148-0.148,0.23-0.347,0.23-0.556c0-0.209-0.083-0.409-0.23-0.556l-1.464-1.464l1.533-1.535l1.462,1.462c0.153,0.153,0.355,0.23,0.556,0.23c0.201,0,0.402-0.077,0.556-0.23l5.278-5.278c0.147-0.147,0.23-0.347,0.23-0.556C19.406,5.203,19.322,5.004,19.175,4.856zM9.585,13.339l-4.167,4.164l-2.925-2.925l4.166-4.164l0.906,0.905l-0.67,0.668c-0.307,0.307-0.307,0.805,0,1.112c0.154,0.153,0.356,0.23,0.556,0.23c0.203,0,0.403-0.077,0.556-0.23l0.67-0.668L9.585,13.339z M13.341,9.578l-0.906-0.906l0.663-0.662c0.307-0.307,0.307-0.805,0-1.112c-0.307-0.307-0.805-0.307-1.112,0L11.322,7.56l-0.906-0.906l4.166-4.166l2.925,2.925L13.341,9.578z"
                        ></path>
                      </svg>
                    </p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalsListing;
