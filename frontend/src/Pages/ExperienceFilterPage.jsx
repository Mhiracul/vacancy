import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import BASE_URL from "../config"; // your backend base URL

const experienceLevels = [
  "No Experience",
  "Entry Level",
  "Internship & Graduate",
  "Mid Level",
  "Senior Level",
  "Executive Level",
];

const ExperienceFilterPage = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/jobs/experience-count`);
        setCounts(res.data);
      } catch (error) {
        console.error("Error fetching experience counts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 container mx-auto px-4 2xl:px-10 text-center">
      <h2 className="text-3xl font-bold mb-3 text-gray-900">
        Experience-based filtering
      </h2>
      <p className="text-gray-500 mb-10">
        Find jobs that suit your experience level
      </p>

      {loading ? (
        <p className="text-gray-500 py-10">Loading job data...</p>
      ) : (
        <>
          {/* ⬅️➡️ Buttons on top */}

          {/* Cards container */}
          <div
            ref={scrollRef}
            className="
              flex flex-wrap justify-center gap-2 
              md:flex-nowrap md:overflow-x-auto md:scroll-smooth md:pb-4
              md:scrollbar-thin md:scrollbar-thumb-blue-600 md:scrollbar-track-gray-100
            "
          >
            {experienceLevels.map((level) => (
              <div
                key={level}
                onClick={() =>
                  navigate(`/jobs/experience/${encodeURIComponent(level)}`)
                }
                className="
                  w-full sm:w-[47%] lg:w-[30%] xl:w-[240px]
                  flex-shrink-0 border border-gray-200 rounded-lg p-6 
                  shadow-sm hover:shadow-md hover:border-blue-600 transition 
                  cursor-pointer text-left bg-white
                "
              >
                <h3 className="font-semibold text-lg mb-1 text-gray-800">
                  {level}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {counts[level] || 0} Jobs
                </p>
                <span className="text-blue-600 font-medium text-sm flex items-center gap-1">
                  Explore Jobs <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        onClick={() => navigate("/all-jobs")}
        className="bg-blue-700 text-white font-normal text-base px-4 py-2 mt-10 rounded hover:bg-blue-800 transition"
      >
        Explore All Jobs
      </button>
    </section>
  );
};

export default ExperienceFilterPage;
