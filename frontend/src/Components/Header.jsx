import React, { useState, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, UserPlus, User } from "lucide-react";
import Logo from "../assets/Logoo.svg";
import { JobsContext } from "../context/jobContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import BASE_URL from "../config";

function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const { user, setUser } = useContext(JobsContext);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowLogout(false), 200);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Logout handler
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.warn("Backend logout failed:", err.response?.data || err.message);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/"); // redirect to homepage
    }
  };

  // Inside Header component, replace navLinks definition with:
  const navLinks = user
    ? user.role === "recruiter"
      ? [
          { path: "/dashboard", label: "Dashboard" },
          { path: "/dashboard/view-applications", label: "Applications" },
          { path: "/dashboard/manage-job", label: "My Jobs" },
          { path: "/browse-candidates", label: "Find Candidates" },
        ]
      : [
          { path: "/findwork", label: "Find Work" },
          { path: "/dashboard", label: "Dashboard" },
          { path: "/jobalerts", label: "Job Alert" },
          { path: "/browse-recruiters", label: "Find Employers" },
        ]
    : [];

  return (
    <header className="py-4 shadow text-[#4b5563] font-outfit bg-white relative z-50">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="cursor-pointer h-10 md:h-12" />
          <h1 className="font-extrabold text-xl md:text-2xl text-[#0867bc]">
            Vacancy.NG
          </h1>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex text-base items-center gap-3 md:gap-6">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`py-2 px-4 lg:px-6 md:text-base text-sm rounded-md transition-all duration-200 ${
                  pathname === path
                    ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                    : "hover:text-[#7263F3]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4 relative">
          {user ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2 text-black py-2 px-4 rounded-full cursor-pointer">
                <User className="w-5 h-5" />
                <span className="text-sm text-black font-medium">
                  {user.firstName}
                </span>
              </div>

              {showLogout && (
                <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded-md overflow-hidden border border-gray-100 animate-fadeIn">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/recruiter-login")}
                className="py-2 px-6 text-base text-gray-600 transition-all"
              >
                Recruiter Login
              </button>
              <button
                onClick={() => navigate("/login")}
                className="py-2 px-6 text-base rounded-full bg-[#0867bc] flex items-center gap-2 text-white hover:bg-[#065ba3] transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Login
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#0867bc] focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center py-4 gap-4">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-6 rounded-md ${
                    pathname === path
                      ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                      : "text-gray-700 hover:text-[#7263F3]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}

            <div className="flex flex-col gap-3 mt-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="py-2 px-6 text-base rounded-full bg-[#0867bc] text-white hover:bg-[#075a9c]"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/recruiter-login")}
                    className="py-2 px-6 text-base cursor-pointer text-gray-600 transition-all"
                  >
                    Recruiter Login
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="py-2 px-6 text-base rounded-full cursor-pointer bg-[#0867bc] flex items-center justify-center gap-2 text-white hover:bg-[#065ba3] transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    Login
                  </button>
                </>
              )}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
