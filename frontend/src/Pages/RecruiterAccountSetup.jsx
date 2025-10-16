import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Swal from "sweetalert2";
import Header from "../Components/Header";
import FineSelect from "../context/FineSelect";
import Logo from "../assets/Logoo.svg";
import BASE_URL from "../config";

const RecruiterAccountSetup = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    logo: null,
    banner: null,
    companyName: "",
    about: "",
    industryType: "",
    noOfEmployees: "",
    website: "",
    vision: "",
    facebook: "",
    instagram: "",
    youtube: "",
    phone: "",
    notificationEmail: "",
  });

  // === Update Progress Automatically ===
  useEffect(() => {
    const filledFields = Object.values(formData).filter(
      (val) => val && val !== ""
    ).length;
    const totalFields = Object.keys(formData).length;
    const percentage = Math.round((filledFields / totalFields) * 100);
    setProgress(percentage);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFinish = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    });

    try {
      const res = await fetch(`${BASE_URL}/recruiter/setup`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = "/account-setup/success";
      } else {
        Swal.fire("Error", data.message || "Something went wrong!", "error");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Swal.fire("Error", "Failed to save profile.", "error");
    }
  };

  const stepTitles = [
    "Company Info",
    "Founding Info",
    "Social Media Profile",
    "Contact",
  ];

  const industries = [
    "All",
    "Agriculture, Fishing & Forestry",
    "Construction",
    "Banking, Finance & Insurance",
    "Education",
    "Energy & Utilities",
    "Government",
    "Healthcare",
    "Hospitality & Hotel",
    "Recruitment",
    "IT & Telecoms",
    "Law & Compliance",
    "Shipping & Logistics",
    "Manufacturing & Warehousing",
    "Advertising, Media & Communications",
    "Mining, Energy & Metals",
    "NGO, NPO & Charity",
    "Retail, Fashion & FMCG",
    "Enforcement & Security",
    "Real Estate",
    "Tourism & Travel",
    "Automotive & Aviation",
    "Entertainment, Events & Sport",
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-8 2xl:px-20 flex flex-col items-center font-outfit">
        <div className=" flex w-full justify-between items-center">
          <div className="flex items-center gap-1">
            <img src={Logo} alt="" className=" h-10 cursor-pointer" />
            <h1 className="font-extrabold text-xl md:text-2xl text-[#0867bc]">
              Vacancy.NG
            </h1>
          </div>

          <div className=" text-sm text-gray-600">
            <p>Setup Progress</p>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#0867bc]">{progress}%</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0867bc] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {/* === Progress Bar at Top Right === */}

        <div className="w-full container mx-auto bg-white shadow-sm mt-10 rounded-lg p-8 relative">
          {/* === Step Tabs === */}
          <div className="flex justify-between items-center mb-8 border-b pb-2">
            {stepTitles.map((title, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 cursor-pointer ${
                  step === index + 1
                    ? "text-[#0867bc] font-semibold"
                    : "text-gray-400"
                }`}
                onClick={() => setStep(index + 1)}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center rounded-full text-xs border ${
                    step === index + 1
                      ? "bg-[#0867bc] text-white border-[#0867bc]"
                      : "border-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm">{title}</span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <form onSubmit={handleFinish}>
            {/* STEP 1: Company Info */}
            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Company Info
                </h2>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* Logo */}
                  <label className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition">
                    {formData.logo ? (
                      <img
                        src={URL.createObjectURL(formData.logo)}
                        alt="Logo"
                        className="h-20 object-contain"
                      />
                    ) : (
                      <>
                        <Upload className="text-gray-400 w-8 h-8 mb-2" />
                        <p className="text-gray-500 text-sm">
                          Browse logo or drop here
                        </p>
                        <span className="text-xs text-gray-400">
                          Max size 5MB
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "logo")}
                    />
                  </label>

                  {/* Banner */}
                  <label className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition">
                    {formData.banner ? (
                      <img
                        src={URL.createObjectURL(formData.banner)}
                        alt="Banner"
                        className="h-24 w-full object-cover rounded-md"
                      />
                    ) : (
                      <>
                        <Upload className="text-gray-400 w-8 h-8 mb-2" />
                        <p className="text-gray-500 text-sm">
                          Browse banner or drop here
                        </p>
                        <span className="text-xs text-gray-400 text-center">
                          1520×400 | JPEG/PNG | Max 5MB
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "banner")}
                    />
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    About Us
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none"
                    placeholder="Tell us about your company..."
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#0867bc] text-white px-6 py-2 rounded-md hover:bg-[#075a9c] transition"
                  >
                    Save & Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Founding Info */}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Industry & Company Info
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <FineSelect
                      label="Industry Type"
                      options={industries}
                      value={formData.industryType}
                      onChange={(val) =>
                        setFormData((prev) => ({ ...prev, industryType: val }))
                      }
                      placeholder="Select industry"
                    />
                  </div>

                  <div>
                    <FineSelect
                      label="Number of Employees"
                      options={["1-10", "11-50", "51-200", "201-500", "500+"]}
                      value={formData.noOfEmployees}
                      onChange={(val) =>
                        setFormData((prev) => ({ ...prev, noOfEmployees: val }))
                      }
                      placeholder="Select number of employees"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-1">
                    Company Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none"
                    placeholder="https://yourcompany.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Company Vision
                  </label>
                  <textarea
                    name="vision"
                    value={formData.vision}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#0867bc] text-white px-6 py-2 rounded-md hover:bg-[#075a9c]"
                  >
                    Save & Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Social Media */}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Social Media Profiles
                </h2>

                <div className="space-y-4">
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none"
                  />
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none"
                  />
                  <input
                    type="url"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    placeholder="YouTube URL"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#0867bc] text-white px-6 py-2 rounded-md hover:bg-[#075a9c]"
                  >
                    Save & Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Contact */}
            {step === 4 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Contact
                </h2>

                <div className="space-y-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none"
                  />
                  <input
                    type="email"
                    name="notificationEmail"
                    value={formData.notificationEmail}
                    onChange={handleChange}
                    placeholder="Notification Email Address"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    ← Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-[#0867bc] text-white px-6 py-2 rounded-md hover:bg-[#075a9c]"
                  >
                    Finish Editing
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <footer className="mt-10 text-gray-400 text-xs">
          © 2025 Jobpilot - Job Board. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default RecruiterAccountSetup;
