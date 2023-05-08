import React, { useEffect } from "react";
import useGigs from "../../hooks/useGigs";
import { useRouter } from "next/router";
import { getCategoryImage } from "../../api/category";
import Image from "next/image";

export const CategoryCard = ({ category }) => {
  const router = useRouter();

  console.log(category);

  const imageMapping = {
    GameFi: "/mid.png",
    DeFi: "/mid2.png",
    NFT: "/b.jpeg",
    "Consensus Protocols": "/dd.png",
  };

  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/gigs",
          query: {
            category: category.title,
          },
        });
      }}
      className={
        "bg-cover border-1 shadow-2xl border border-gray-800 cursor-pointer mb-10"
      }
    >
      <Image
        src={imageMapping[category.title]}
        width={500}
        height={500}
        // layout="fill"
        // objectFit="cover"
        className="lg:h-[40vh] md:h-[40vh] sm:h-[30vh] h-[20vh] w-[50vw]"
      />
      <div className="p-5">
        <p className="font-normal text-xs text-white capitalize">
          {category?.description}
        </p>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
          {category?.title}
        </h5>
      </div>
    </div>
  );
};

export const Deck = ({}) => {
  const { categories } = useGigs();
  return (
    <>
      <div className="md:flex gap-x-5 items-center justify-center w-full flex longIt lg:px-20 ">
        {categories?.slice(0, 4).map((category) => {
          return <CategoryCard category={category} />;
        })}
      </div>
    </>
  );
};

export default Deck;
