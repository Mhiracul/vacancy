import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";

import {
  Globe,
  UploadCloud,
  MoreVertical,
  Edit,
  Trash2,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Lock,
  Mail,
  Phone,
  Calendar,
  User,
  BookOpen,
  PlusCircle,
} from "lucide-react";
import { JobsContext } from "../context/jobContext";
import FineSelect from "../context/FineSelect";

const UserSettings = () => {
  const [userData, setUserData] = useState({});
  const [resumes, setResumes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { fetchUserProfile, setUser } = useContext(JobsContext);

  const token = localStorage.getItem("token");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview it instantly
    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/upload-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData(res.data.user);

      // Update localStorage so Dashboard sees the new image
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Profile picture updated!");
    } catch (err) {
      console.error("❌ Error uploading profile image:", err);
      toast.error("Failed to upload image");
    }
  };

  const handleDelete = async (resumeId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/auth/delete-resume/${resumeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success("Resume deleted successfully!");
        setResumes(res.data.resumes); // update UI
        await fetchUserProfile(); // refresh context
      } else {
        toast.error(res.data.message || "Failed to delete resume");
      }
    } catch (err) {
      console.error("❌ Error deleting resume:", err);
      toast.error("Error deleting resume");
    }
  };

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("📄 User settings fetched:", res.data);
        const user = res.data;
        setUserData(user);

        // Combine old and new resumes
        const combinedResumes = [
          ...(user.resumes || []),
          ...(user.resume ? [{ url: user.resume, name: "Resume.pdf" }] : []),
        ];
        setResumes(combinedResumes);
      } catch (err) {
        console.error("Error fetching settings:", err);
        toast.error("Failed to load settings");
      }
    };

    fetchUserSettings();
  }, []);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed!", { position: "top-right" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        // ✅ Update user context with new resumes
        setUser((prev) => ({
          ...prev,
          resumes: res.data.resumes,
        }));
        toast.success("✅ Resume uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        await fetchUserProfile();
      } else {
        toast.error(res.data.message || "Upload failed!", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("❌ Resume upload error:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong while uploading!",
        { position: "top-right", autoClose: 3000 }
      );
    }
  };

  const handleSaveChanges = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/settings",
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Settings updated successfully!");
      setUserData(res.data.user);
    } catch (error) {
      console.error("❌ Error saving settings:", error);
      toast.error("Failed to update settings");
    }
  };

  const handlePasswordChange = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { currentPassword, newPassword, confirmPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-xl md:px-6 py-5 px-3">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Setting</h2>

      {/* Tabs */}
      <div className="flex gap-4 md:gap-6 border-b border-gray-200 mb-6 text-sm font-medium">
        {[
          { key: "personal", label: "Personal" },
          { key: "profile", label: "Profile" },
          { key: "social", label: "Social Links" },
          { key: "account", label: "Account Setting" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 md:text-sm text-xs whitespace-nowrap ${
              activeTab === tab.key
                ? "text-[#0867bc]  border-b-2 border-[#0867bc]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PERSONAL TAB */}
      {activeTab === "personal" && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Basic Information
          </h3>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Profile Picture */}
            {/* Profile Picture */}
            <div
              className="col-span-2 lg:col-span-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer"
              onClick={() =>
                document.getElementById("profileImageInput").click()
              }
            >
              <img
                src={
                  selectedImage ||
                  userData.profileImage ||
                  "https://via.placeholder.com/150?text=Profile"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-3"
              />
              {!selectedImage && !userData.profileImage && (
                <UploadCloud className="w-10 h-10 text-gray-400 mb-3 absolute" />
              )}
              <p className="text-sm text-gray-600">
                Browse photo or drop here <br />
                <span className="text-xs text-gray-400">
                  Max size 5 MB (400px+)
                </span>
              </p>
              <input
                type="file"
                accept="image/*"
                id="profileImageInput"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Form */}
            <div className="col-span-2 lg:col-span-1 grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full name"
                value={`${userData.firstName || ""} ${userData.lastName || ""}`}
                readOnly
                className="border border-gray-300 rounded-lg placeholder:text-sm text-sm p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Title/headline"
                className="border border-gray-300 rounded-lg placeholder:text-sm text-sm p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <div className="col-span-2 relative">
                <Globe className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="url"
                  value={userData.website || ""}
                  placeholder="Website URL"
                  className="pl-10 border border-gray-300 placeholder:text-sm text-sm rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSaveChanges}
              className="px-5 py-3 bg-[#0867bc] text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>

          {/* Resume Section */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Your CV/Resume
            </h3>

            <div className="flex flex-wrap gap-5">
              {resumes.map((resume, index) => (
                <div
                  key={index}
                  className="relative bg-gray-50 border border-gray-200 rounded-xl p-4 w-56 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{resume.name}</p>
                      <p className="text-xs text-gray-500">{resume.size}</p>
                    </div>
                    <div className="relative group">
                      <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
                      <div className="absolute hidden group-hover:block top-3 right-0 bg-white border border-gray-200 rounded-md shadow z-10">
                        <ul className="text-sm text-gray-700">
                          <li
                            onClick={() =>
                              handleDelete(resume._id || resume.url)
                            }
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 w-56 flex flex-col justify-center items-center text-center text-gray-600 cursor-pointer hover:bg-gray-50 transition">
                <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                <span className="text-sm font-medium">Add CV/Resume</span>
                <span className="text-xs text-gray-400 mt-1">
                  Only PDF files
                </span>
                <input
                  type="file"
                  hidden
                  accept=".pdf"
                  onChange={handleResumeUpload}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === "profile" && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Profile Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 text-gray-400" />
              <input
                value={userData.dob ? userData.dob.split("T")[0] : ""}
                type="date"
                readOnly
                className="pl-10 border border-gray-300 placeholder:text-sm text-sm rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <select
              className="border border-gray-300 rounded-lg placeholder:text-sm text-sm p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={userData.gender || ""}
              readOnly
            >
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <FineSelect
              label="Education"
              value={userData.education || ""}
              onChange={(val) => setUserData({ ...userData, education: val })}
              placeholder="Select education level"
              options={[
                "High School / Secondary",
                "Diploma / OND",
                "Bachelor's Degree",
                "Master's Degree",
                "Doctorate / PhD",
                "Professional Certification",
                "Vocational Training",
                "Other",
              ]}
            />
            <FineSelect
              label="Experience"
              value={userData.experience || ""}
              onChange={(val) => setUserData({ ...userData, experience: val })}
              placeholder="Select years of experience"
              options={[
                "Less than 1 year",
                "1 - 2 years",
                "3 - 5 years",
                "6 - 10 years",
                "11 - 15 years",
                "Above 15 years",
              ]}
            />
            <textarea
              rows="4"
              placeholder="Write your biography..."
              className="col-span-2 border border-gray-300 placeholder:text-sm text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSaveChanges}
              className="px-5 py-3 bg-[#0867bc] text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* SOCIAL LINKS TAB */}
      {activeTab === "social" && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Social Links
          </h3>

          {/* Fixed Social Links (Default ones) */}
          <div className="space-y-4">
            {[
              {
                name: "Facebook",
                icon: (
                  <Facebook className="text-[#0867bc] fill-[#0867bc] w-5 h-5" />
                ),
              },
              {
                name: "Twitter",
                icon: (
                  <Twitter className="text-[#0867bc] fill-[#0867bc] w-5 h-5" />
                ),
              },
              {
                name: "Instagram",
                icon: <Instagram className="text-[#0867bc]  w-5 h-5" />,
              },
              {
                name: "YouTube",
                icon: <Youtube className="text-[#0867bc]  w-5 h-5" />,
              },
            ].map((platform, index) => (
              <div
                key={platform.name}
                className="flex items-center w-full md:gap-4 gap-2 border border-gray-200  px-4 bg-gray-50"
              >
                <div className="flex items-center gap-2 md:w-32 w-20">
                  {platform.icon}
                  <span className="font-medium md:text-base text-xs text-gray-700">
                    {platform.name}
                  </span>
                </div>
                <input
                  type="url"
                  value={
                    userData.socialLinks?.find(
                      (s) => s.platform === platform.name
                    )?.url || ""
                  }
                  onChange={(e) => {
                    const existing = userData.socialLinks || [];
                    const updated = existing.some(
                      (s) => s.platform === platform.name
                    )
                      ? existing.map((s) =>
                          s.platform === platform.name
                            ? { ...s, url: e.target.value }
                            : s
                        )
                      : [
                          ...existing,
                          { platform: platform.name, url: e.target.value },
                        ];
                    setUserData({ ...userData, socialLinks: updated });
                  }}
                  placeholder={`${platform.name} profile link...`}
                  className="flex-1 border-l border-gray-300 placeholder:text-sm  p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                  onClick={() => {
                    const updated = (userData.socialLinks || []).filter(
                      (s) => s.platform !== platform.name
                    );
                    setUserData({ ...userData, socialLinks: updated });
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-sm text-black text-sm transition"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Additional Social Links (User-added) */}
            {(userData.socialLinks || [])
              .filter(
                (s) =>
                  !["Facebook", "Twitter", "Instagram", "YouTube"].includes(
                    s.platform
                  )
              )
              .map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border border-gray-200  p-4 bg-gray-50"
                >
                  <select
                    value={link.platform || ""}
                    onChange={(e) => {
                      const updated = [...userData.socialLinks];
                      updated[index].platform = e.target.value;
                      setUserData({ ...userData, socialLinks: updated });
                    }}
                    className="border border-gray-300 placeholder:text-sm text-sm rounded-lg p-3 w-32 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Pinterest">Pinterest</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Other">Other</option>
                  </select>

                  <input
                    type="url"
                    value={link.url || ""}
                    onChange={(e) => {
                      const updated = [...userData.socialLinks];
                      updated[index].url = e.target.value;
                      setUserData({ ...userData, socialLinks: updated });
                    }}
                    placeholder="Profile link / URL..."
                    className="flex-1 border border-gray-300 rounded-lg placeholder:text-sm text-sm p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />

                  <button
                    onClick={() => {
                      const updated = userData.socialLinks.filter(
                        (_, i) => i !== index
                      );
                      setUserData({ ...userData, socialLinks: updated });
                    }}
                    className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-600 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}

            {/* Add New Social Link */}
            <button
              onClick={() =>
                setUserData({
                  ...userData,
                  socialLinks: [
                    ...(userData.socialLinks || []),
                    { platform: "", url: "" },
                  ],
                })
              }
              className="w-full py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <span className="text-lg">＋</span> Add New Social Link
            </button>
          </div>

          {/* Save Changes */}
          <div className="mt-6">
            <button
              onClick={handleSaveChanges}
              className="px-5 py-3 bg-[#0867bc] text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ACCOUNT SETTINGS TAB */}
      {activeTab === "account" && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Account Settings
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                value={userData.email || ""}
                placeholder="Email"
                readOnly
                className="pl-10 border placeholder:text-sm text-sm border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div className="relative">
              <PhoneInput
                readOnly
                country={"ng"}
                value={userData.phone || ""}
                onChange={(phone) => setUserData({ ...userData, phone })}
                inputStyle={{
                  width: "100%",
                  height: "3rem", // match your other inputs
                  borderRadius: "0.5rem", // match rounded-lg
                  border: "1px solid #D1D5DB", // gray-300
                  paddingLeft: "4rem", // leave space for flag
                  paddingRight: "0.75rem",
                  fontSize: "0.875rem", // text-sm
                  outline: "none",
                }}
                buttonStyle={{
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.5rem 0 0 0.5rem",
                  height: "3rem",
                }}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pl-10 border border-gray-300 placeholder:text-sm text-sm rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10 border border-gray-300 placeholder:text-sm text-sm rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div className="relative col-span-2">
              <Lock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 border border-gray-300 placeholder:text-sm text-sm rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="px-2 py-2 bg-[#0867bc] whitespace-nowrap md:text-base text-xs text-white rounded-md hover:bg-[#1870be]"
            >
              Change Password
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSaveChanges}
              className="px-5 py-3 bg-[#0867bc] text-white rounded-md hover:bg-[#1870be]"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
