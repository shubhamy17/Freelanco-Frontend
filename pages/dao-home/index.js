import React, { useEffect, useState } from "react";
import ProposalsListing from "../../components/DAO/ProposalsListing";
import { getDaoTreasury, getProposolsOfDao } from "../../api/proposal";
import useAuth from "../../hooks/useAuth";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const DaoHome = () => {
  const [daoProposals, setDAOProposals] = useState([]);
  const [totalVoters, setTotalVoters] = useState(undefined);
  const [teasuryBalance, setTreasuryBalance] = useState(undefined);
  const router = useRouter();

  const { user, daoNFTContract } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const re = await getDaoTreasury();
      if (re?.balance) {
        setTreasuryBalance(re.balance);
      }

      const res = await getProposolsOfDao();
      let myProposals = [];

      let total0Votes = 0;
      let total1Votes = 0;

      const voterAddresses = new Set();

      for (let i = 0; i < res.length; i++) {
        const proposal = res[i];
        for (let j = 0; j < proposal.votes.length; j++) {
          voterAddresses.add(proposal.votes[j].wallet_address);
          const vote = proposal.votes[j];
          if (vote.voteSupport === 0) {
            total0Votes++;
          } else if (vote.voteSupport === 1) {
            total1Votes++;
          }
        }

        myProposals.push({ ...proposal, total0Votes, total1Votes });
      }
      console.log(myProposals);
      console.log(voterAddresses);
      setTotalVoters(Array.from(voterAddresses).length);

      setDAOProposals(myProposals);
    };
    getData();
  }, []);

  return (
    <div className="">
      <div className="bg-gray-900 flex flex-col items-start justify-center text-center w-full text-white font-extrabold px-40 py-20">
        <p className="text-5xl ">Governance Overview</p>
        <div className="flex gap-x-2">
          <div className="w-64 border-2 border-white h-16 mt-5 rounded-2xl">
            <div className="flex-col text-md pt-1">
              <p>{daoProposals?.length}</p>
              <p className="text-white-500">Proposals Created</p>
            </div>
          </div>
          <div className="w-64 border-2 border-white h-16 mt-5 rounded-2xl">
            <div className="flex-col text-md pt-1">
              <p>{totalVoters}</p>
              <p className="text-white-500">Voting Addresses</p>
            </div>
          </div>
          <div className="w-64 border-2 border-white h-16 mt-5 rounded-2xl">
            <div className="flex-col text-md pt-1">
              <p>{teasuryBalance} MATIC</p>
              <p className="text-white-500">Treasury</p>
            </div>
          </div>
        </div>
      </div>
      <ProposalsListing daoProposals={daoProposals} />
    </div>
  );
};

export default DaoHome;
