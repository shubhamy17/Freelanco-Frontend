import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { updateRating } from "../../api/gig";

function RatingForm({
  proposal,
  freelancer,
  cancel,
  setRating: setHigherRating,
}) {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { user } = useAuth();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let payload = {};
    if (freelancer) {
      payload = {
        rating,
        comment,
        wallet_address: user?.wallet_address,
        client_address: null,
        freelancer_address: proposal?.freelancer_address,
        proposal_id: proposal?._id,
      };
    } else {
      payload = {
        rating,
        comment,
        wallet_address: user?.wallet_address,
        client_address: proposal?.client_address,
        freelancer_address: null,
        proposal_id: proposal?._id,
      };
    }

    // You can do something with the rating and comment here, e.g. send it to a server
    try {
      console.log("Sending review: ");
      const res = await updateRating(proposal?.gig_detail?._id, payload);
      console.log(res);

      setSuccessful(true);

      // Reset the form
      setHigherRating(rating);

      setComment("");
      // location.reload();
    } catch (e) {
      console.log(e);
      alert("Error");
    }
  };

  return (
    <form className="bg-white p-4 flex flex-col gap-y-5 items-center shadow-lg w-[30vw]">
      {successful ? (
        <>
          <div class="relative p-4 text-center text-black bg-white rounded-lg">
            <div class="w-12 h-12 rounded-full bg-blue-100 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Success</span>
            </div>
            <p class="mb-4 text-lg font-semibold text-gray-900">
              Successfully added review.
            </p>
            <button
              data-modal-toggle="successModal"
              type="button"
              class="py-2 mt-20 px-3 text-sm font-medium text-center text-blue-700 rounded-lg bg-white-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
              onClick={() => {
                setSuccessful(false);
                cancel(false);
              }}
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="self-start text-2xl font-extrabold pl-1 mt-2">
            Rate and Review
          </h1>
          <p className="self-start pl-5 text-sm text-gray-500">
            Total Reviews:{" "}
            <span className="text-xs font-bold">
              ({proposal?.gig_detail?.reviews.length})
            </span>
          </p>
          <div>
            <StarRating value={rating} onChange={handleRatingChange} />
          </div>
          <p className="self-start pl-5 text-sm text-gray-500">
            Write your thoughts{" "}
          </p>
          <div className="flex-col gap-x-5 items-center w-full">
            {/* <label htmlFor="comment">Review:</label> */}
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              className="w-full border-1 border-blue-400 h-48"
            />
          </div>
          <div className="flex justify-between w-full px-10">
            <button
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                cancel(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </form>
  );
}

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-x-2 mr-10">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i} className="flex">
            <input
              type="radio"
              className="hidden"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                onChange && onChange(ratingValue);
              }}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingForm;
