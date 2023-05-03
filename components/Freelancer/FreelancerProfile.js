import { useEffect, useState } from "react";
import EditModal from "./EditModal";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Image from "next/image";

export const EditRow = ({ setting, allowEdit }) => {
  const [{ activate, deactivate }, setState] = useState({
    activate: false,
    deactivate: false,
  });

  return (
    <div className="flex items-center justify-start pl-10 space-x-16 w-full">
      <div className="flex flex-col items-start justify-center w-2/4">
        <span className="mt-4 capitalize">{setting.title}</span>
        <span className="text-gray-500 text-xs capitalize">{setting.desc}</span>
      </div>
      {/* {allowEdit && (
        <div
          className="bg-gray-200 p-2 rounded-full mt-4 hover:scale-110 cursor-pointer"
          onClick={() => setState({ activate: true, deactivate: false })}
        >
          <img
            src="https://img.icons8.com/ios/344/ball-point-pen.png"
            alt=""
            className="h-5 w-5"
          />
        </div>
      )} */}
    </div>
  );
};

const YourProfile = ({
  setShowManageDisputes,
  showManageDisputes,
  freelancerUser,
  setFreelancerUser,
}) => {
  const { user, currentFreelancerData, setCurrentFreelancerData } = useAuth();
  const router = useRouter();

  let freelancerData = null;
  console.log(user);

  const allowEdit = user?.freelancer_ref !== null;
  const [completenss, setcompletenss] = useState(undefined);

  useEffect(() => {
    if (currentFreelancerData) {
      const { education, workExperience, projects } = currentFreelancerData;
      const nonEmptyFields = [];

      if (education && education.length > 0) {
        const nonEmptyEducation = education.filter(
          (edu) => edu.collegeName && edu.degree
        );
        nonEmptyFields.push(...nonEmptyEducation);
      }

      if (workExperience && workExperience.length > 0) {
        const nonEmptyWorkExperience = workExperience.filter(
          (exp) => exp.company && exp.role
        );
        nonEmptyFields.push(...nonEmptyWorkExperience);
      }

      if (projects && projects.length > 0) {
        const nonEmptyWorkExperience = projects.filter(
          (exp) => exp.title && exp.description
        );
        nonEmptyFields.push(...nonEmptyWorkExperience);
      }

      const completeness = (nonEmptyFields.length / 3) * 100; // Assuming there are four fields (institution, degree, company, position)

      console.log("COMPLETENESS: ", completeness);

      setcompletenss(completeness.toFixed(0));
    }
  }, [currentFreelancerData]);

  const settings =
    freelancerData !== null
      ? [
          {
            title: "Profile Status",
            desc: freelancerData?.profile_status,
            id: "1",
            callback: "",
          },
          {
            title: "Job Title",
            desc: freelancerData?.occupation,
            id: "2",
            callback: "",
          },
          {
            title: "Your Category",
            desc: freelancerData?.category,
            id: "3",
            callback: "",
          },
        ]
      : [
          {
            title: "Profile Status",
            desc: user?.freelancer?.profile_status,
            id: "1",
            callback: "",
          },
          {
            title: "Job Title",
            desc: user?.freelancer?.occupation,
            id: "2",
            callback: "",
          },
          {
            title: "Your Category",
            desc: user?.freelancer?.category,
            id: "3",
            callback: "",
          },
        ];

  router?.query?.freelancer
    ? console.log("FREL :", JSON.parse(router?.query?.freelancer).workSamples)
    : null;

  return (
    <div className="border shadow-lg">
      {!router.query.freelancer && (
        <div className="flex justify-center items-center h-32 flex-col">
          {currentFreelancerData?.awsImageLink && (
            <Image
              src={currentFreelancerData?.awsImageLink}
              // {
              //   "https://ipfs.io/ipfs/" +
              //   (currentFreelancerData?.ipfsImageHash ||
              //     user?.freelancer?.ipfsImageHash)
              // }
              width={100}
              height={100}
              alt=""
              className="h-16 w-16 rounded-full bg-gray-50 shadow-md"
            />
          )}

          <Link href="seller-profile">
            <span className="pt-2 font-bold underline cursor-pointer">
              {/* {freelancerData != null
                ? freelancerUser?.name
                : currentFreelancerData?.name} */}
              {currentFreelancerData?.name || user?.freelancer?.name}
            </span>
          </Link>

          <span className="font-light text-md font-gray-600">
            {freelancerData != null
              ? freelancerData.occupation
              : currentFreelancerData?.occupation ||
                user?.freelancer?.occupation}
          </span>
        </div>
      )}
      {!router.query.freelancer && (
        <>
          <div className="flex flex-col p-8 bg-blue-100">
            {completenss == 100 ? (
              <span className="text-xs font-bold text-blue-600 text-center">
                <div className="h-16 flex items-center justify-center w-full bg-white mt-4 rounded-lg">
                  <p className="font-light font-sans text-xs p-4">
                    {" "}
                    Boost your profile
                  </p>
                  <div className="bg-blue-400 h-8 w-10 p-2 cursor-pointer hover:scale-110 rounded-full relative -right-4 flex justify-center items-center">
                    <img
                      src="https://img.icons8.com/ios-glyphs/344/long-arrow-right.png"
                      alt=""
                      className="h-8 w-8"
                      style={{
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                </div>
              </span>
            ) : (
              <>
                <span className="text-xs font-bold text-blue-600 text-center">
                  Profile Completeness
                </span>
                <div className="flex items-center space-x-4">
                  <div className="w-full bg-blue-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: String(completenss || 0) + "%",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-light">
                    {completenss || 0}%
                  </span>
                </div>
                <div className="h-16 flex items-center justify-center w-full bg-white mt-4 rounded-lg">
                  <p className="font-light font-sans text-xs p-4">
                    {" "}
                    {currentFreelancerData?.education?.length == 0
                      ? "Add education so clients know you're a pro"
                      : currentFreelancerData?.workExperience?.length == 0
                      ? "Add work experience so clients know you're a pro"
                      : currentFreelancerData?.projects?.length == 0
                      ? "Add projects so clients know you're a pro"
                      : user?.freelancer?.education?.length != 0
                      ? "Add projects so clients know you're a pro"
                      : ""}
                  </p>
                  <div className="bg-blue-400 h-8 w-10 p-2 cursor-pointer hover:scale-110 rounded-full relative -right-4 flex justify-center items-center">
                    <img
                      src="https://img.icons8.com/ios-glyphs/344/long-arrow-right.png"
                      alt=""
                      className="h-8 w-8"
                      style={{
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center items-center text-sm flex-col mb-10">
            {settings.map((setting, idx) => (
              <EditRow key={idx} setting={setting} allowEdit={allowEdit} />
            ))}
          </div>

          {router.pathname == "/seller-profile" ? (
            <></>
          ) : (
            <p
              // onClick={() => signOut()}
              href="/dao-login"
              className={
                "font-light border-2 px-3 py-1 rounded-md text-blue-800 text-sm cursor-pointer -mt-1 border-blue-800 text-center my-5 mx-2"
                // borderClass
              }
              onClick={() => {
                setShowManageDisputes(!showManageDisputes);
              }}
            >
              {showManageDisputes ? "Go Back" : "Manage Disputes"}
            </p>
          )}
        </>
      )}
      {router.query.freelancer &&
      JSON.parse(router?.query?.freelancer).workSamples?.length > 0 ? (
        JSON.parse(router?.query?.freelancer).workSamples.map((sample) => (
          <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r">
            <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8">
              <h3 class="text-md font-light font-semibold text-gray-900 ">
                {sample?.reviews[0]?.comment}
              </h3>
            </blockquote>
            <figcaption class="flex flex-col items-center justify-center space-x-3">
              <div className="flex items-center mt-2.5 mb-5">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {sample?.reviews[0]?.rating.toFixed(2)}
                </span>
              </div>
              <div class="space-y-0.5 font-medium text-left">
                <div class="text-sm text-gray-500">
                  {sample?.client_address.slice(0, 32)}...
                </div>
              </div>
            </figcaption>
          </figure>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default YourProfile;
