import React, { useEffect, useContext, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/Logoo.svg";
import Google from "../assets/googlelogo.png";
import {
  BriefcaseBusiness,
  BellRing,
  Bookmark,
  Settings,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { JobsContext } from "../context/jobContext";
import BASE_URL from "../config";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(JobsContext);
  const [role, setRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // mobile sidebar toggle

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setRole(parsedUser.role || "user");
    } else {
      navigate("/login");
    }
  }, [navigate, setUser]);

  const menuItems = {
    recruiter: [
      { label: "Dashboard", path: "/dashboard", icon: "/src/assets/Fill.svg" },
      {
        label: "Add Job",
        path: "/dashboard/add-job",
        icon: "/src/assets/AddJ.svg",
      },
      {
        label: "Manage Jobs",
        path: "/dashboard/manage-job",
        icon: "/src/assets/ManageJ.svg",
      },
      {
        label: "View Applications",
        path: "/dashboard/view-applications",
        icon: "/src/assets/viewApp.svg",
      },
      {
        label: "Settings",
        path: "/dashboard/settings",
        icon: <Settings strokeWidth={2} className="w-5 h-5" />,
      },
    ],
    user: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard strokeWidth={2} className="w-6 h-6" />,
      },
      {
        label: "Jobs Alert",
        path: "/dashboard/jobs-for-you",
        icon: <BellRing strokeWidth={2} className="w-6 h-6" />,
      },
      {
        label: "Applied Jobs",
        path: "/dashboard/applied-jobs",
        icon: <BriefcaseBusiness strokeWidth={2} className="w-6 h-6" />,
      },
      {
        label: "Favorite Jobs",
        path: "/dashboard/favorite-jobs",
        icon: <Bookmark strokeWidth={2} className="w-6 h-6" />,
      },
      {
        label: "Settings",
        path: "/dashboard/user-settings",
        icon: <Settings strokeWidth={2} className="w-6 h-6" />,
      },
    ],
    admin: [
      { label: "Dashboard", path: "/dashboard", icon: "/src/assets/Fill.svg" },
      {
        label: "Manage Users",
        path: "/dashboard/manage-users",
        icon: "/src/assets/users.svg",
      },
      {
        label: "Manage Jobs",
        path: "/dashboard/manage-all-jobs",
        icon: "/src/assets/manageJobs.svg",
      },
      {
        label: "Settings",
        path: "/dashboard/settings",
        icon: "/src/assets/settings.svg",
      },
    ],
  };

  const links = menuItems[role] || [];

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.warn(err);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen font-outfit bg-[#f9f9ff]">
      {" "}
      <Toaster position="top-right" />
      {/* Navbar */}
      {/* Navbar */}
      <div className="shadow py-4 bg-white fixed top-0 left-0 w-full z-40">
        <div className="px-4 flex justify-between items-center">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-3">
            <img
              onClick={() => navigate("/home")}
              src={Logo}
              alt="Logo"
              className="h-16 cursor-pointer"
            />
          </div>

          {/* Right Section - Profile + Mobile Menu */}
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden capitalize">{user?.firstName}</p>

            {/* Profile Dropdown */}
            <div className="relative group">
              <img
                src={user?.profileImage || Google}
                alt="Profile"
                className="w-8 h-8 border border-[#e2e2e2] rounded-full cursor-pointer object-cover"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border border-[#e2e2e2] text-sm">
                  <li
                    className="py-1 px-2 pr-10 cursor-pointer hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>

            {/* Mobile Menu Button (Now on the far right) */}
            <button
              className="lg:hidden ml-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </div>
      {/* Desktop Sidebar */}
      {/* Layout Wrapper */}
      <div className="flex min-h-screen pt-24">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 border-r-2 border-[#e2e2e2] bg-white">
          <ul className="flex flex-col px-2 gap-12 items-start text-gray-800 py-8">
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-1.5 sm:px-6 gap-2 font-light w-full hover:rounded-md rounded-md hover:shadow ${
                    isActive ? "bg-[#1967d21a]" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {typeof item.icon === "string" ? (
                      <img src={item.icon} alt="" className="w-4" />
                    ) : (
                      item.icon
                    )}
                    <p
                      className={`${
                        isActive ? "text-[#1967d2]" : "text-[#696969]"
                      }`}
                    >
                      {item.label}
                    </p>
                  </>
                )}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-5 bg-[#f9f9ff]">
          <Outlet />
        </div>
      </div>
      {/* Mobile Sidebar (Slide In) */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-6 border-b">
          <img src={Logo} alt="Logo" className="h-10" />
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col gap-8 items-start p-6 text-gray-800">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full hover:bg-[#f5f5f5] p-2 rounded-md ${
                  isActive ? "bg-[#1967d21a]" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {typeof item.icon === "string" ? (
                    <img src={item.icon} alt="" className="w-4" />
                  ) : (
                    item.icon
                  )}
                  <p
                    className={`${
                      isActive ? "text-[#1967d2]" : "text-[#696969]"
                    }`}
                  >
                    {item.label}
                  </p>
                </>
              )}
            </NavLink>
          ))}
          <li
            onClick={handleLogout}
            className="flex items-center gap-3 w-full hover:bg-[#f5f5f5] p-2 rounded-md cursor-pointer text-[#696969]"
          >
            <LogOut strokeWidth={2} className="w-5 h-5" />
            Logout
          </li>
        </ul>
      </div>
      {/* Page Content */}
    </div>
  );
};

export default Dashboard;
