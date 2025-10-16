// jobContext.jsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const JobsContext = createContext();

export const JobsContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, SetIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [user, setUser] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/all");
      setJobs(res.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ New: fetch logged-in user from backend
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // keep in sync
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchUserProfile();
  }, []);

  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    SetIsSearched,
    jobs,
    setJobs,
    loading,
    showRecruiterLogin,
    setShowRecruiterLogin,
    showUserLogin,
    setShowUserLogin,
    user,
    setUser,
    fetchUserProfile, // ✅ make available for re-fetch after upload
  };

  return (
    <JobsContext.Provider value={value}>{props.children}</JobsContext.Provider>
  );
};
