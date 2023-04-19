import Image from "next/image";
import useAuth from "../../hooks/useAuth";

const NavDrawer = ({ conversationsData, setSelected }) => {
  const { user } = useAuth();
  return (
    <div className="">
      {conversationsData?.length > 0 ? (
        <h1 className="self-center text-center text-2xl font-extrabold py-5">
          Your Chats
        </h1>
      ) : (
        <div className="min-h-[calc(70vh)] absoluteCenter flex items-center justify-center flex-col">
          <img
            src={"/empty.png"}
            alt=""
            className="w-1/4 h-1/4"
            style={{
              filter: "grayscale(1)",
            }}
          />
          <p className="text-center text-gray-800 font-bold">
            Please refresh if you don't see your conversations
          </p>
        </div>
      )}
      {conversationsData?.length > 0 ? (
        conversationsData.map((data, idx) => (
          <>
            {data.freelancer[0] ? (
              <div
                onClick={() => setSelected(data._id)}
                class="flex items-center bg-white border cursor-pointer px-2"
              >
                <Image
                  className="rounded-3xl h-14  m-4 max-h-sm"
                  src={
                    "https://ipfs.io/ipfs/" + data.freelancer?.[0].ipfsImageHash
                  }
                  alt="product image"
                  width={50}
                  height={50}
                />
                <div className="flex-col">
                  <p className="font-bold text-md hover:underline cursor-pointer">
                    {data.freelancer?.[0].name}
                  </p>
                  <h5 class="mb-2 text-xs font-bold tracking-tight text-gray-900">
                    {data.freelancer?.[0].wallet_address.slice(0, 16)}..
                  </h5>
                  {data.freelancer?.[0].isTopRated && (
                    <p className="text-blue-800 text-xs">Top Rated Seller</p>
                  )}
                </div>
              </div>
            ) : (
              <div
                onClick={() => setSelected(data._id)}
                class="flex items-center bg-white border cursor-pointer px-2"
              >
                <img
                  className="rounded-3xl m-4 max-h-sm"
                  src={"https://cryptologos.cc/logos/polygon-matic-logo.png"}
                  alt="product image"
                  width={50}
                  height={50}
                />
                <div className="flex-col">
                  <p className="font-bold text-md hover:underline cursor-pointer">
                    {data.participants[0] != user?.wallet_address
                      ? data.participants[0].slice(0, 18)
                      : data.participants[1].slice(0, 18)}{" "}
                    ...
                  </p>
                  <h5 class="mb-2 text-xs font-bold tracking-tight text-gray-900">
                    {new Date(
                      data.messages?.[data.messages.length - 1]?.created_at
                    ).toLocaleString()}
                  </h5>
                  {data.freelancer?.[0]?.isTopRated && (
                    <p className="text-blue-800 text-xs">Top Rated Seller</p>
                  )}
                </div>
              </div>
            )}
          </>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavDrawer;
