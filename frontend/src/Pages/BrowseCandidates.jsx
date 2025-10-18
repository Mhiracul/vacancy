import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import { Search, MapPin } from "lucide-react";
import CandidateModal from "../Components/CandidateModal";
import Footer from "../Components/Footer";
import BASE_URL from "../config";

const BrowseCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [filters, setFilters] = useState({
    gender: "All",
    location: "",
    search: "",
  });

  useEffect(() => {
    fetchCandidates();
  }, [filters]);

  const fetchCandidates = async () => {
    const { gender, location, search } = filters;
    const res = await axios.get(`${BASE_URL}/candidates`, {
      params: { gender, location, search },
    });
    setCandidates(res.data.data || []); // 👈 access the actual array
  };

  return (
    <>
      <Header />
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      <div className="bg-gray-50 min-h-screen font-outfit">
        <div className="bg-gradient-to-b from-gray-100 to-white py-10 shadow-sm">
          <div className="container px-4 2xl:px-20 mx-auto ">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Find Candidates
            </h1>

            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md p-4 gap-3 md:gap-4 items-center">
              {/* Job title or keyword */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 w-full md:w-1/2">
                <Search className="text-[#0867bc] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Name, email..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="flex-1 outline-none text-gray-700"
                />
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 w-full md:w-1/2">
                <MapPin className="text-[#0867bc] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  className="flex-1 outline-none text-gray-700"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={fetchCandidates}
                className="bg-[#0867bc] hover:bg-blue-700 text-sm whitespace-nowrap text-white px-6 py-2 rounded-sm font-medium"
              >
                Find Candidate
              </button>
            </div>
          </div>
        </div>

        <div className=" container px-4 2xl:px-20 mx-auto py-10 flex md:flex-row flex-col gap-6">
          {/* Sidebar Filters */}
          <div className="w-1/4 bg-white border-gray-200 rounded-md p-4 shadow">
            <h3 className="font-semibold mb-4 text-gray-700">Filters</h3>

            {/* Gender Filter */}
            <h4 className="text-gray-600 mb-2">Gender</h4>
            <div className="flex flex-col gap-2">
              {["All", "Male", "Female", "Other"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <input
                    type="radio"
                    name="gender"
                    checked={filters.gender === g}
                    onChange={() => setFilters({ ...filters, gender: g })}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Candidate List */}
          <div className="flex-1">
            {candidates.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                No candidates found.
              </p>
            ) : (
              <div className="grid gap-4">
                {candidates.map((c) => (
                  <div
                    key={c._id}
                    className="flex justify-between items-center bg-white p-4 hover:border-[#78b7ed] rounded-md border border-gray-200  hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={c.profileImage}
                        alt="Profile"
                        className="w-14 h-14 rounded-md shadow object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-[#212934]">
                          {c.firstName} {c.lastName}
                        </h4>
                        <p className="text-gray-600 text-sm">{c.profession}</p>
                        <p className="text-gray-500 text-xs">
                          {c.location} • {c.experience} experience
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCandidate(c)}
                      className="bg-[#e7f1fd] text-[#0867bc] font-medium px-4 py-2 hover:bg-blue-100"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrowseCandidates;
