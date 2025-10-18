import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, User } from "lucide-react";

const UserTypeSelection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check if user has already logged in
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      // Redirect logged-in users straight to Home page
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-outfit">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[90%] md:w-[450px] text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Welcome to Vacancy.NG
        </h1>
        <p className="text-gray-500 mb-8">
          Please select your role to continue
        </p>

        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigate("/login", { state: { mode: "signup" } })}
            className="flex items-center justify-center gap-3 bg-[#0867bc] hover:bg-[#065a9e] text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            <User size={20} />
            I’m a Job Seeker
          </button>

          <button
            onClick={() =>
              navigate("/recruiter-login", { state: { mode: "signup" } })
            }
            className="flex items-center justify-center gap-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-all duration-200"
          >
            <Briefcase size={20} />
            I’m an Employer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
