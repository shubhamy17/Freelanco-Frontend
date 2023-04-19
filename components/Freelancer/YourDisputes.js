import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/proposal";
import useAuth from "../../hooks/useAuth";
import OrderCard from "./OrderCard";
import { useRouter } from "next/router";

const YourDisputes = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [disputedOrders, setDisputedOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      //api -> get all proposals of freelancer
      const res = await getOrders();
      setDisputedOrders(
        res.filter(
          (res) =>
            res.status == "Over_By_Freelancer" ||
            res.status == "Over_By_Client" ||
            res.status == "Dispute_Over"
        )
      );
    };
    if (user) {
      getData();
    }
  }, [user]);
  return (
    <div className="flex-1/4 w-3/4">
      {disputedOrders.length > 0 == true ? (
        <div className="flex-col w-[70vw]">
          <div className="flex space-x-3 p-4 items-center justify-between ">
            <div>
              <h1 className="font-bold text-xl">Your Disputes</h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-6">
            {/* <GigCard isTopRated={false} /> */}
            {disputedOrders.length > 0 ? (
              disputedOrders.map((order) => (
                <OrderCard
                  order={order}
                  onRoute={(data) => {
                    router.push({
                      pathname: "/dao-home/proposal-detail",
                      query: {
                        proposal: JSON.stringify(order),
                        data,
                      },
                    });
                  }}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
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
            No disputes found
          </p>
        </div>
      )}
    </div>
  );
};

export default YourDisputes;
