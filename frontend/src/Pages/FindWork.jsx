import React, { useState, useContext, useRef } from "react";
import JobListing from "../Components/JobListing";
import { SlidersHorizontal, Search, MapPin } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { JobsContext } from "../context/jobContext";

const FindWork = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const { setSearchFilter, SetIsSearched } = useContext(JobsContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    SetIsSearched(true);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F9FAFF] font-outfit">
        {/* Page header */}
        <div className="container mx-auto 2xl:px-20 py-10 px-4 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Find Your Dream Job
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex md:flex-row flex-col items-center justify-between gap-4">
            <div className="flex flex-row items-center justify-between border border-gray-300 rounded-md text-gray-600 p-2 bg-white shadow-sm  w-full">
              <div className="flex items-center w-full ">
                <Search
                  className="h-4 sm:h-5 text-gray-400 mx-2"
                  strokeWidth={0.5}
                />
                <input
                  type="text"
                  placeholder="Search for jobs"
                  className="text-sm p-2 w-full placeholder:text-sm outline-none"
                  ref={titleRef}
                />
              </div>
              <div className="flex items-center w-full  sm:border-l border-gray-200">
                <MapPin
                  className="h-4 sm:h-5 text-gray-400 mx-2"
                  strokeWidth={0.5}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="text-sm p-2 placeholder:text-sm w-full outline-none"
                  ref={locationRef}
                />
              </div>
              <button
                onClick={onSearch}
                className="bg-[#0867bc] text-sm px-4 py-2 text-white rounded-md sm:ml-2 mt-2 sm:mt-0 hover:bg-[#065ba3] transition-all"
              >
                Search
              </button>
            </div>

            <button
              onClick={() => setFilterVisible((prev) => !prev)}
              className="flex items-center gap-2 bg-transparent whitespace-nowrap border border-gray-400 text-black py-2 px-4 rounded-md hover:bg-gray-200 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {filterVisible ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>
        {/* Job Listing with filter toggle */}
        <div className="container mx-auto 2xl:px-20">
          <JobListing initialShowFilter={filterVisible} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindWork;
