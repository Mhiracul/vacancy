import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import FineSelect from "../context/FineSelect";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [industry, setIndustry] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  const jobTypes = [
    "Full Time",
    "Part Time",
    "Internship & Graduate",
    "Contract",
  ];
  const experiences = [
    "No Experience",
    "Internship & Graduate",
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Executive Level",
  ];
  const industries = [
    "Accounting, Auditing & Finance",
    "Admin & Office",
    "Advertising, Media & Communications",
    "Agriculture, Fishing & Forestry",
    "Banking, Insurance & Financial Services",
    "Building & Architecture",
    "Community & Social Services",
    "Consulting & Strategy",
    "Creative & Design",
    "Customer Service & Support",
    "Education & Training",
    "Engineering & Technology",
    "Estate Agents & Property Management",
    "Farming & Agriculture",
    "Food Services & Catering",
    "Health & Safety",
    "Healthcare & Pharmaceutical",
    "Hospitality & Leisure",
    "Human Resources",
    "Legal Services",
    "Logistics & Transportation",
    "Manufacturing & Production",
    "Marketing & Communications",
    "Mining, Energy & Metals",
    "NGO, NPO & Charity",
    "Oil & Gas",
    "Product & Project Management",
    "Public Sector & Government",
    "Quality Control & Assurance",
    "Real Estate & Property",
    "Research, Teaching & Training",
    "Retail, Fashion & FMCG",
    "Sales",
    "Science & Technology",
    "Security & Defence",
    "Supply Chain & Procurement",
    "Telecommunications",
    "Trades & Services",
    "Travel, Tourism & Aviation",
  ];

  const jobRoles = [
    // 💼 Accounting, Auditing & Finance
    "Accountant",
    "Auditor",
    "Finance Manager",
    "Financial Analyst",
    "Payroll Officer",
    "Bookkeeper",
    "Treasury Officer",

    // 🏢 Admin & Office
    "Administrative Assistant",
    "Office Manager",
    "Executive Assistant",
    "Secretary",
    "Receptionist",

    // 🎨 Creative & Design
    "Graphic Designer",
    "UI/UX Designer",
    "Animator",
    "Video Editor",
    "Creative Director",
    "Content Creator",

    // 🧱 Building & Architecture
    "Architect",
    "Civil Engineer",
    "Quantity Surveyor",
    "Construction Manager",
    "Site Engineer",
    "Structural Engineer",

    // 💡 Consulting & Strategy
    "Business Analyst",
    "Management Consultant",
    "Strategy Associate",
    "Project Consultant",

    // ☎️ Customer Service & Support
    "Customer Support Representative",
    "Call Center Agent",
    "Client Relationship Officer",
    "Technical Support Specialist",

    // ⚙️ Engineering & Technology
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "QA Engineer",
    "Systems Engineer",
    "Network Administrator",
    "IT Support Specialist",

    // 🌾 Farming & Agriculture
    "Agricultural Officer",
    "Farm Manager",
    "Veterinary Technician",
    "Crop Production Specialist",

    // 🍽️ Food Services & Catering
    "Chef",
    "Cook",
    "Waiter/Waitress",
    "Caterer",
    "Baker",
    "Restaurant Manager",

    // 🏨 Hospitality & Leisure
    "Hotel Manager",
    "Housekeeper",
    "Front Desk Officer",
    "Tour Guide",
    "Event Planner",

    // ⚖️ Legal Services
    "Lawyer",
    "Legal Assistant",
    "Compliance Officer",
    "Paralegal",

    // 📢 Marketing & Communications
    "Marketing Executive",
    "Social Media Manager",
    "Content Strategist",
    "Public Relations Officer",
    "Copywriter",
    "SEO Specialist",

    // 💊 Medical & Pharmaceutical
    "Doctor",
    "Nurse",
    "Pharmacist",
    "Medical Laboratory Scientist",
    "Healthcare Assistant",
    "Physiotherapist",

    // 📦 Product & Project Management
    "Product Manager",
    "Project Manager",
    "Scrum Master",
    "Program Coordinator",

    // 🏠 Estate Agents & Property Management
    "Real Estate Agent",
    "Property Manager",
    "Facility Manager",
    "Surveyor",

    // ✅ Quality Control & Assurance
    "Quality Assurance Officer",
    "Quality Control Inspector",
    "Production Supervisor",

    // 👥 Human Resources
    "HR Officer",
    "HR Manager",
    "Recruiter",
    "Training Coordinator",

    // 🧑‍💼 Management & Business Development
    "Business Development Executive",
    "Operations Manager",
    "General Manager",
    "CEO/Managing Director",

    // 🤝 Community & Social Services
    "Social Worker",
    "NGO Program Officer",
    "Community Development Officer",
    "Counselor",

    // 💰 Sales
    "Sales Representative",
    "Sales Manager",
    "Business Sales Executive",
    "Retail Sales Associate",

    // 🚚 Supply Chain & Procurement
    "Procurement Officer",
    "Logistics Coordinator",
    "Inventory Manager",
    "Warehouse Supervisor",

    // 🎓 Research, Teaching & Training
    "Teacher",
    "Lecturer",
    "Trainer",
    "Research Assistant",
    "Education Consultant",

    // 🔧 Trades & Services
    "Electrician",
    "Plumber",
    "Mechanic",
    "Carpenter",
    "Welder",
    "Technician",

    // 🚗 Driver & Transport Services
    "Driver",
    "Dispatcher",
    "Truck Driver",
    "Delivery Rider",

    // 🩺 Health & Safety
    "Safety Officer",
    "HSE Manager",
    "Environmental Health Officer",
  ];
  const salaryTypes = ["Monthly", "Yearly", "Hourly", "Negotiable"];

  // 🧠 Check recruiter payment
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData || userData.role !== "recruiter") {
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5000/api/payment/recruiter/status/${userData._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();

        if (data.paymentStatus === "paid") {
          setIsPaid(true);
          userData.company.paymentStatus = "paid";
          localStorage.setItem("user", JSON.stringify(userData));
        } else setIsPaid(false);
      } catch (err) {
        console.error("Payment status error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, []);

  // 🧾 Handle job submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);

    const jobData = {
      title,
      minSalary,
      maxSalary,
      salaryType,
      jobType,
      experience,
      industry,
      expirationDate,
      jobRole,
      location,
      description,
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/jobs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: "Job Posted!",
          text: "Your job has been posted successfully.",
          showConfirmButton: false,
          timer: 2000,
        });

        // Reset form
        setTitle("");
        setMinSalary("");
        setMaxSalary("");
        setSalaryType("Monthly");
        setJobType("");
        setExperience("");
        setIndustry("");
        setExpirationDate("");
        setJobRole("");
        setLocation("Nigeria");
        setDescription("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Post Job",
          text: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to the server. Please try again later.",
      });
    } finally {
      setPosting(false);
    }
  };

  // Loader
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );

  if (!isPaid)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center font-outfit px-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 max-w-md">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Complete Payment to Post Jobs
          </h2>
          <p className="text-gray-500 mb-6">
            You need to activate your recruiter access before posting jobs. Pay
            a one-time fee of <span className="font-semibold">₦3,000</span>.
          </p>
          <button
            onClick={() => (window.location.href = "/dashboard/payment")}
            className="bg-[#0867bc] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#065a9b] transition"
          >
            Pay ₦3,000 Now
          </button>
        </div>
      </div>
    );

  if (posting)
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-white/80">
        <Loader2 className="animate-spin text-[#0867bc]" size={40} />
      </div>
    );

  // ✅ Main Form Layout
  return (
    <div className="font-outfit">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Post a Job</h2>
          <p className="text-gray-500 text-sm">
            Fill out the form below to add a new job listing.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 space-y-6"
      >
        {/* Job Title */}
        <div>
          <label className="text-gray-700 font-medium mb-2 block">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Add job title, role, vacancies etc"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Job Role & Industry */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FineSelect
            label="Job Role"
            options={jobRoles}
            value={jobRole}
            onChange={setJobRole}
            placeholder="Select job role"
          />
          <FineSelect
            label="Job Type"
            options={jobTypes}
            value={jobType}
            onChange={setJobType}
            placeholder="Select job type"
          />
          <FineSelect
            label="Experience"
            options={experiences}
            value={experience}
            onChange={setExperience}
            placeholder="Select experience level"
          />
          <FineSelect
            label="Industry"
            options={industries}
            value={industry}
            onChange={setIndustry}
            placeholder="Select industry"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="text-gray-700 font-medium mb-2 block">
            Salary (₦)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Minimum salary..."
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              placeholder="Maximum salary..."
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-gray-300 placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <FineSelect
              options={salaryTypes}
              value={salaryType}
              onChange={setSalaryType}
              placeholder="Select salary type"
            />
          </div>
        </div>

        {/* Location + Expiration */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="text-gray-700 font-medium mb-2 block">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter job location"
              className="w-full px-4 py-2 border rounded-md placeholder:text-gray-400 placeholder:text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium mb-2 block">
              Expiration Date
            </label>
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              onFocus={(e) =>
                e.target.showPicker ? e.target.showPicker() : null
              } // optional: auto-open picker
              placeholder="Select expiration date"
              className={`w-full px-4 py-2 border rounded-md placeholder:text-gray-400 placeholder:text-sm placeholder:uppercase border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none
      ${!expirationDate ? "text-gray-400" : "text-gray-800"}`}
              onClick={(e) => e.currentTarget.showPicker?.()} // optional (ensures consistency)
            />
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="text-gray-700 font-medium mb-2 block">
            Job Description
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Write the full job description here..."
            className="bg-white border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-[#0867bc] text-white font-medium rounded-lg shadow hover:bg-[#065a9b] transition"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
