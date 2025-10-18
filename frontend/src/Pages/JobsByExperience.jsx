import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import BASE_URL from "../config";
import JobCard from "../Components/JobCard";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const industries = [
  "Agriculture, Fishing & Forestry",
  "Construction",
  "Banking, Finance & Insurance",
  "Education",
  "Science & Technology",
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

const locations = [
  "Abeokuta & Ogun State",
  "Abuja",
  "Benue",
  "Ebonyi",
  "Enugu",
  "Ibadan & Oyo State",
  "Imo",
  "Lagos",
  "Maiduguri & Borno State",
  "Port Harcourt & Rivers State",
  "Rest of Nigeria",
  "Outside Nigeria",
  "Remote (Work From Home)",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Cross River",
  "Delta",
  "Edo",
  "Ekiti",
  "Gombe",
  "Kaduna",
  "Kano",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Nassarawa",
  "Nationwide",
  "Niger",
  "Ondo",
  "Osun",
  "Plateau",
  "Sokoto",
];

const jobTypes = ["Remote", "Full Time", "Contract", "Part Time"];

const JobsByExperience = () => {
  const { level } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    experience: decodeURIComponent(level),
    industry: "",
    location: "",
    jobType: "",
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v && v.length)
        )
      );
      const res = await axios.get(`${BASE_URL}/user/jobs/filter?${params}`);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <>
      {" "}
      <Header />
      <section className="py-20 container mx-auto px-4 2xl:px-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT SIDE */}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-6">
              {filters.experience} Jobs ({jobs.length})
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : jobs.length ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No jobs found.</p>
            )}
          </div>

          {/* RIGHT SIDE FILTERS */}
          <aside className="w-full lg:w-1/4 space-y-6">
            {/* Filter Applied Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-lg mb-4">Filter Applied</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(filters)
                  .filter(([_, v]) => v)
                  .map(([k, v]) => (
                    <span
                      key={k}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {v}
                      <button onClick={() => clearFilter(k)}>
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
              </div>
              <p className="font-semibold">{jobs.length} Jobs Found</p>
            </div>

            {/* Filter Panel */}
            <FilterSection
              title="Industry"
              options={industries}
              selected={filters.industry}
              onSelect={(val) => handleFilterChange("industry", val)}
            />
            <FilterSection
              title="Location"
              options={locations}
              selected={filters.location}
              onSelect={(val) => handleFilterChange("location", val)}
            />
            <FilterSection
              title="Work Type"
              options={jobTypes}
              selected={filters.jobType}
              onSelect={(val) => handleFilterChange("jobType", val)}
            />
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
};

const FilterSection = ({ title, options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <button
        className="flex justify-between items-center w-full font-semibold text-gray-800"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {open && (
        <div className="mt-3 max-h-60 overflow-y-auto text-sm">
          {options.map((opt) => (
            <label
              key={opt}
              className={`block py-1 cursor-pointer ${
                selected === opt
                  ? "text-purple-700 font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => onSelect(opt)}
            >
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsByExperience;
