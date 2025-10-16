import React, { useContext, useRef } from "react";
import { Search, MapPin } from "lucide-react";

import HeroBg from "../assets/bannerrr.png";
import BG from "../assets/bggg.png";
import SideImage from "../assets/banner-side.svg"; // ← new image
import { JobsContext } from "../context/jobContext";
import TrustedBy from "./TrustedBy";

const Hero = () => {
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
      {/* HERO SECTION */}
      <div
        className="relative font-outfit  bg-white bg-cover bg-center bg-no-repeat shadow flex flex-col justify-center text-white"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0">
          <img src={BG} alt="" className="" />
        </div>

        {/* Hero content */}
        <div className="relative py-20 container z-10 px-4 2xl:px-20 mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl bg-gradient-to-r from-[#0867bc] to-[#00aaff] bg-clip-text text-transparent md:text-4xl lg:text-6xl font-semibold mb-9">
              Over 10,000+ Jobs to Apply
            </h2>
            <p className="mb-9 text-black max-w-2xl mx-auto md:mx-0 text-sm md:text-base font-light">
              Your Next Big Career Move Starts Right Here — Explore the Best Job
              Opportunities and Take the First Step Toward Your Future!
            </p>

            {/* Search bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between border border-gradient-to-r from-[#0867bc] to-[#00aaff] rounded-md text-gray-600 p-2 max-w-xl bg-white shadow-md mx-auto md:mx-0">
              <div className="flex items-center w-full sm:w-1/2">
                <Search
                  className="h-4 sm:h-5 text-gray-400 mx-2"
                  strokeWidth={0.5}
                />
                <input
                  type="text"
                  placeholder="Search for jobs"
                  className="text-sm p-2 w-full outline-none"
                  ref={titleRef}
                />
              </div>
              <div className="flex items-center w-full sm:w-1/2 sm:border-l border-gray-200">
                <MapPin
                  className="h-4 sm:h-5 text-gray-400 mx-2"
                  strokeWidth={0.5}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="text-sm p-2 w-full outline-none"
                  ref={locationRef}
                />
              </div>
              <button
                onClick={onSearch}
                className="bg-[#0867bc] px-6 py-2 text-white rounded-md sm:ml-2 mt-2 sm:mt-0"
              >
                Search
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={SideImage}
              alt="Hero visual"
              className="w-[90%] md:w-[80%] object-cover"
            />
          </div>
        </div>
      </div>

      {/* TRUSTED BY SECTION */}
    </>
  );
};

export default Hero;
