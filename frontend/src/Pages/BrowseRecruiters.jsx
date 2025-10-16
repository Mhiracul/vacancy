import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import RecruiterModal from "../Components/RecruiterModal";
import { ChevronRight, ChevronLeft } from "lucide-react";

const BrowseRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recruitersPerPage = 9;

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/candidates/rec");
      setRecruiters(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(recruiters.length / recruitersPerPage);
  const indexOfLastRecruiter = currentPage * recruitersPerPage;
  const indexOfFirstRecruiter = indexOfLastRecruiter - recruitersPerPage;
  const currentRecruiters = recruiters.slice(
    indexOfFirstRecruiter,
    indexOfLastRecruiter
  );

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      {selectedRecruiter && (
        <RecruiterModal
          recruiter={selectedRecruiter}
          onClose={() => setSelectedRecruiter(null)}
        />
      )}

      <div className="bg-gray-50 min-h-screen font-outfit py-10">
        <div className="container mx-auto px-4 2xl:px-20">
          <h1 className="text-2xl font-semibold text-gray-800 mb-8">
            Browse Recruiters
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRecruiters.length === 0 ? (
              <p className="text-gray-500 text-center col-span-3">
                No recruiters found.
              </p>
            ) : (
              currentRecruiters.map((r) => (
                <div
                  key={r._id}
                  className="bg-white border border-gray-200 hover:shadow-lg transition rounded-lg py-7 px-5"
                >
                  <div className="flex items-center py-1 gap-4 mb-4">
                    <img
                      src={r.companyLogo || "https://via.placeholder.com/60"}
                      alt={r.companyName}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h2
                        onClick={() => setSelectedRecruiter(r)}
                        className="font-semibold text-[#0867bc] hover:underline cursor-pointer"
                      >
                        {r.companyName}
                      </h2>
                      <p className="text-gray-600 mt-2 text-sm">
                        {r.notificationEmail}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRecruiter(r)}
                    className="w-full bg-[#e7f1fd] text-[#0867bc] py-4 rounded-sm text-base font-medium hover:bg-blue-100"
                  >
                    View Open Positions
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {recruiters.length > recruitersPerPage && (
            <div className="flex justify-center items-center gap-2 mt-10">
              {/* Previous Button */}
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-full font-medium ${
                  currentPage === 1
                    ? " text-gray-500 cursor-not-allowed"
                    : " text-white rounded-full hover:bg-[#0759a1]"
                }`}
              >
                <ChevronLeft />
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`px-3 py-1 rounded-full text-sm border font-normal ${
                      currentPage === page
                        ? "bg-blue-100 text-[#0867bc] border-blue-100"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1  text-sm rounded-full font-medium ${
                  currentPage === totalPages
                    ? " text-gray-500 cursor-not-allowed"
                    : " text-[#0867bc] hover:bg-blue-100"
                }`}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BrowseRecruiters;
