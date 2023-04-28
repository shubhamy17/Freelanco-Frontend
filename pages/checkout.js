import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { addProposal } from "../api/proposal";
import useAuth from "../hooks/useAuth";
import { ethers } from "ethers";
import axios from "axios";
import ErrorBox from "../components/Validation/ErrorBox";
import TxBox from "../components/Validation/TxBox";

const checkout = () => {
  const router = useRouter();
  let gig;
  const gig_data = router?.query?.gig;
  if (gig_data) {
    gig = JSON.parse(gig_data);
  }
  console.log("gig------->", gig);
  const [startDate, setStartDate] = useState(new Date());
  const [daoCharge, setDaoCharge] = useState(0);
  const [total, setTotal] = useState();
  const { user, freelancoContract, signer } = useAuth();
  const [conversationRate, setConvertionRate] = useState(undefined);

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showTxDialog, setShowTxDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [txMessage, setTxMessage] = useState(undefined);
  const [validationErrors, setValidationErrors] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset: resetFormState,
    setValue,
    getValues,
    trigger,
    unregister,
  } = useForm({
    mode: "onChange",
  });
  const data = useWatch({ control });
  console.log(data);

  const handleChange = (e) => {
    setValue("freelancer_charges", e.target.value);
    setDaoCharge((e.target.value * 0.2).toFixed(2));
    setTotal((e.target.value * 1.2).toFixed(2));
    setValue("price", e.target.value * 1.2);
  };

  const submit_proposal = async () => {
    const errors = {};

    if (!getValues("terms")) {
      errors.terms = 'terms is required';
    }

    if (!getValues("freelancer_charges")) {
      errors.charge = 'freelancer charges required';
    }

    const selectedDateString = getValues("deadline");

    if (!selectedDateString) {
      errors.deadline = "please mention deadline";
    } else {
      const selectedDate = new Date(selectedDateString);
      const currentDate = new Date();
      const selectedTimestamp = selectedDate.getTime();
      const currentTimestamp = currentDate.getTime();
      if (selectedTimestamp < currentTimestamp) {

        errors.deadline = "please select a date that is on or after the current date";
      }
    } console.log(errors);

    // if (!getValues("deadline")) {
    //   errors.deadline = "please mention deadline";
    // }
    // if (getValues("deadline") && getValues("deadline") < new Date()) {
    //   console.log("hii");
    //   errors.deadline = "please select a date that is on or after the current date";
    // }

    setValidationErrors(errors);

    if (Object.keys(errors).length != 0) {
      return;
    }

    const d = {
      ...data,
      client_ref: user?._id,
      freelancer_ref: gig?.freelancer_ref,
      gig_ref: gig?._id,
    };
    let contractWithSigner = freelancoContract.connect(signer);

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const _deadline =
      (Math.floor(new Date(data.deadline).getTime() / 1000) -
        currentTimestamp) /
      12;
    try {
      console.log("freelanco:", contractWithSigner);
      let tx = await contractWithSigner.sendOffer(
        // result.data._id.toString(),
        gig.tokenId,
        gig.freelancer.wallet_address,
        data.terms,
        Math.floor(_deadline),

        {
          value: ethers.utils.parseEther(
            Math.floor(data.price / 1.11).toString()
          ),
          gasLimit: 1000000,
        }
      );
      console.log("TX HASH OBJECT: ", tx);

      setTxMessage(tx.hash);
      setShowTxDialog(true);
      await tx.wait(6);
      setShowTxDialog(false);
      router.push("/client-profile");
      console.log("TX: RECEIPT OBJECT:", tx);
      setTxMessage(tx.hash);
    } catch (e) {
      setShowErrorDialog(true);
      if (e.toString().includes("rejected")) {
        setErrorMessage("User declined the action");
      } else if (e.toString().includes("deadline")) {
        setErrorMessage("Please select a date that is after today's date");
      } else {
        setErrorMessage(e.toString());
      }
    }
  };

  useEffect(() => {
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;

    axios
      .get(apiUrl)
      .then((response) => {
        setConvertionRate(response.data.ethereum.usd);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <ErrorBox
        show={showErrorDialog}
        cancel={setShowErrorDialog}
        errorMessage={errorMessage}
      />
      <TxBox
        show={showTxDialog}
        cancel={setShowTxDialog}
        txMessage={txMessage}
      // routeToPush={"/client-profile"}
      />
      <div className="flex justify-start items-start bg-gray-50 w-full p-14 pt-20 px-40">
        <div className="w-full flex-col justify-start items-start mr-10">
          <div className="">
            <p className="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 text-blue-800">
              Check out
            </p>
          </div>
          <div className="mt-2">
            <Link
              href="explore"
              className="text-base leading-4 focus:outline-none focus:underline hover:underline hover:text-blue-800 text-gray-600 cursor-pointer"
            >
              Back to exploring?
            </Link>
          </div>
          <div className="mt-12">
            <p className="text-lg  leading-4 text-blue-800">
              Do you have any{" "}
              <a
                href="javascript:void(0)"
                className="focus:outline-none  hover:underline font-semibold focus:underline"
              >
                terms or conditions?
              </a>
            </p>
          </div>
          <div className="my-4 flex flex-col justify-start items-start w-full space-y-8">
            <textarea
              {...register("terms")}
              className="p-8 focus:ring-2 rounded-lg focus:ring-gray-500 focus:outline-none px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
              placeholder="Feel free to write your about your deal"
              rows={5}
            />
            {validationErrors.terms && (
              <span className="text-red-500">{validationErrors.terms}</span>
            )}

          </div>
        </div>
        <div className="flex mt-7 flex-col items-end w-full space-y-6">
          <h1 className="text-2xl  font-semibold leading-6 text-blue-800 self-start">
            Order Summary
          </h1>
          <div className="flex justify-between w-full items-center">
            <p className="text-lg leading-4 text-gray-600">
              Freelancer Charges $
            </p>
            <input
              name="freelancer_charges"
              type="number"
              onChange={handleChange}
              className="mr-2  leading-4  placeholder:italic placeholder:text-slate-400 block bg-gray-100 bg-opacity-5 h-12 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            />

          </div>
          {validationErrors.charge && (
            <span className="text-red-500">{validationErrors.charge}</span>
          )}

          <div className="flex justify-between w-full items-center">
            <p className="text-lg  leading-4 text-gray-600">
              DAO Charges (20%)
            </p>
            <p className="text-lg  font-semibold leading-4 text-gray-600">
              ${daoCharge}
            </p>
          </div>
          <div className="flex justify-between w-full items-center">
            <p className="text-lg leading-4 text-gray-600">Sub total</p>
            <p className="text-lg font-semibold leading-4 text-gray-600">
              ${total}
            </p>
          </div>
          <div className="flex justify-between w-full items-center">
            <p className="text-lg leading-4 text-gray-600">Choose Deadline</p>
            <div>
              <input
                {...register("deadline")}
                type="date"
              // selected={startDate}
              // onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          {validationErrors.deadline && (
            <span className="text-red-500">{validationErrors.deadline}</span>
          )}

          <div className="flex justify-end w-full items-center">
            <span
              className={
                "font-light border-2 px-9 py-2 text-lg rounded-md text-blue-800 cursor-pointer border-blue-800"
              }
              onClick={submit_proposal}
            >
              Sign & Pay
            </span>
          </div>
        </div>
      </div>
      <div className="border-blue-800 border-2 mx-20 h-[60vh] my-20 rounded-2xl flex-col pl-20 pt-20">
        <h1 className="text-5xl my-10 font-semibold text-blue-800">
          Join the Freelanco Community
        </h1>
        <h1 className="text-md w-2/3 leading-6 text-blue-800">
          Looking to learn more about Freelanco and ZOO? No matter where you’re
          from, here are the best resources available in order to get educated,
          and become part of the Community.
        </h1>

        <button
          className="mt-10 text-xl font-light text-white rounded-2xl px-6 py-4 bg-blue-800"
          onClick={() => router.push("dao-login", "dao-portal")}
        >
          Join the DAO
        </button>
      </div>
    </>
  );
};

export default checkout;
