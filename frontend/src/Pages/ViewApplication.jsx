import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  MapPin,
  Briefcase,
  DollarSign,
  Download,
} from "lucide-react";
import BASE_URL from "../config";
import moment from "moment";

const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch recruiter applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/jobs/applications/recruiter`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setApplications(data.applications);
      } else toast.error("Failed to fetch applications!");
    } catch (err) {
      console.error(err);
      toast.error("Error fetching applications!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApplicationAction = async (id, action) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/jobs/applications/${id}`,
        { action },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (data.success) {
        setApplications((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status: action } : a))
        );
        toast.success(`Application ${action}ed`);
      }
    } catch (err) {
      toast.error("Error performing action");
    }
  };

  const handleDownloadResume = (resumeUrl) => {
    if (!resumeUrl) return toast.error("No resume found");
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = resumeUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success("Downloading resume...");
  };

  return (
    <div className="container mx-auto py-10 px-4 font-outfit">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Applicants</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-500">No job applications found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col sm:flex-row gap-4 items-center"
            >
              <img
                src={app.user.profileImage || "/default-avatar.png"}
                alt={app.user.firstName}
                className="w-20 h-20 rounded-full object-cover border"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {app.user.firstName} {app.user.lastName}
                </h3>
                <p className="text-blue-600 text-sm">
                  {app.user.profession || app.job.title}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-gray-500 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {app.job.location || "Nigeria"}
                  </span>
                  <span className="flex items-center gap-1">
                    ₦
                    {app.job.minSalary
                      ? `${Number(
                          app.job.minSalary
                        ).toLocaleString()} - ₦${Number(
                          app.job.maxSalary
                        ).toLocaleString()}`
                      : "Not specified"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start"></div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => {
                    setSelectedApp(app);
                    setShowModal(true);
                  }}
                  className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleApplicationAction(app._id, "accepted")}
                  className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100"
                >
                  <CheckCircle size={18} />
                </button>
                <button
                  onClick={() => handleApplicationAction(app._id, "rejected")}
                  className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                >
                  <XCircle size={18} />
                </button>
                <button className="p-2 bg-gray-50 text-gray-500 rounded hover:bg-gray-100">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-3 sm:px-4">
          <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {/* --- Your modal design stays same here --- */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedApp.user?.profileImage || "/default-avatar.png"}
                  alt="User"
                  className="w-20 h-20 rounded-full border object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedApp.user?.firstName} {selectedApp.user?.lastName}
                  </h2>
                  <p className="text-gray-500">
                    {selectedApp.user?.profession || selectedApp.job?.title}
                  </p>
                </div>
              </div>

              <h4 className="font-medium text-gray-800 mb-2">Cover Letter</h4>
              <div
                className="bg-gray-50 p-4 rounded text-sm text-gray-700 mb-6"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedApp.coverLetter || "No cover letter provided.",
                }}
              />

              {selectedApp.resume ? (
                <a
                  href={selectedApp.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md font-medium inline-block"
                >
                  Download Resume
                </a>
              ) : (
                <p className="text-gray-500">No resume uploaded</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplication;
