import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  MapPin,
  DollarSign,
  Clock,
  Bookmark,
  ChevronRight,
  Briefcase,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { JobsContext } from "../context/jobContext";
import Money from "../assets/money.svg";
import moment from "moment";
import BASE_URL from "../config";

const FavoriteJobs = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null); // for modal
  const [applying, setApplying] = useState(false);
  const { user, setShowUserLogin } = useContext(JobsContext);
  const [appliedJobs, setAppliedJobs] = useState({});

  // ✅ Fetch all favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view your saved jobs.");
          return;
        }

        const res = await axios.get(`${BASE_URL}/user/jobs/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFavorites(res.data || []);

        // ✅ After getting favorites, check apply status for each
        const statusPromises = res.data.map((job) =>
          axios
            .get(`http://localhost:5000/api/user/jobs/${job._id}/status`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((r) => ({ id: job._id, applied: r.data.applied }))
            .catch(() => ({ id: job._id, applied: false }))
        );

        const results = await Promise.all(statusPromises);
        const appliedStatusMap = {};
        results.forEach((r) => (appliedStatusMap[r.id] = r.applied));
        setAppliedJobs(appliedStatusMap);
      } catch (error) {
        console.error("Error fetching favorite jobs:", error);
        toast.error("Failed to load favorite jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  // ✅ Remove job from favorites
  const removeFavorite = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in first.");

    try {
      const res = await axios.post(
        `${BASE_URL}/user/jobs/favorites/toggle`,
        { jobId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.favorite === false) {
        setFavorites((prev) => prev.filter((job) => job._id !== jobId));
        toast("Job removed from favorites.", { icon: "💔" });
      } else {
        toast.success("Job added to favorites!");
      }
    } catch (error) {
      console.error("Error removing favorite job:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ✅ Apply Now (same logic as ApplyJob.jsx)
  const handleApply = async (jobId) => {
    const token = localStorage.getItem("token");

    if (!user) {
      toast.error("Please login to apply");
      setShowUserLogin(true);
      return;
    }

    if (user.role !== "user") {
      toast.error("Only users can apply for jobs");
      return;
    }

    try {
      setApplying(true);
      const res = await axios.post(
        `${BASE_URL}/user/jobs/${jobId}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Applied successfully!");
        setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
        setSelectedJob(null);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("❌ Apply job error:", err);
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.status === 400
          ? "You already applied for this job"
          : "Failed to apply");
      toast.error(errorMessage);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="w-full md:p-6 p-1 font-outfit">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Favorite Jobs{" "}
          <span className="text-gray-400 font-medium text-lg">
            ({favorites.length})
          </span>
        </h1>
      </div>

      {/* Job List */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            Loading favorite jobs...
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            You haven’t saved any jobs yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {favorites.map((job) => (
              <li
                key={job._id}
                className="flex justify-between items-center p-5 hover:bg-gray-50 transition"
              >
                {/* Job Info */}
                <div className="flex items-start gap-4 w-full">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <img
                      src={
                        job.recruiter?.company?.logo ||
                        "https://via.placeholder.com/80x80?text=Logo"
                      }
                      alt={job.title}
                      className="w-8 h-8 rounded-full object-contain"
                    />
                  </div>

                  <div className="w-full">
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                      {job.title}
                    </h4>

                    <div className="flex flex-wrap gap-2 mt-2 text-gray-500 text-xs sm:text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{" "}
                        {job.location || "Unknown"}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />{" "}
                        {job.salary || "$40k–$60k"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 4 Days Remaining
                      </span>
                    </div>

                    {/* ✅ Mobile: Show buttons below */}
                    <div className="flex items-center gap-3 mt-3 ">
                      <button
                        title="Remove from favorites"
                        onClick={() => removeFavorite(job._id)}
                        className="text-gray-200 hover:text-[#000] hidden transition"
                      >
                        <Bookmark size={24} className="fill-[#000]" />
                      </button>

                      {job.expired ? (
                        <span className="bg-gray-100 sm:hidden text-gray-400 px-3 py-1.5 text-xs font-medium rounded-md">
                          Deadline Expired
                        </span>
                      ) : appliedJobs[job._id] ? (
                        <span className="bg-gray-100 sm:hidden  text-gray-400 px-3 py-1.5 text-xs font-medium border border-gray-400">
                          ✅ Already Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="flex items-center gap-1 sm:hidden  bg-[#0867bc] hover:bg-[#075a9c] text-white text-xs px-4 py-2 rounded-md transition whitespace-nowrap"
                        >
                          Apply Now <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* ✅ Desktop buttons (hidden on mobile) */}
                <div className="flex items-center gap-3 ">
                  <button
                    title="Remove from favorites"
                    onClick={() => removeFavorite(job._id)}
                    className="text-gray-200  hover:text-[#000] transition"
                  >
                    <Bookmark size={28} className="fill-[#000]" />
                  </button>

                  {job.expired ? (
                    <span className="bg-gray-100 max-sm:hidden whitespace-nowrap text-gray-400 px-3 py-1.5 text-xs font-medium rounded-md">
                      Deadline Expired
                    </span>
                  ) : appliedJobs[job._id] ? (
                    <span className="bg-gray-100 max-sm:hidden whitespace-nowrap text-gray-400 px-3 py-1.5 text-xs font-medium border border-gray-400">
                      ✅ Already Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex items-center gap-1  max-sm:hidden bg-[#0867bc] hover:bg-[#075a9c] text-white md:text-sm text-xs px-4 py-2 rounded-md transition whitespace-nowrap"
                    >
                      Apply Now{" "}
                      <ChevronRight className="md:w-4 md:h-4 w-2 h-2" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ===== Apply Modal ===== */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedJob(null)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Job Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6 border-b pb-4">
              <img
                src={selectedJob.companyId?.image || "/company-default.png"}
                alt={selectedJob.title}
                className="w-20 h-20 rounded-lg border"
              />
              <div className="text-center md:text-left">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedJob.title}
                </h2>
                <p className="text-gray-500 mt-1 flex items-center justify-center md:justify-start gap-2">
                  <Briefcase className="w-4 h-4" />
                  {selectedJob.companyId?.name || "Company Name"}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="w-4 h-4" /> {selectedJob.location}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2 justify-center md:justify-start">
                  <img src={Money} alt="" className="w-4 h-4" />{" "}
                  {selectedJob.salary}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Posted {moment(selectedJob.createdAt).fromNow()}
                </p>
              </div>
            </div>

            {/* Description */}
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Job Description
            </h3>
            <div
              className="text-gray-600 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: selectedJob.description || "No description available.",
              }}
            ></div>

            {/* Apply Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleApply(selectedJob._id)}
                disabled={applying}
                className="bg-[#0867bc] hover:bg-[#075a9c] text-white px-6 py-2 rounded-md font-medium transition disabled:opacity-50"
              >
                {applying ? "Applying..." : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteJobs;
