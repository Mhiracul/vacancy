import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, MapPin, DollarSign } from "lucide-react";
import BASE_URL from "../config";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}//user/jobs/applied`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppliedJobs(res.data || []);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div className="w-full md:p-6 p-2 font-outfit">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Applied Jobs{" "}
          <span className="text-gray-400 text-lg">({appliedJobs.length})</span>
        </h1>
      </div>

      {/* Job Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Jobs
              </th>
              <th className="px-6 max-sm:hidden py-3 text-sm font-medium text-gray-600">
                Date Applied
              </th>
              <th className="px-6 max-sm:hidden py-3 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 max-sm:hidden py-3 text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-400 text-sm"
                >
                  Loading applied jobs...
                </td>
              </tr>
            ) : appliedJobs.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-400 text-sm"
                >
                  You haven’t applied for any jobs yet.
                </td>
              </tr>
            ) : (
              appliedJobs.map((applied, i) => {
                const job = applied.job || {};
                const recruiter = job.recruiter || {};
                const company = recruiter.company || {};

                return (
                  <tr
                    key={i}
                    className="border-b w-full border-gray-100 hover:bg-gray-50 transition"
                  >
                    {/* Job info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 max-sm:hidden h-10 rounded-lg flex items-center justify-center bg-gray-100">
                          <img
                            src={
                              company.logo ||
                              "https://via.placeholder.com/80x80?text=Logo"
                            }
                            alt={company.name || "Company Logo"}
                            className="w-8 h-8 object-contain rounded"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {job.title || "Untitled Job"}
                          </h4>
                          <div className="flex items-center gap-2 text-gray-500 whitespace-nowrap md:text-sm text-xs mt-1">
                            <MapPin className="w-3 h-3" />
                            {job.location || "N/A"}
                            <span>•</span>
                            <DollarSign className="w-3 h-3" /> ₦
                            {job.minSalary
                              ? `${job.minSalary.toLocaleString()} - ₦${job.maxSalary?.toLocaleString()}`
                              : job.salary || "N/A"}
                          </div>

                          {/* On small screens, show status + action below */}
                          <div className="flex flex-col gap-2 mt-3 sm:hidden">
                            <div className="flex items-center gap-1 text-green-600 text-sm">
                              <Check className="w-4 h-4" /> Active
                            </div>
                            <button className="text-[#0867bc] bg-gray-100 p-2 px-6 hover:bg-gray-200  font-medium text-sm w-fit">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Date Applied (hidden on small) */}
                    <td className="px-6 max-sm:hidden py-4 text-gray-600 text-sm">
                      {new Date(applied.appliedAt).toLocaleDateString()}
                    </td>

                    {/* Status (hidden on small) */}
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 items-center gap-1 max-sm:hidden">
                      <Check className="w-4 h-4 inline" /> Active
                    </td>

                    {/* Action (hidden on small) */}
                    <td className="px-6 py-4 max-sm:hidden">
                      <button className="text-[#0867bc] whitespace-nowrap bg-gray-50 p-2.5 px-8 hover:bg-gray-100 rounded-md font-medium text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
          &lt;
        </button>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`px-3 py-1 rounded-md border ${
              num === 1
                ? "bg-[#0867bc] text-white border-[#0867bc]"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}
        <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default AppliedJobs;
