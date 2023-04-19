import React, { useState } from "react";

const MakeDispute = ({ proposal, cancel, dispute }) => {
  console.log("PROPOSAL::", proposal);
  const [reason, setReason] = useState("");
  return (
    <div className="bg-white p-10">
      <h1 className="self-start text-2xl font-extrabold pl-1 my-5">
        Make a Proposal to the DAO
      </h1>

      <textarea
        className="w-full border-1 border-blue-400 h-48"
        id="grid-first-name"
        type="text"
        placeholder=""
        rows={10}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <div className="flex justify-between w-full px-10 mt-5">
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => {
            cancel(false);
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            cancel(true);
            dispute(reason);
          }}
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Send to Blockchain
        </button>
      </div>
    </div>
  );
};

export default MakeDispute;
