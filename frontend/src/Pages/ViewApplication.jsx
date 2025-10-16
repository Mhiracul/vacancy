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
        "http://localhost:5000/api/jobs/applications/recruiter",
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
        `http://localhost:5000/api/jobs/applications/${applicationId}`,
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
                      alt={app.user.name}
                    />
                    <span className="md:text-sm text-xs">{app.user.name}</span>
                  </td>
                  <td className="py-2 text-sm px-4 border-b border-[#e2e2e2] text-start max-lg:hidden">
                    {app.job.title}
                  </td>
                  <td className="py-2 px-4 text-sm border-b border-[#e2e2e2] text-start max-lg:hidden">
                    {app.job.location}
                  </td>
                  <td className="py-2 px-4 text-sm border-b border-[#e2e2e2] text-start">
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
        <div className="fixed inset-0 bg-black/80  flex items-center justify-center z-50 px-4">
          <div className="bg-white  w-full max-w-6xl shadow-2xl relative overflow-hidden max-h-full">
            {/* close */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg leading-none"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            {/* --- Header --- */}
            <div className="flex items-center gap-6 border-b border-gray-300 px-8 py-6">
              <img
                src={selectedApp.user.profileImage || "/default-avatar.png"}
                alt={selectedApp.user.name}
                className="w-20 h-20 rounded-full object-cover "
              />

              <div className="flex-1">
                <h2 className="text-2xl font-medium text-gray-800">
                  {`${selectedApp.user.firstName || ""} ${
                    selectedApp.user.lastName || ""
                  }`}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedApp.user.profession || "Website Designer (UI/UX)"}
                </p>

                {/* small info cards row */}
                <div className="mt-3 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
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

                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                    <Globe size={14} color="#0867bc" />
                    <span>{selectedApp.nationality || "Bangladesh"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                    <Users size={14} color="#0867bc" />
                    <span>{selectedApp.maritalStatus || "Single"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                    <User size={14} color="#0867bc" />
                    <span>{selectedApp.user.gender || "Male"}</span>
                  </div>
                </div>
              </div>

              {/* action buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${selectedApp.user.email}`}
                  className="flex items-center gap-2 border border-blue-200 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 text-sm font-medium"
                >
                  <Mail size={16} /> Send Mail
                </a>

                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                  Hire Candidate
                </button>
              </div>
            </div>

            {/* --- Body --- */}
            <div className="grid grid-cols-3 gap-8 px-8 py-6">
              {/* Left (content) - spans 2 columns */}
              <div className="col-span-2 overflow-y-auto max-h-full pr-4">
                {/* Biography */}
                <section className="mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 mb-3">
                    Biography
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedApp.user.bio ||
                      "I've been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces. I can create high-quality and aesthetically pleasing designs in a quick turnaround time..."}
                  </p>
                </section>

                {/* Cover Letter */}
                <section className="mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 mb-3">
                    Cover Letter
                  </h3>
                  <div className="bg-gray-50  rounded p-4 text-sm text-gray-700 leading-relaxed">
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

                {/* Resume quick link */}
                {/* Resume quick link */}
                <section className="mb-6">
                  <h3 className="text-sm font-medium capitalize tracking-wide text-gray-800 mb-3">
                    Resume (Applied)
                  </h3>
                  {selectedApp.resume ? (
                    <a
                      className="bg-blue-50 text-black px-3 text-sm py-1 rounded inline-flex gap-2 items-center"
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
                {/* small stats grid (Experience + Education) */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col items-center gap-3">
                        <Briefcase size={24} color="#0867bc" />

                        <div className="text-center">
                          <div className="text-xs text-gray-500">
                            Experience
                          </div>
                          <div className="font-medium text-gray-800 text-sm">
                            {selectedApp.user.experience
                              ? `${selectedApp.user.experience} Years`
                              : "7 Years"}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <BookOpen size={24} color="#0867bc" />

                        <div className="text-center">
                          <div className="text-xs text-gray-500">
                            Educations
                          </div>
                          <div className="font-medium text-gray-800 text-sm">
                            {selectedApp.user.education || "Master Degree"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download My Resume card */}
                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <h4 className="font-medium text-sm text-gray-800 mb-3 capitalize">
                      Download My Resume
                    </h4>

                    {selectedApp.resume ? (
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <FileText
                            strokeWidth={0.8}
                            size={44}
                            color="#d1d5dc"
                          />
                          <div className="text-sm">
                            <div className="font-medium text-gray-800">
                              {selectedApp.resumeName || "Resume.pdf"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {selectedApp.resumeSize || "Unknown Size"}
                            </div>
                          </div>
                        </div>

                        <a
                          href={selectedApp.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100"
                        >
                          <Download size={18} />
                        </a>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No resume attached to this application.
                      </p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white border-gray-300 border rounded-lg p-4">
                    <h4 className="font-medium text-sm text-gray-800 mb-3 capitalize">
                      Contact Information
                    </h4>
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="flex items-start gap-3">
                        <Globe size={20} className="mt-1" color="#0867bc" />
                        <div>
                          <div className="text-xs text-gray-500">Website</div>
                          <div className="font-medium text-gray-800">
                            {selectedApp.user.website || "www.estherhoward.com"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin size={20} className="mt-1" color="#0867bc" />
                        <div>
                          <div className="text-xs text-gray-500">Location</div>
                          <div className="font-medium text-gray-800 text-sm">
                            {selectedApp.user.location ||
                              "Beverly Hills, California 90202"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User size={20} className="mt-1" color="#0867bc" />
                        <div>
                          <div className="text-xs text-gray-500">Phone</div>
                          <div className="font-medium text-gray-800">
                            {selectedApp.user.phone || "+1-202-555-0141"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail size={20} className="mt-1" color="#0867bc" />
                        <div>
                          <div className="text-xs text-gray-500">Email</div>
                          <div className="font-medium text-gray-800 text-sm">
                            {selectedApp.user.email ||
                              "esther.howard@gmail.com"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social icons */}
                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-gray-800 mb-3 uppercase">
                      Follow me Social Media
                    </h4>
                    <div className="flex items-center gap-3">
                      {[
                        { name: "facebook", icon: <BsFacebook /> },
                        { name: "twitter", icon: <BsTwitter /> },
                        { name: "linkedin", icon: <BsLinkedin /> },
                        { name: "instagram", icon: <BsInstagram /> },
                        { name: "youtube", icon: <BsYoutube /> },
                      ].map((s) => (
                        <button
                          key={s.name}
                          className="w-9 h-9 flex items-center justify-center rounded bg-blue-50   hover:bg-blue-100 text-[#0867bc]"
                          aria-label={s.name}
                        >
                          {s.icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplication;
