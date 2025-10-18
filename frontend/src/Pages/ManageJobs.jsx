import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../config";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecruiterJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/jobs/recruiter`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data.success) setJobs(data.jobs);
      else toast.error("Failed to fetch jobs!");
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Server error while fetching jobs!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiterJobs();
  }, []);

  const handleVisibilityChange = async (jobId, currentVisibility) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/jobs/${jobId}/visibility`,
        { isVisible: !currentVisibility },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        setJobs((prev) =>
          prev.map((job) =>
            job._id === jobId ? { ...job, isVisible: data.job.isVisible } : job
          )
        );
        toast.success(
          `Job "${data.job.title}" is now ${
            data.job.isVisible ? "visible" : "hidden"
          }`
        );
      } else toast.error("Failed to update visibility!");
    } catch (err) {
      console.error("Error updating visibility:", err);
      toast.error("Server error while updating visibility!");
    }
  };

  return (
    <div className="container mx-auto p-4 w-full font-outfit">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Jobs</h1>
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-[#0867bc] text-white py-2 px-5 rounded-md hover:bg-blue-700 transition"
        >
          + Add Job
        </button>
      </div>

      {loading ? (
        <p className="text-center py-10 text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job, index) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {job.location} | Posted {moment(job.createdAt).fromNow()}
                </p>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    job.isVisible
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {job.isVisible ? "Visible" : "Hidden"}
                </span>

                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {job.applicantsCount} Applicants
                </span>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="toggle-checkbox scale-125"
                    checked={job.isVisible}
                    onChange={() =>
                      handleVisibilityChange(job._id, job.isVisible)
                    }
                  />
                  <span className="text-sm text-gray-600">Toggle</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
