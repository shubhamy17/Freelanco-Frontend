import React, { useEffect } from "react";
import useGigs from "../../hooks/useGigs";
import { useRouter } from "next/router";
import { getCategoryImage } from "../../api/category";
import Image from "next/image";

export const CategoryCard = ({ category }) => {
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const res = await getCategoryImage("category.jpg");
      console.log(res);
    };

    getData();
  }, []);

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
        "w-[20vw] h-[40vh] bg-cover border-1 shadow-lg cursor-pointer mb-10"
      }
    >
      <Image
        src={category.image}
        width={500}
        height={500}
        // layout="fill"
        objectFit="cover"
        className="h-[40vh]"
      />
      <div className="p-5">
        <p className="font-normal text-xs text-blue-700 capitalize">
          {category?.description}
        </p>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-blue-900">
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
      <div className="flex gap-x-5 items-center justify-center w-full">
        {categories?.slice(0, 4).map((category) => {
          return <CategoryCard category={category} />;
        })}
      </div>
    </>
  );
};

export default Deck;
