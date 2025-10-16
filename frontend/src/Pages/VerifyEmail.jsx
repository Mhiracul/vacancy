import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ useNavigate added

import axios from "axios";
import { toast } from "react-toastify";
import { JobsContext } from "../context/jobContext";
import Logo from "../assets/Logoo.svg";
import { ArrowRight } from "lucide-react";
const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ initialize navigate
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code) return toast.error("Please enter the verification code");

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/recruiter/verify-email`, {
        email,
        code,
      });

      toast.success(res.data.message);

      setTimeout(() => {
        setLoading(false);
        // Open login modal
        navigate("/recruiter-login", { state: { isNewUser: true, email } });
        // Close this verification page/modal
      }, 1000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Verification failed");
      setLoading(false);
    }
  };
  if (!email) {
    return (
      <p className="p-4">No email provided. Please go back and try again.</p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      {/* Logo at the top */}
      <div className="flex justify-center pt-6 pb-4">
        <img src={Logo} alt="Vacancy.NG" className="w-28 h-16" />
      </div>
      <div className="flex justify-center flex-1 items-center">
        <div className="bg-white  w-full max-w-2xl p-8 ">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-medium text-center mb-2">
              Email Verification
            </h1>
            <p className="text-gray-400 md:text-base text-sm max-w-md text-center ">
              We've sent a verification email to{" "}
              <strong className="text-black">{email}</strong> to verify your
              email address and activate your account.
            </p>
          </div>

          <form onSubmit={handleVerify}>
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-5 border border-gray-200  mb-7 mt-7 text-sm outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0867bc] flex capitalize items-center justify-center gap-2 text-white py-3 rounded-md disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify my account"}{" "}
              <ArrowRight strokeWidth={1} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
