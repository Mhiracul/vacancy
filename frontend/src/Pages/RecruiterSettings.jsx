// src/pages/RecruiterSettings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  BookUser,
  MapPinHouse,
  ChartNetwork,
  Mail,
  User,
  FileText,
  Users, // add this
} from "lucide-react";

const RecruiterSettings = () => {
  const [recruiter, setRecruiter] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    companyName: "",
    industry: "",
    employees: "",
    website: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const storedRecruiter = localStorage.getItem("user");
    if (storedRecruiter) {
      const parsed = JSON.parse(storedRecruiter);
      setRecruiter(parsed);
      setFormData({
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        workEmail: parsed.email || "",
        position: parsed.position || "",
        companyName: parsed.company?.name || "",
        industry: parsed.company?.industry || "",
        employees: parsed.company?.employees || "",
        website: parsed.company?.website || "",
        phone: parsed.company?.phone || "",
        address: parsed.company?.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const payload = {
        position: formData.position,
        website: formData.website,
        phone: formData.phone,
        address: formData.address,
      };

      const res = await axios.put(
        "http://localhost:5000/api/recruiter/settings",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedRecruiter = { ...recruiter, ...res.data.recruiter };
      localStorage.setItem("user", JSON.stringify(updatedRecruiter));
      setRecruiter(updatedRecruiter);

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (!recruiter) return <p>Loading...</p>;

  return (
    <div className="p-6 w-full  mx-auto font-outfit">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Recruiter Profile
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 border p-3 rounded-md">
              <User size={20} color="#bebebe" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                readOnly
                className="w-full bg-gray-100 outline-none cursor-not-allowed text-sm"
              />
            </div>
            <div className="flex items-center gap-2 border p-3 rounded-md">
              <User size={20} color="#bebebe" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                readOnly
                className="w-full bg-gray-100 outline-none cursor-not-allowed text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 border p-3 rounded-md mt-4">
            <Mail size={20} color="#bebebe" />
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              readOnly
              className="w-full bg-gray-100 outline-none cursor-not-allowed text-sm"
            />
          </div>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 border p-3 rounded-md">
              <FileText size={20} color="#bebebe" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                readOnly
                className="w-full bg-gray-100 outline-none cursor-not-allowed text-sm"
              />
            </div>
            <div className="flex items-center gap-2 border p-3 rounded-md">
              <FileText size={20} color="#bebebe" />
              <input
                type="text"
                name="industry"
                value={formData.industry}
                readOnly
                className="w-full bg-gray-100 outline-none cursor-not-allowed text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 border p-3 rounded-md">
              <Users size={20} color="#bebebe" />
              <input
                type="text"
                name="employees"
                value={formData.employees}
                readOnly
                className="w-full bg-gray-100 outline-none cursor-not-allowed text-sm"
              />
            </div>
            <div className="flex items-center gap-2 border p-3 rounded-md">
              <ChartNetwork size={20} color="#bebebe" />
              <input
                type="url"
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 border p-3 rounded-md">
              <BookUser size={20} color="#bebebe" />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>
            <div className="flex items-center gap-2 border p-3 rounded-md">
              <BookUser size={20} color="#bebebe" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 border p-3 rounded-md mt-4">
            <MapPinHouse size={20} color="#bebebe" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#0867bc] text-white py-2 rounded-md text-sm font-medium mt-4 hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default RecruiterSettings;
