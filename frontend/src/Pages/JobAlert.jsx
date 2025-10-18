import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import FineSelect from "../context/FineSelect";
import axios from "axios";
import BASE_URL from "../config";

const JobAlert = () => {
  const [formData, setFormData] = useState({
    jobRole: "",
    industry: "",
    location: "",
    experience: "",
    jobType: "",
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const jobTypes = ["Full Time", "Part Time", "Remote", "Contract"];
  const experiences = [
    "No Experience",
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Executive Level",
  ];
  const industries = [
    "Accounting, Auditing & Finance",
    "IT & Telecoms",
    "Education",
    "Banking, Insurance & Finance",
    "Construction",
    "Marketing & Communications",
    "Manufacturing & Production",
    "Healthcare & Pharmaceutical",
    "NGO & Charity",
    "Creative & Design",
  ];
  const jobRoles = [
    "Software Developer",
    "UI/UX Designer",
    "Graphic Designer",
    "Teacher",
    "Project Manager",
    "Accountant",
    "HR Officer",
    "Customer Service Rep",
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/job-alert/create`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        icon: "success",
        title: "Job Alert Saved!",
        text: "You’ll be notified when matching jobs are posted.",
        showConfirmButton: false,
        timer: 2000,
      });
      fetchMatchingJobs();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Create Alert",
        text: "Please check your input or try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMatchingJobs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/job-alert/matches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchMatchingJobs();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#0867bc]" size={32} />
      </div>
    );

  return (
    <div className="font-outfit mb-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Job Alert Preferences
          </h2>
          <p className="text-gray-500 text-sm">
            Set your preferences to get alerts for jobs that match your
            interests.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 space-y-6"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FineSelect
            label="Job Role"
            options={jobRoles}
            value={formData.jobRole}
            onChange={(val) => handleChange("jobRole", val)}
            placeholder="Select job role"
          />
          <FineSelect
            label="Industry"
            options={industries}
            value={formData.industry}
            onChange={(val) => handleChange("industry", val)}
            placeholder="Select industry"
          />
          <FineSelect
            label="Experience Level"
            options={experiences}
            value={formData.experience}
            onChange={(val) => handleChange("experience", val)}
            placeholder="Select experience"
          />
          <FineSelect
            label="Job Type"
            options={jobTypes}
            value={formData.jobType}
            onChange={(val) => handleChange("jobType", val)}
            placeholder="Select job type"
          />
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Enter preferred location"
              className="w-full px-4 py-2 border rounded-md border-gray-300 placeholder:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-[#0867bc] text-white font-medium rounded-lg shadow hover:bg-[#065a9b] transition"
          >
            Save Alert Preferences
          </button>
        </div>
      </form>

      {/* Matching Jobs Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Matching Jobs
        </h3>

        {jobs.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {job.title}
                </h4>
                <p className="text-gray-500 text-sm mb-2">
                  {job.industry} — {job.location}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {job.jobType} | {job.experience}
                </p>
                <button
                  onClick={() => (window.location.href = `/job/${job._id}`)}
                  className="text-[#0867bc] text-sm font-medium hover:underline"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-500">
            <p>
              No matching jobs found yet. Once jobs matching your preferences
              are posted, they’ll appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobAlert;
