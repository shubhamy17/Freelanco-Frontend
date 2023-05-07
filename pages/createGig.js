import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Packages from "../components/Freelancer/Packages";
import loadingGif from "../public/walk.gif";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useGigs from "../hooks/useGigs";
import { uploadImage, uploadJson } from "../api/ipfs";
import axios from "axios";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import TxBox from "../components/Validation/TxBox";
import ErrorBox from "../components/Validation/ErrorBox";
import { createGig } from "../api/gig";
import { useSigner } from 'wagmi'


const CreateFreelancerPage = () => {
  const { user, isLogggedIn, gigContract, isConnected } =
    useAuth();
  const { categories } = useGigs();

  const router = useRouter();

  const [isShortTermSelected, setIsShortTermSelected] = useState(false);
  // const [title, setTitle] = useState("");
  // const [skillsChosen, setSkillsChosen] = useState([]);
  // const [isHourlySelected, setIsHourlySelected] = useState(false);
  // const [price, setPrice] = useState(null);
  // const [jd, setJd] = useState("");
  // const [skills, setSkills] = useState(["C++", "Python", "Tailwind", "AI/ML"]);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [isMinted, setIsMinted] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState("");
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showTxDialog, setShowTxDialog] = useState(false);
  const [txMessage, setTxMessage] = useState(undefined);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { data: signer, isError, isLoading } = useSigner()

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
    values,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      plans: [
        { price: 0, package_description: "" },
        { price: 0, package_description: "" },
        { price: 0, package_description: "" },
      ],
    },
  });
  const data = useWatch({ control });
  console.log(data);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skill",
  });

  useEffect(() => {
    if (categories) {
      setValue("category", categories[0].title);
      setValue("sub_category", categories[0]?.items[0]);
      setSubCategories(categories[0]?.items);
    }
  }, [categories]);

  const [jsonURI, setURI] = useState(undefined);

  const setCat = (e) => {
    // setValue("sub_category", "");
    const current_cat = e.target.value;
    const subCat = categories.filter((c) => c.title == current_cat);
    setSubCategories(subCat[0]?.items);
    setValue("sub_category", subCat[0]?.items[0]);
  };

  const setShortTerm = () => {
    setIsShortTermSelected(true);
  };

  const setLongTerm = () => {
    setIsShortTermSelected(false);
  };

  const setHourly = () => {
    setIsHourlySelected(true);
  };

  const setProjectBase = () => {
    setIsHourlySelected(false);
  };

  const duration = (data) => {
    setValue("duration", data);
  };

  // if (account === null || isLoggedIn === false) return <UhOhPage />;

  const handleNFTUpload = async (e) => {
    if (!isMinted) {
      setImageUploaded(e.target.files[0]);
      sendImageToBackend(e.target.files[0])
        .then(() => {
          setIsMinted(true);
        })
        .catch((err) => alert(err));
    } else {
      console.log("ALREADY MINTED");
    }
    // : alert("Sign in first");
  };

  const sendImageToBackend = async (selectedFile) => {
    setShowTxDialog(true);
    setTxMessage("image uploading to ipfs");
    const dataF = new FormData();
    dataF.append("file", selectedFile);

    const res = await uploadImage(dataF);
    setValue("ipfsImageHash", res.ipfsImageHash);
    setValue("awsImageLink", res.awsImageLink);
    setTxMessage(`ipfs hash: ${res.ipfsImageHash}`);
    setTimeout(() => {
      setShowTxDialog(false);
    }, 1000);
  };

  const sendJsonToBackend = async () => {
    setValue("wallet_address", user?.wallet_address);
    try {
      const res = await uploadJson(data);
      console.log("NFT URI: ", res.IpfsHash);
      setValue("tokenUri", res.IpfsHash);
      setURI(res.IpfsHash);
      setIsMinted(true);
    } catch (e) {
      console.log("Uploadong json faield: ", e);
    }
  };

  const contractCall = async () => {
    try {
      if (!signer) {
        throw new Error("please connect your wallet");
      }
      setIsMinted(false);
      setShowSubmitDialog(false);
      let contractWithSigner = gigContract.connect(signer);

      if (isMinted) {
        setTxMessage("Gig minting is in progress......");
        setShowTxDialog(true);
        let tx = await contractWithSigner.safeMint(jsonURI, {
          gasLimit: 500000,
        });
        try {
          await createGig(data);
        } catch (e) {
          console.log("Unable to create gig due to: ", e.toString());
        }
        await tx.wait();
        setShowTxDialog(false);
        router.push("/seller");
      } else {
        throw new Error("NOT MINTED");
      }
    } catch (e) {
      setShowTxDialog(false);
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

  function handleValidation() {
    const errors = {};

    if (!getValues("title")) {
      errors.title = "Title is required";
    }

    if (!getValues("description")) {
      errors.description = "Description is required";
    }

    if (!getValues("category")) {
      errors.category = "Category is required";
    }

    if (!getValues("sub_category")) {
      errors.sub_category = "Sub category is required";
    }

    if (!getValues("ipfsImageHash")) {
      errors.image = "image is required";
    }

    if (Object.keys(errors).length == 0 && counter == 0) {
      setCounter((prevState) => prevState + 1);
      setValidationErrors("");
      return;
    }

    if (
      getValues("plans")[0].price <= 0 ||
      !getValues("plans")[0].package_description
    ) {
      errors.plans = `Basic package details are required`;
    }

    console.log("errors", errors);

    if (Object.keys(errors).length == 0 && counter == 1) {
      setCounter((prevState) => prevState + 1);
      setValidationErrors("");
      return;
    }
    if (getValues("skill").length < 2) {
      errors.skill = `select at least 2 skills`;
    }
    if (Object.keys(errors).length == 0 && counter == 2) {
      setCounter((prevState) => prevState + 1);
      setValidationErrors("");
      return;
    }
    if (!getValues("duration")) {
      errors.duration = `select duration`;
    }
    if (Object.keys(errors).length == 0 && counter == 3) {
      // setCounter((prevState) => prevState + 1);
      setValidationErrors("");
      return true;
    }

    setValidationErrors(errors);
  }

  const [skill, setSkill] = useState([]);

  console.log("skill", skill);

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const skillOptions = [
    { value: "ReactJs", label: "ReactJs" },
    { value: "AngularJs", label: "AngularJs" },
    { value: "React Native", label: "React native" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Mongo", label: "Mongo" },
  ];
  function handleChange(selected) {
    const skill_data = selected.map((s) => s.value);
    setValue("skill", []); // Remove all items from the fields array
    skill_data.forEach((skill) => {
      append(skill); // Add new skill fields based on the selected skills
    });
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)] mt-20">
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
      <div className="h-3/4 w-[calc(70vw)] border-2 border-gray-200 shadow-lg">
        <div className="h-16 w-full flex justify-start items-center border-b pl-8">
          <span className="font-light font-serif text-2xl">
            Create your Gig
          </span>
        </div>
        <div className="flex items-start justify-center p-8 flex-col">
          {counter === 0 && (
            <>
              <h1 className="font-bold text-xl mb-4">
                {" "}
                Start Defining Your Gig
              </h1>
              {/* Cards */}
              <div className="flex justify-between w-full">
                <div className="flex space-x-16 w-full">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                    className="flex flex-col mt-2 w-full"
                  >
                    <label
                      htmlFor="title"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Gig Title
                    </label>
                    <input
                      name="title"
                      {...register("title", { required: true })}
                      type="text"
                      className="mr-2 placeholder:italic placeholder:text-slate-400 block bg-gray-100 bg-opacity-5 h-12 my-2 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    />
                    {validationErrors.title && (
                      <span className="text-red-500">
                        {validationErrors.title}
                      </span>
                    )}
                    <label
                      htmlFor="description"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      {...register("description")}
                      className="mr-2 h-32 placeholder:italic placeholder:text-slate-400 block bg-gray-100 bg-opacity-5 my-2 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    />
                    {validationErrors.description && (
                      <span className="text-red-500">
                        {validationErrors.description}
                      </span>
                    )}
                    <label
                      htmlFor="title"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      {...register("category")}
                      className="bg-transparent my-2 py-2 border-transparent rounded-lg px-2 font-light w-full focus:border-transparent active:border-transparent focus-visible:border-transparent"
                      value={data.category}
                      onChange={(e) => {
                        setCat(e);
                        setValue("category", e.target.value);
                      }}
                    >
                      {categories
                        ?.map((c) => c.title)
                        ?.map((category, idx) => (
                          <option key={idx} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                    {validationErrors.category && (
                      <span className="text-red-500">
                        {validationErrors.category}
                      </span>
                    )}

                    <>
                      <label
                        htmlFor="title"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Sub Category
                      </label>
                      <select
                        name="sub_category"
                        {...register("sub_category")}
                        className="bg-transparent my-2 py-2 border-transparent rounded-lg px-2 font-light w-full focus:border-transparent active:border-transparent focus-visible:border-transparent"
                        value={data?.sub_category}
                        onChange={(e) => {
                          setValue("sub_category", e.target.value);
                        }}
                      >
                        {subCategories?.map((cat, idx) => (
                          <option key={idx} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {validationErrors.sub_category && (
                        <span className="text-red-500">
                          {validationErrors.sub_category}
                        </span>
                      )}
                    </>
                  </form>
                </div>

                {imageUploaded ? (
                  <Image
                    src={URL.createObjectURL(imageUploaded)}
                    width={1}
                    height={1}
                    alt="Change?"
                    className="w-1/2 h-[40vh] cursor-pointer pl-10"
                  />
                ) : (
                  <div className="flex-col w-full">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-500 ml-4 -mb-10"
                    >
                      Gig Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ml-4"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={(e) => handleNFTUpload(e)}
                          disabled={isLogggedIn}
                        />
                      </label>
                    </div>
                    {validationErrors.image && (
                      <div className="text-red-500">
                        {validationErrors.image}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex w-full mt-5 justify-end items-end">
                <button
                  className="bg-blue-300 p-4 shadow-sm rounded-3xl text-md text-white px-8"
                  onClick={handleValidation}
                  // onClick={() => {

                  //   setCounter((prevState) => prevState + 1);
                  // }}
                  handleNFTUpload
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {counter === 1 && (
            <>
              {validationErrors.plans && (
                <span className="text-red-500">{validationErrors.plans}</span>
              )}
              <div className="flex justify-between items-start w-full">
                <div className="w-3/4">
                  <Packages
                    register={register}
                    control={control}
                    setValue={setValue}
                  />
                </div>

                <div className="max-w-[calc(20vw)] py-4 px-8 shadow-lg rounded-lg mt-2 bg-blue-100 flex-1/4">
                  <div>
                    <h2 className="text-gray-800 text-xl font-semibold">
                      Set your packages
                    </h2>
                    {/* <img
                      src="https://cdn.shopify.com/s/files/1/2018/8867/files/play-button.png"
                      className="cursor-pointer mt-2 h-24 w-full"
                    /> */}
                    <p className="mt-2 text-gray-600 text-xs">
                      <ul className="list-disc ml-2">
                        <li>Set the prices for your 3 packages</li>
                        <li>
                          Select the elements you want to include in each offer
                        </li>
                        <li>Add a description to be more informative</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-full h-32 justify-end items-end">
                <button
                  className="bg-blue-300 p-4 shadow-sm rounded-3xl text-md text-white px-8 mr-2"
                  onClick={() => {
                    setCounter((prevState) => prevState - 1);
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-blue-300 p-4 shadow-sm rounded-3xl text-md text-white px-8 "
                  onClick={handleValidation}
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {counter === 2 && (
            <>
              <label className="block font-bold text-xl mb-2">Skills:</label>
              <ReactSelect
                options={skillOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                }}
                onChange={handleChange}
                allowSelectAll={true}
                value={skill.optionSelected}
                className="block w-full bg-gray-200 text-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
              {validationErrors.skill && (
                <span className="text-red-500">{validationErrors.skill}</span>
              )}
              {/* <div className="flex flex-wrap">
                {skills.map((skill, idx) => {
                  return (
                    <div
                      className={
                        skillsChosen.includes(idx)
                          ? "border p-4 flex items-center justify-center space-x-5 m-2 bg-gray-100 cursor-pointer transition delay-100"
                          : "border p-4 flex items-center justify-center space-x-5 m-2 hover:bg-gray-100 cursor-pointer transition delay-100"
                      }
                      key={idx}
                      onClick={() => {
                        if (skillsChosen.includes(idx)) {
                          setSkillsChosen((prevSkills) =>
                            [...prevSkills].filter((skill) => skill !== idx)
                          );
                          remove(skill);
                        } else {
                          if (skillsChosen.length < 3) {
                            setSkillsChosen((prevSkills) => [
                              ...prevSkills,
                              idx,
                            ]);
                            append(skill);
                          }
                        }
                      }}
                    >
                      <span>{skill}</span>
                      {skillsChosen.includes(idx) ? (
                        <img
                          src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/344/external-tick-interface-royyan-wijaya-detailed-outline-royyan-wijaya.png"
                          className="w-5 h-5"
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/748/748113.png"
                          className="w-4 h-4"
                          alt=""
                          style={{
                            filter: "brightness(0) invert(0)",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div> */}
              {/* <h1 className="font-bold text-xl mb-4"> Define Skills Used</h1>
              <div className="flex flex-wrap">
                {skills.map((skill, idx) => {
                  return (
                    <div
                      className={
                        skillsChosen.includes(idx)
                          ? "border p-4 flex items-center justify-center space-x-5 m-2 bg-gray-100 cursor-pointer transition delay-100"
                          : "border p-4 flex items-center justify-center space-x-5 m-2 hover:bg-gray-100 cursor-pointer transition delay-100"
                      }
                      key={idx}
                      onClick={() => {
                        if (skillsChosen.includes(idx)) {
                          setSkillsChosen((prevSkills) =>
                            [...prevSkills].filter((skill) => skill !== idx)
                          );
                        } else {
                          if (skillsChosen.length < 3) {
                            setSkillsChosen((prevSkills) => [
                              ...prevSkills,
                              idx,
                            ]);
                          }
                        }
                      }}
                    >
                      <span>{skill}</span>
                      {skillsChosen.includes(idx) ? (
                        <img
                          src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/344/external-tick-interface-royyan-wijaya-detailed-outline-royyan-wijaya.png"
                          className="w-5 h-5"
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/748/748113.png"
                          className="w-4 h-4"
                          alt=""
                          style={{
                            filter: "brightness(0) invert(0)",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div> */}

              <div className="flex w-full h-24 justify-end items-end">
                <button
                  className="bg-blue-300 p-4 shadow-sm rounded-3xl text-md text-white px-8 mr-2"
                  onClick={() => {
                    setCounter((prevState) => prevState - 1);
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-blue-300 p-4 shadow-sm rounded-3xl text-md text-white px-8 "
                  onClick={handleValidation}
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {counter === 3 && (
            <>
              <h1 className="font-bold text-xl mb-4">
                {" "}
                What would you like to do?{" "}
              </h1>
              {/* Cards */}
              <div className="flex space-x-16 w-full">
                <div
                  className={
                    (isShortTermSelected
                      ? "h-48 w-1/2 border-2 shadow-md border-blue-200"
                      : "h-48 w-1/2 border-2 shadow-md") +
                    " flex justify-center hover:bg-blue-100 cursor-pointer transition ease-in-out delay-50 rounded-3xl items-center flex-col"
                  }
                  onClick={() => {
                    duration("short");
                    setIsShortTermSelected(true);
                  }}
                >
                  <img
                    src="https://img.icons8.com/ios-glyphs/344/clock--v1.png"
                    alt=""
                    className="w-16 h-16"
                  />
                  <span className="font-bold">
                    Short term or part time work
                  </span>
                  <span className="text-sm text-gray-500">
                    Less than 30 hrs/week
                  </span>
                </div>
                <div
                  className={
                    (isShortTermSelected === false
                      ? "h-48 w-1/2 border-2 shadow-md border-blue-200"
                      : "h-48 w-1/2 border-2 shadow-md") +
                    " flex justify-center hover:bg-blue-100 cursor-pointer transition ease-in-out delay-50 rounded-3xl items-center flex-col"
                  }
                  onClick={() => {
                    duration("long");
                    setIsShortTermSelected(false);
                  }}
                >
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                    className="w-16 h-16"
                  />
                  <span className="font-bold">Long term work</span>
                  <span className="text-sm text-gray-500">
                    Less than 30 hrs/week
                  </span>
                </div>
              </div>
              {validationErrors.duration && (
                <span className="text-red-500">
                  {validationErrors.duration}
                </span>
              )}

              <div className="flex w-full h-20 justify-end items-end">
                <button
                  className="bg-blue-300 p-4 shadow-sm rounded-3xl text-md text-white px-8 mr-2"
                  onClick={() => {
                    setCounter((prevState) => prevState - 1);
                  }}
                >
                  Back
                </button>
                <button
                  className={
                    loading
                      ? "p-4 rounded-3xl text-md text-white w-32"
                      : "bg-blue-300 p-4 shadow-sm rounded-3xl text-md text-white w-32"
                  }
                  onClick={async () => {
                    const p = handleValidation();
                    console.log("ppppppppppppppp", p);
                    if (p) {
                      await sendJsonToBackend();
                      setShowSubmitDialog(true);
                    }
                  }}
                // onClick={submitGig}
                // setLoading(true);
                // postJob({
                //   is_hourly: isHourlySelected ? "hourly" : "fixed",
                //   job_length: isShortTermSelected ? "short" : "long",
                //   title,
                //   description: jd,
                //   status: "open",
                //   budget: price,
                //   skills: skillsChosen,
                //   company_posted: user?._id,
                // }).then(() => {
                //   setLoading(false);
                //   navigate("/dashboard");
                // });
                // router.push("/seller");
                >
                  {/* <span className="" onClick={() => submitGig()}> */}
                  <span className="">Submit</span>
                </button>
              </div>
              <div
                id="popup-modal"
                tabindex="-1"
                class={
                  showSubmitDialog === true
                    ? "absoluteCenter transition-all "
                    : "hidden"
                }
              >
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                    onClick={() => setShowSubmitDialog(false)}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 class="mb-2 text-lg font-normal text-gray-500">
                      GIG Uploaded to{" "}
                      <a
                        href={"https:ipfs.io/ipfs/" + jsonURI}
                        target="_blank"
                        className="text-blue-800 underline"
                      >
                        IPFS
                      </a>
                      {/* <span className="text-blue-800 underline">
                        Click here to see
                      </span> */}
                      {/* {proposalsData[selectedOrder]?.price} from{" "}
                      {proposalsData[selectedOrder]?.user?.wallet_address}? */}
                    </h3>
                    <p className="my-2 mb-4 text-md font-normal text-gray-500">
                      CID: {jsonURI}
                    </p>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      // onClick={() => {
                      //   acceptOffer(selectedOrder);
                      // }}
                      onClick={() => contractCall()}
                      class="text-white bg-blue-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Mint
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={() => setShowSubmitDialog(false)}
                      class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateFreelancerPage;
