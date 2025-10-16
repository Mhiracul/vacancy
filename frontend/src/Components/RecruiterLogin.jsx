import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Upload from "../assets/upload.svg";
import Banner from "../assets/jobbannerr.png";
import GoogleLogo from "../assets/googlelogo.png";
import {
  X,
  User,
  Mail,
  FileLock,
  Eye,
  EyeOff,
  Phone,
  Loader2,
} from "lucide-react";
import { JobsContext } from "../context/jobContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(JobsContext);
  const [loading, setLoading] = useState(false); // ⬅️ Added loading state
  const location = useLocation();
  const isNewUser = location.state?.isNewUser || false;
  const prefilledEmail = location.state?.email || "";
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(
    !!localStorage.getItem("rememberEmail") // check if email exists
  );

  const [repData, setRepData] = useState({
    workEmail: localStorage.getItem("rememberEmail") || prefilledEmail, // <-- use prefilledEmail here
    password: "",
    firstName: "",
    lastName: "",
    position: "",
    phone: "",
  });

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "unset";
  }, [loading]); // ⬅️ lock scroll when loading

  // ==========================
  // REGISTER RECRUITER
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        firstName: repData.firstName,
        lastName: repData.lastName,
        email: repData.workEmail,
        password: repData.password,
        position: repData.position,
        phone: repData.phone,
      };

      await axios.post(
        "http://localhost:5000/api/recruiter/register",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("🎉 Registration successful!");

      // Store email before clearing form
      const registeredEmail = repData.workEmail;

      // Navigate to verification page
      navigate("/verify-email", { state: { email: registeredEmail } });

      // Reset form
      setRepData({
        firstName: "",
        lastName: "",
        workEmail: "",
        password: "",
        position: "",
        phone: "",
      });

      setLoading(false); // stop loading
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Signup failed");
      setLoading(false);
    }
  };

  // ==========================
  // LOGIN RECRUITER
  // ==========================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // ⬅️ Start loading spinner
    const { workEmail, password } = repData;

    if (!workEmail || !password) {
      toast.error("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/recruiter/login",
        { email: workEmail, password }
      );

      const { token, recruiter } = res.data;

      if (rememberMe) {
        localStorage.setItem("rememberEmail", workEmail);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.recruiter));
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.recruiter));
      }

      toast.success("✅ Login successful!");
      setUser(recruiter);
      setTimeout(() => {
        setLoading(false);
        if (isNewUser) {
          navigate("/account-setup");
        } else {
          navigate("/dashboard");
        }
      }, 1500);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="absolute font-outfit top-0 left-0 right-0 bottom-0 z-[99999] flex justify-center items-center backdrop-blur-sm bg-black/10 ">
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-[999999]">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <p className="text-white mt-3 text-sm">Please wait...</p>
        </div>
      )}
      <div className="relative bg-gray-100 rounded-xl w-full  flex flex-col md:flex-row overflow-y-auto h-full">
        {/* Left: Form */}
        <div className="w-full container mx-auto px-10 md:w-1/2 mt-10 p-8">
          <h1 className="text-2xl font-bold text-start text-neutral-800 mb-2">
            Recruiter {state}
          </h1>

          <p className="text-sm text-gray-500 text-start mb-3">
            If you are already a member, easily login
          </p>

          {/* ========== LOGIN FORM ========== */}
          {state === "Login" && (
            <form onSubmit={handleLogin}>
              <div className="border border-[#e2e2e2] bg-white px-4 py-4 flex items-center gap-2 rounded-md mt-5">
                <Mail size={16} color="#bebebe" />
                <input
                  type="email"
                  placeholder="Email"
                  className="outline-none text-sm w-full"
                  required
                  value={repData.workEmail}
                  onChange={(e) =>
                    setRepData({ ...repData, workEmail: e.target.value })
                  }
                />
              </div>

              <div className="border border-[#e2e2e2] bg-white px-4 py-4 flex items-center gap-2 rounded-md mt-5">
                <FileLock size={16} color="#bebebe" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="outline-none text-sm w-full"
                  required
                  value={repData.password}
                  onChange={(e) =>
                    setRepData({ ...repData, password: e.target.value })
                  }
                />
                <div
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#0867bc]"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Remember Me
                </label>
              </div>

              <button
                disabled={loading}
                className="bg-[#0867bc] text-white rounded-md py-2 mt-4 w-full disabled:opacity-70"
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <p className="text-sm text-blue-600 mt-3 cursor-pointer">
                Forgot password?
              </p>
              <div className="flex justify-between mt-8 items-center">
                <div className="w-[40%] h-0.5 bg-[#e2e2e2]"></div>
                <h2 className="text-[#e2e2e2] text-sm">OR</h2>
                <div className="w-[40%] h-0.5 bg-[#e2e2e2]"></div>
              </div>

              <button className="flex items-center bg-white justify-center gap-2 shadow-lg mt-8 rounded-lg py-3 w-full mb-4 hover:bg-gray-100">
                <img src={GoogleLogo} alt="Google" className="h-8" />
                <span className="text-sm text-gray-700">Login with Google</span>
              </button>
            </form>
          )}

          {/* ========== SIGNUP FORM ========== */}
          {state === "Sign Up" && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Company Representative
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="px-4 py-4 bg-white flex items-center gap-2 rounded-md">
                  <User size={16} color="#bebebe" />
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={repData.firstName}
                    onChange={(e) =>
                      setRepData({ ...repData, firstName: e.target.value })
                    }
                    className="outline-none text-sm w-full"
                  />
                </div>

                <div className="px-4 py-4 bg-white flex items-center gap-2 rounded-md">
                  <User size={16} color="#bebebe" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={repData.lastName}
                    onChange={(e) =>
                      setRepData({ ...repData, lastName: e.target.value })
                    }
                    className="outline-none text-sm w-full"
                  />
                </div>
              </div>

              <div className="px-4 py-4 bg-white flex items-center gap-2 rounded-md mt-3">
                <Mail size={16} color="#bebebe" />
                <input
                  type="email"
                  placeholder="Work Email"
                  required
                  value={repData.workEmail}
                  onChange={(e) =>
                    setRepData({ ...repData, workEmail: e.target.value })
                  }
                  className="outline-none text-sm w-full"
                />
              </div>

              <div className="px-4 py-4 bg-white flex items-center gap-2 rounded-md mt-3">
                <FileLock size={16} color="#bebebe" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  required
                  value={repData.password}
                  onChange={(e) =>
                    setRepData({ ...repData, password: e.target.value })
                  }
                  className="outline-none text-sm w-full"
                />
                <div
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>

              <div className="px-4 py-4 bg-white flex items-center gap-2 rounded-md mt-3">
                <input
                  type="text"
                  placeholder="Position in Company"
                  required
                  value={repData.position}
                  onChange={(e) =>
                    setRepData({ ...repData, position: e.target.value })
                  }
                  className="outline-none text-sm w-full"
                />
              </div>

              {/* 📞 Phone Number Field */}
              <div className="px-4 py-4 bg-white flex items-center gap-2 rounded-md mt-3">
                <Phone size={16} color="#bebebe" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={repData.phone}
                  onChange={(e) =>
                    setRepData({ ...repData, phone: e.target.value })
                  }
                  className="outline-none text-sm w-full"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#0867bc] text-white rounded-md py-2 mt-4 w-full disabled:opacity-70"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          )}

          <div className="mt-6 flex justify-between items-center text-sm">
            <p className="text-gray-600">
              {state === "Login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <span
              className="text-[#0867bc] cursor-pointer bg-white rounded-sm px-4 py-2"
              onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
            >
              {state === "Login" ? "Sign Up" : "Login"}
            </span>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hidden md:flex w-1/2 bg-blue-50 rounded-r-xl items-center justify-center">
          <img
            src={Banner}
            alt="Recruiter"
            className="w-full h-full object-cover rounded-r-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;
