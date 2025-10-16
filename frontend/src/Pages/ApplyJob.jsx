import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobsContext } from "../context/jobContext";
import Loading from "../Components/Loading";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { MapPin, Briefcase, UserRound, X, Send } from "lucide-react";
import kConvert from "k-convert";
import moment from "moment";
import Money from "../assets/money.svg";
import JobCard from "../Components/JobCard";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import FineSelect from "../context/FineSelect";

const ApplyJob = () => {
  const { id } = useParams();
  const { jobs, user, setShowUserLogin } = useContext(JobsContext);
  const [jobData, setJobData] = useState(null);
  const [applying, setApplying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState("");

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  useEffect(() => {
    if (jobs && jobs.length > 0 && id) {
      const data = jobs.find((job) => job._id === id);
      if (data) setJobData(data);
    }
  }, [id, jobs]);

  const handleOpenModal = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to apply for this job.",
      });
      setShowUserLogin(true);
      return;
    }

    if (user.role !== "user") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Only job seekers can apply for jobs.",
      });
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/status/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      // Use the values from your backend
      const { hasPaid, paymentStatus } = res.data;

      if (!hasPaid || paymentStatus !== "paid") {
        Swal.fire({
          icon: "info",
          title: "Payment Required",
          text: "Please pay ₦1,500 to access job applications.",
          confirmButtonText: "Pay Now",
          confirmButtonColor: "#0867bc",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/dashboard/user-payment";
          }
        });
        return;
      }

      // If paid, allow the modal to open
      setShowModal(true);
    } catch (err) {
      console.error("Error checking user payment:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to verify payment status. Please try again.",
      });
    }
  };

  const handleSubmitApplication = async () => {
    if (!selectedResume) {
      Swal.fire({
        icon: "warning",
        title: "Missing Resume",
        text: "Please choose a resume before applying.",
      });
      return;
    }

    const token = localStorage.getItem("token");
    try {
      setApplying(true);
      const res = await axios.post(
        `http://localhost:5000/api/user/jobs/${id}/apply`,
        {
          resume: selectedResume, // still the URL
          resumeId: selectedResumeId, // 👈 new field for Cloudinary public_id
          coverLetter,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your job application has been successfully submitted.",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          setShowModal(false);
          setCoverLetter("");
          setSelectedResume("");
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.data.message || "Something went wrong while applying.",
        });
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        (err.response?.status === 400
          ? "You already applied for this job."
          : "Failed to apply. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: msg,
      });
    } finally {
      setApplying(false);
    }
  };

  if (!jobData) return <Loading />;

  const salary =
    jobData.minSalary && jobData.maxSalary
      ? `₦${jobData.minSalary.toLocaleString()} - ₦${jobData.maxSalary.toLocaleString()}`
      : jobData.salary
      ? `₦${jobData.salary.toLocaleString()}`
      : "Salary not specified";

  return (
    <>
      <Header />
      <div className="container min-h-screen font-outfit mx-auto py-10 px-4 2xl:px-20">
        <div className="bg-white text-black w-full rounded">
          {/* Job Header */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-10 py-16 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={
                  jobData.recruiter.company.logo ||
                  "https://via.placeholder.com/150x100?text=Company+Logo"
                }
                alt={jobData.recruiter.company.name || "Company Logo"}
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200"
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-3xl font-semibold">{jobData.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <Briefcase size={18} /> {jobData.recruiter.company.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={18} /> {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserRound size={18} /> {jobData.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={Money} alt="" className="w-4" />
                    {salary}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-sm text-end max-md:text-center">
              <button
                className="bg-blue-600 px-8 py-3 text-white rounded font-medium hover:bg-blue-700 transition"
                onClick={handleOpenModal}
                disabled={applying}
              >
                Apply Now
              </button>
              <p className="mt-2 text-gray-600">
                Posted {moment(jobData.createdAt).fromNow()}
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="lg:w-2/3 w-full">
              <h2 className="font-bold text-2xl mb-4">Job Description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              />
              <button
                className="bg-blue-600 px-8 py-3 text-white rounded font-medium mt-10 hover:bg-blue-700 transition"
                onClick={handleOpenModal}
              >
                Apply Now
              </button>
            </div>

            {/* More Jobs */}
            <div className="w-full lg:w-1/3 mt-10 lg:mt-0 lg:ml-8">
              <h2 className="text-xl font-semibold mb-3">
                More jobs from {jobData.recruiter.company.name}
              </h2>
              {jobs
                .filter(
                  (job) =>
                    job._id !== jobData._id &&
                    job.recruiter.company._id === jobData.recruiter.company._id
                )
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed font-outfit inset-0 flex justify-center items-center backdrop-blur-sm bg-black/50 z-50">
          <div className="bg-white w-full max-w-xl rounded shadow-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Apply Job: <span className="text-[#0867bc]">{jobData.title}</span>
            </h2>

            {/* Resume dropdown */}
            <div className="mb-4">
              <FineSelect
                label="Choose Resume"
                value={
                  selectedResume
                    ? JSON.stringify({
                        url: selectedResume,
                        public_id: selectedResumeId,
                      })
                    : ""
                }
                onChange={(value) => {
                  // Parse the selected value which contains both url and public_id
                  const selected = JSON.parse(value);
                  setSelectedResume(selected.url);
                  setSelectedResumeId(selected.public_id);
                }}
                placeholder="Select your resume"
                options={
                  user?.resumes?.length > 0
                    ? user.resumes.map((resume) => ({
                        label: `${resume.name} (${resume.size})`,
                        value: JSON.stringify({
                          url: resume.url,
                          public_id: resume.public_id,
                        }),
                      }))
                    : []
                }
              />
            </div>

            {/* Cover Letter */}
            <div className="mb-4">
              <label className="text-gray-700 font-medium block mb-2">
                Cover Letter
              </label>
              <ReactQuill
                theme="snow"
                value={coverLetter}
                onChange={setCoverLetter}
                placeholder="Write your cover letter here..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-10">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                disabled={applying}
                className="px-6 py-2.5 bg-blue-600 text-white font-normal rounded-sm flex items-center gap-2 hover:bg-blue-700 transition"
              >
                {applying ? (
                  "Applying..."
                ) : (
                  <>
                    Apply Now <Send size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ApplyJob;
