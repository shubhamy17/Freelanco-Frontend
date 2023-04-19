import React, { useState, useEffect } from "react";
import Image from "next/image";
import GigsListing from "./GigsListing";
import useGigs from "../../hooks/useGigs";
import { getGigByCategory } from "../../api/gig";
import { useRouter } from "next/router";

const GigHeader = () => {
  const router = useRouter();
  const route_category = router.query.category;
  const { categories } = useGigs();
  const filtered_category = categories?.filter(
    (cat) => cat.title == route_category
  );
  // console.log(filtered_category[0]?.items[0]);
  const [subCategory, setSubCategory] = useState("");

  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    console.log(filtered_category);
    if (subCategory == "") {
      setSubCategory(filtered_category?.[0]?.items?.[0]);
    }
    const fetchData = async () => {
      console.log(route_category, subCategory);
      const data = { category: route_category, sub_category: subCategory };
      if (route_category && subCategory) {
        const result = await getGigByCategory(data);
        setGigs(result);
        console.log(result);
      }
    };
    fetchData();
  }, [subCategory, route_category]);

  return (
    <>
      <div className="bg-white">
        <div>
          <div
            className="relative z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>

            <div className="fixed inset-0 z-40 flex">
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>

                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900"
                  >
                    <li>
                      <a href="" className="block px-2 py-3">
                        Totes
                      </a>
                    </li>

                    <li>
                      <a href="" className="block px-2 py-3">
                        Backpacks
                      </a>
                    </li>

                    <li>
                      <a href="" className="block px-2 py-3">
                        Travel Bags
                      </a>
                    </li>

                    <li>
                      <a href="" className="block px-2 py-3">
                        Hip Bags
                      </a>
                    </li>

                    <li>
                      <a href="" className="block px-2 py-3">
                        Laptop Sleeves
                      </a>
                    </li>
                  </ul>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-0"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Color</span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>

                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <div className="pt-6" id="filter-section-mobile-0">
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-0"
                            name="color[]"
                            value="white"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-0"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            White
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-1"
                            name="color[]"
                            value="beige"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-1"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Beige
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-2"
                            name="color[]"
                            value="blue"
                            type="checkbox"
                            checked
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-2"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Blue
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-3"
                            name="color[]"
                            value="brown"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-3"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Brown
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-4"
                            name="color[]"
                            value="green"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-4"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Green
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-5"
                            name="color[]"
                            value="purple"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-5"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Purple
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-1"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Category
                        </span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>

                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <div className="pt-6" id="filter-section-mobile-1">
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-0"
                            name="category[]"
                            value="new-arrivals"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-0"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            New Arrivals
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-1"
                            name="category[]"
                            value="sale"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-1"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Sale
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-2"
                            name="category[]"
                            value="travel"
                            type="checkbox"
                            checked
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-2"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Travel
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-3"
                            name="category[]"
                            value="organization"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-3"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Organization
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-4"
                            name="category[]"
                            value="accessories"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-4"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Accessories
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-2"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Size</span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>

                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <div className="pt-6" id="filter-section-mobile-2">
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-0"
                            name="size[]"
                            value="2l"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-0"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            2L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-1"
                            name="size[]"
                            value="6l"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-1"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            6L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-2"
                            name="size[]"
                            value="12l"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-2"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            12L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-3"
                            name="size[]"
                            value="18l"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-3"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            18L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-4"
                            name="size[]"
                            value="20l"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-4"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            20L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-5"
                            name="size[]"
                            value="40l"
                            type="checkbox"
                            checked
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-5"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            40L
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <main
            className=""
            style={{
              maxWidth: "90%",
            }}
          >
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
              <GigHero title={filtered_category?.[0]?.title} />

              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>

                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {filtered_category?.[0]?.items?.map((sub_category) => {
                      return (
                        <li
                          className="cursor-pointer"
                          onClick={() => {
                            setSubCategory(sub_category);
                          }}
                        >
                          {sub_category}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-0"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Seller Details
                        </span>
                      </button>
                    </h3>

                    <div className="pt-6" id="filter-section-0">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            id="filter-color-0"
                            name="color[]"
                            value="white"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-color-0"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Top Rated Seller
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-color-1"
                            name="color[]"
                            value="beige"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-color-1"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Level Two
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-color-2"
                            name="color[]"
                            value="blue"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-color-2"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Level One
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="lg:col-span-3">
                  <div className="h-96 rounded-lg lg:h-full">
                    <GigsListing gigs={gigs} />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

const GigHero = ({ title }) => {
  return (
    <div className="flex-col gap-y-1">
      <h1 className="text-3xl font-sans font-semibold">{title}</h1>
      <div className="flex gap-x-2 justify-start items-center mt-1">
        <h3 className="text-sm text-gray-400 font-light">
          Stand out from the crowd with a logo that fits your brand personality.{" "}
        </h3>
        <Image src={"/play.png"} width={20} height={5} className="-mx-1" />
        <span className="text-xs text-blue-800 font-light select-none cursor-pointer">
          How Freelanco Works
        </span>
      </div>
    </div>
  );
};

export default GigHeader;
