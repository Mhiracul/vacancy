import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../assets/Logoo.svg";
import { ArrowRight } from "lucide-react";
import BASE_URL from "../config";

const VerifyUserEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code) return toast.error("Please enter the verification code");

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/user/verify-email`, {
        email,
        code,
      });

      toast.success(res.data.message);

      setTimeout(() => {
        setLoading(false);
        // redirect user to login after success
        navigate("/login", { state: { isNewUser: true, email } });
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <p className="p-4 text-center text-gray-600">
        No email provided. Please go back and register again.
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      {/* Logo */}
      <div className="flex justify-center pt-6 pb-4">
        <img src={Logo} alt="Miles Edge" className="w-28 h-16" />
      </div>

      <div className="flex justify-center flex-1 items-center">
        <div className="bg-white w-full max-w-md p-8 border border-gray-100 rounded-xl shadow-sm">
          <h1 className="text-2xl font-medium text-center mb-3">
            Email Verification
          </h1>
          <p className="text-gray-500 text-center text-sm mb-6">
            A verification code has been sent to{" "}
            <strong className="text-black">{email}</strong>. Enter it below to
            verify your account.
          </p>

          <form onSubmit={handleVerify}>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-md outline-none mb-5 text-center tracking-widest text-lg"
              maxLength={6}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0867bc] text-white py-3 rounded-md flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify my account"}
              <ArrowRight strokeWidth={1} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyUserEmail;
