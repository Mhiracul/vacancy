import React from "react";
import { CheckCircle } from "lucide-react";
import Logo from "../assets/Logoo.svg";
import { useNavigate } from "react-router-dom";

const RecruiterSetupSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white font-outfit text-center px-4 py-12">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-8">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Vacancy.NG" className="h-10" />
          <h1 className="font-extrabold text-xl text-[#0867bc]">Vacancy.NG</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Setup Progress</p>
          <p className="text-[#0867bc] font-medium">100% Completed</p>
          <div className="w-40 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-[#0867bc]"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-[#f0f7ff] w-16 h-16 flex items-center justify-center rounded-full mb-6">
          <CheckCircle className="text-[#0867bc] w-10 h-10" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          🎉 Congratulations, your profile is 100% complete!
        </h2>
        <p className="text-gray-500 max-w-md mb-8 text-sm leading-relaxed">
          Your recruiter profile is now fully set up. You can now explore your
          dashboard or post your first job to start connecting with candidates.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-[#0867bc] text-white cursor-pointer rounded-md hover:bg-[#075a9c] transition text-sm"
          >
            View Dashboard
          </button>
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="px-6 py-3 bg-[#00b894] text-white cursor-pointer rounded-md hover:bg-[#009874] transition text-sm"
          >
            Post Job →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-gray-400 text-xs py-4">
        © 2025 Vacancy.NG - Job Board. All rights reserved.
      </footer>
    </div>
  );
};

export default RecruiterSetupSuccess;
