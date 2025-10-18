import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import {
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";

// Add these imports at the top of your file
import {
  Download,
  Calendar,
  MapPin,
  Users,
  User,
  FileText,
  Globe,
  Briefcase,
  BookOpen,
  Mail,
} from "lucide-react";
import BASE_URL from "../config";

const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch applications for recruiter jobs
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
      } else {
        toast.error("Failed to fetch applications!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while fetching applications!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle accept/reject action
  const handleApplicationAction = async (applicationId, action) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/jobs/applications/${applicationId}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: action } : app
          )
        );
        toast.success(`Application ${action}ed successfully`);
      } else {
        toast.error("Failed to perform action!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while performing action!");
    }
  };
  useEffect(() => {
    const closeDropdowns = (e) => {
      document
        .querySelectorAll(".hidden")
        .forEach((menu) => menu.classList.add("hidden"));
    };
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  const handleDownloadResume = (resumeUrl) => {
    if (!resumeUrl) {
      toast.error("No resume available");
      return;
    }

    // Extract filename for nicer download
    const fileName = resumeUrl.split("/").pop().split("?")[0]; // remove query params if any

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = resumeUrl; // public URL from Cloudinary
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success("Download started");
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // prevent page scroll
    } else {
      document.body.style.overflow = "unset"; // restore page scroll
    }

    // cleanup in case component unmounts while modal is open
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <div className="container  max-h-screen font-outfit mx-auto py-6">
      <Toaster position="top-right" reverseOrder={false} />

      {loading ? (
        <p className="text-center py-10">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          No applications available for your jobs.
        </p>
      ) : (
        <div className="">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Applications
          </h2>

          <table className="w-full bg-white max-h-screen  border border-[#e2e2e2] max-sm:text-sm">
            <thead>
              <tr className="border-b border-[#e2e2e2]">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left max-lg:hidden">Job Title</th>
                <th className="py-2 px-4 text-left max-lg:hidden">Location</th>
                <th className="py-2 px-4 text-left">Resume</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id} className="text-gray-700">
                  <td className="py-2 px-4 border-b border-[#e2e2e2] text-start">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-[#e2e2e2] text-start flex items-center">
                    <img
                      className="h-10 w-10 rounded-full mr-3 max-sm:hidden"
                      src={app.user.profileImage || "/default-avatar.png"}
                      alt={app.user.firstName}
                    />
                    <span className="text-sm">{app.user.firstName}</span>
                  </td>
                  <td className="py-2 text-sm px-4 border-b border-[#e2e2e2] text-start max-lg:hidden">
                    {app.job.title}
                  </td>
                  <td className="py-2 px-4 text-sm border-b border-[#e2e2e2] text-start max-lg:hidden">
                    {app.job.location}
                  </td>
                  <td className="py-2 px-4 text-sm text-start">
                    <button
                      onClick={() => handleDownloadResume(app.resume)}
                      className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                    >
                      Resume <Download size={16} color="#60A5FA" />
                    </button>
                  </td>
                  <div className="relative inline-block text-left">
                    <button
                      className="text-gray-600 text-xl px-2 hover:text-gray-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        const dropdown = e.currentTarget.nextSibling;
                        dropdown.classList.toggle("hidden");
                      }}
                    >
                      ...
                    </button>

                    <div className="hidden absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setIsModalOpen(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                      >
                        View Application
                      </button>
                      <button
                        onClick={() =>
                          handleApplicationAction(app._id, "accepted")
                        }
                        className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleApplicationAction(app._id, "rejected")
                        }
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-3 sm:px-4">
          <div className="bg-white w-full max-w-5xl rounded-lg shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg leading-none z-10"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto p-5 sm:p-8">
              {/* --- Header --- */}
              <div className="flex flex-col md:flex-row md:items-center items-start gap-6 border-b border-gray-200 pb-5 mb-5">
                <img
                  src={selectedApp.user.profileImage || "/default-avatar.png"}
                  alt={selectedApp.user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {`${selectedApp.user.firstName || ""} ${
                      selectedApp.user.lastName || ""
                    }`}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedApp.user.profession || "Website Designer (UI/UX)"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                      <Calendar size={14} color="#0867bc" />
                      <span>
                        {new Date(selectedApp.user.dob).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                      <Globe size={14} color="#0867bc" />
                      <span>{selectedApp.nationality || "Nigeria"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                      <Users size={14} color="#0867bc" />
                      <span>{selectedApp.maritalStatus || "Single"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                      <User size={14} color="#0867bc" />
                      <span>{selectedApp.user.gender || "Male"}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 sm:gap-3 mt-3 md:mt-0">
                  <a
                    href={`mailto:${selectedApp.user.email}`}
                    className="flex items-center gap-2 border border-blue-200 text-blue-600 px-3 py-2 rounded-md hover:bg-blue-50 text-xs sm:text-sm font-medium"
                  >
                    <Mail size={16} /> Mail
                  </a>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-xs sm:text-sm font-medium">
                    Hire
                  </button>
                </div>
              </div>

              {/* --- Body --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left side */}
                <div className="md:col-span-2 space-y-6">
                  <section>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 mb-2">
                      Biography
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedApp.user.bio ||
                        "I've been passionate about UI/UX design and web development for years. I create clean, user-friendly interfaces that help brands stand out."}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 mb-2">
                      Cover Letter
                    </h3>
                    <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 leading-relaxed">
                      {selectedApp.coverLetter ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedApp.coverLetter,
                          }}
                        />
                      ) : (
                        <p>No cover letter available.</p>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-medium tracking-wide text-gray-800 mb-2">
                      Resume
                    </h3>
                    {selectedApp.resume ? (
                      <a
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded inline-flex gap-2 items-center"
                        href={selectedApp.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume <Download size={16} color="#0867bc" />
                      </a>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No resume uploaded for this application.
                      </p>
                    )}
                  </section>
                </div>

                {/* Right sidebar */}
                <aside className="space-y-6">
                  <div className="bg-white border border-gray-300 rounded-lg p-4 text-sm">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <Briefcase
                          size={22}
                          color="#0867bc"
                          className="mx-auto"
                        />
                        <p className="text-gray-500 text-xs mt-1">Experience</p>
                        <p className="font-medium">
                          {selectedApp.user.experience || "3 Years"}
                        </p>
                      </div>
                      <div>
                        <BookOpen
                          size={22}
                          color="#0867bc"
                          className="mx-auto"
                        />
                        <p className="text-gray-500 text-xs mt-1">Education</p>
                        <p className="font-medium">
                          {selectedApp.user.education || "B.Sc. Degree"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <h4 className="font-medium text-sm text-gray-800 mb-2">
                      Contact Info
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Mail size={16} color="#0867bc" />
                        <span>{selectedApp.user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} color="#0867bc" />
                        <span>
                          {selectedApp.user.phone || "+234 802 000 1111"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} color="#0867bc" />
                        <span>
                          {selectedApp.user.location || "Lagos, Nigeria"}
                        </span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplication;
