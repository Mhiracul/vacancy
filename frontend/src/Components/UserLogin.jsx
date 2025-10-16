import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Mail, FileLock, Phone, Loader2, Eye, EyeOff } from "lucide-react";
import Banner from "../assets/jobbannerr.png";
import GoogleLogo from "../assets/googlelogo.png";
import { JobsContext } from "../context/jobContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import BASE_URL from "../config";

const UserLoginPage = () => {
  const [state, setState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    !!localStorage.getItem("rememberUserEmail")
  );
  const { setUser } = useContext(JobsContext);
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledEmail = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: localStorage.getItem("rememberUserEmail") || prefilledEmail,
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Disable scroll during loading
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "unset";
  }, [loading]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // USER REGISTER (Sign Up)
  // =================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      toast.success("🎉 Registration successful! Please verify your email.");

      navigate("/verify-user-email", { state: { email: formData.email } });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      if (rememberMe) {
        localStorage.setItem("rememberUserEmail", email);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("✅ Login successful!");
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-outfit py-10">
      <ToastContainer position="top-center" />
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-[999999]">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <p className="text-white mt-3 text-sm">Please wait...</p>
        </div>
      )}

      <div className="bg-white rounded-xl w-full max-w-5xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            {state === "Login" ? "User Login" : "User Sign Up"}
          </h1>

          {state === "Login" ? (
            <>
              <div className="border border-gray-300 bg-white px-4 py-3 flex items-center gap-2 rounded-md mt-5">
                <Mail size={16} color="#bebebe" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  className="outline-none text-sm w-full"
                  required
                />
              </div>

              <div className="border border-gray-300 bg-white px-4 py-3 flex items-center gap-2 rounded-md mt-5">
                <FileLock size={16} color="#bebebe" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  className="outline-none text-sm w-full"
                  required
                />
                <span
                  className="text-gray-500 cursor-pointer select-none text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}{" "}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#0867bc]"
                />
                <label className="text-sm text-gray-600 cursor-pointer">
                  Remember Me
                </label>
              </div>
              <button
                onClick={handleLogin}
                className="bg-[#0867bc] text-white rounded-md py-2 mt-4 w-full"
              >
                Login
              </button>

              <div className="flex justify-between mt-8 items-center">
                <div className="w-[40%] h-0.5 bg-gray-300"></div>
                <h2 className="text-gray-400 text-sm">OR</h2>
                <div className="w-[40%] h-0.5 bg-gray-300"></div>
              </div>

              <button className="flex items-center bg-white justify-center gap-2 shadow-md mt-6 rounded-lg py-3 w-full hover:bg-gray-50">
                <img src={GoogleLogo} alt="Google" className="h-6" />
                <span className="text-sm text-gray-700">Login with Google</span>
              </button>
            </>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-3 overflow-y-auto max-h-[65vh] pr-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="px-4 py-3 rounded-md bg-gray-50 outline-none text-sm"
                  required
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="px-4 py-3 rounded-md bg-gray-50 outline-none text-sm"
                  required
                />
              </div>

              <div className="px-4 py-3 rounded-md bg-gray-50 flex items-center gap-2">
                <Mail size={16} color="#bebebe" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full outline-none text-sm"
                  required
                />
              </div>

              <div className="px-4 py-3 rounded-md bg-gray-50 flex items-center gap-2">
                <Phone size={16} color="#bebebe" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full outline-none text-sm"
                  required
                />
              </div>

              <div className="px-4 py-3 rounded-md bg-gray-50 flex items-center gap-2">
                <FileLock size={16} color="#bebebe" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create Password"
                  className="w-full outline-none text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#0867bc] text-white rounded-md py-2 mt-4 w-full"
              >
                Submit
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

        {/* Right Banner Section */}
        <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
          <img src={Banner} alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
