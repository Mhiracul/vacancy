// src/layouts/Dashboard.jsx
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
} from "lucide-react";
import { JobsContext } from "../context/jobContext"; // <-- import context
import BASE_URL from "../config";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(JobsContext); // <-- use context for user
  const [role, setRole] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser); // update context
      setRole(parsedUser.role || "user"); // safely set role
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
      setUser(null); // update context so Header syncs
      toast.success("Logged out successfully!");
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen font-outfit bg-[#f9f9ff]">
      <Toaster position="top-right" />

      {/* Navbar */}
      <div className="shadow py-4 bg-white">
        <div className="px-4 flex justify-between items-center">
          <img
            onClick={() => navigate("/home")}
            src={Logo}
            alt="Logo"
            className="h-16 cursor-pointer"
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden capitalize">{user?.firstName}</p>
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
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:inline-block min-h-screen border-r-2 border-[#e2e2e2]">
          <ul className="flex flex-col gap-6 items-start pt-5 text-gray-800">
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-8 sm:px-6 gap-2 w-full hover:rounded-md hover:shadow hover:bg-gray-100 ${
                    isActive ? "bg-blue-50 border-r-4 border-[#0867bc]" : ""
                  }`
                }
              >
                {typeof item.icon === "string" ? (
                  <img src={item.icon} alt="" className="w-4" />
                ) : (
                  item.icon
                )}
                <p className="max-sm:hidden">{item.label}</p>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </div>

      {/* Mobile bottom menu */}
      <div className="fixed bottom-0 left-0 w-full lg:hidden bg-white border-t border-gray-200 shadow-md">
        <ul className="flex justify-around items-center py-2">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center text-gray-500 hover:text-blue-500 ${
                  isActive ? "text-blue-500" : ""
                }`
              }
            >
              {typeof item.icon === "string" ? (
                <img src={item.icon} alt="" className="w-4 h-4 mb-1" />
              ) : (
                React.cloneElement(item.icon, { className: "w-6 h-6 mb-1" })
              )}
              <span className="absolute bottom-full mb-2 w-max px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </NavLink>
          ))}

          <li
            onClick={handleLogout}
            className="relative flex flex-col items-center text-gray-500 hover:text-blue-500 cursor-pointer"
          >
            <LogOut strokeWidth={2} className="w-4 h-4" />
            <span className="absolute bottom-full mb-2 w-max px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
