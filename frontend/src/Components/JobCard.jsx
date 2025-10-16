import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../config";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${BASE_URL}/user/jobs/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const favorites = res.data || [];
        const isFav = favorites.some((fav) => fav._id === job._id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("❌ Error checking favorites:", error);
      }
    };
    checkFavorite();
  }, [job._id]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to save jobs.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/user/jobs/favorites/toggle`,
        { jobId: job._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsFavorite(res.data.favorite);
      if (res.data.favorite) {
        toast.success("Job added to favorites!");
      } else {
        toast("Job removed from favorites.", { icon: "💔" });
      }
    } catch (error) {
      console.error("❌ Error toggling favorite:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const companyLogo = job.recruiter?.company?.logo;

  return (
    <div
      className="relative border font-outfit border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg flex flex-col justify-between"
      onClick={() => {
        navigate(`/apply-job/${job._id}`);
        window.scrollTo(0, 0);
      }}
    >
      {/* Job Type Badge */}
      {job.jobType && (
        <span className="absolute top-4 left-0 bg-[#0867bc]/10 text-[#0867bc] font-normal text-[10px] px-1  rounded-r-full border border-[#0867bc]/20 uppercase">
          {job.jobType}
        </span>
      )}

      {/* Favorite icon */}
      <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-all"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Content */}
      <div>
        {/* Company */}
        <div className="flex justify-between items-center mt-6">
          <img
            className="h-8 rounded-full object-contain"
            src={companyLogo}
            alt="Company Logo"
          />
        </div>

        {/* Job Title */}
        <h4 className="font-semibold text-lg mt-3 text-gray-800 line-clamp-1">
          {job.title}
        </h4>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
          {job.location && (
            <span className="bg-blue-50 border border-blue-200 px-3 py-1.5 rounded text-blue-600">
              {job.location}
            </span>
          )}
          {job.level && (
            <span className="bg-red-50 border border-red-200 px-3 py-1.5 rounded text-red-600">
              {job.experience}
            </span>
          )}
          {job.category && (
            <span className="bg-green-50 border border-green-200 px-3 py-1.5 rounded text-green-600">
              {job.industry}
            </span>
          )}
        </div>

        {/* Description */}
        <p
          className="text-gray-500 mt-4 text-sm line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: job.description
              ? job.description.slice(0, 150)
              : "No description available.",
          }}
        />

        {/* Salary (Naira) */}
        <p className="mt-4 text-sm text-gray-700 font-medium">
          {job.minSalary && job.maxSalary ? (
            <>
              ₦{job.minSalary.toLocaleString()} - ₦
              {job.maxSalary.toLocaleString()}
            </>
          ) : job.salary ? (
            <>₦{job.salary.toLocaleString()}</>
          ) : (
            <>Salary not specified</>
          )}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center gap-3 text-sm">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
          }}
          className="bg-[#0867bc] hover:bg-[#075a9c] text-white font-medium rounded px-4 py-2 transition-all"
        >
          Apply Now
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
          }}
          className="text-gray-600 border border-gray-400 hover:bg-gray-100 px-4 py-2 rounded transition-all"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
