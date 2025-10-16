import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bookmark,
  Bell,
  Briefcase,
  Loader2,
  TrendingUp,
  Star,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BASE_URL from "../config";

const UserDashboard = () => {
  const [appliedCount, setAppliedCount] = useState(0);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [jobAlerts, setJobAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // 🔹 Fetch applied jobs count
        const appliedRes = await axios.get(
          `${BASE_URL}/user/jobs/applied/count`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("🟢 Applied jobs API response:", appliedRes.data);

        if (appliedRes.data && typeof appliedRes.data.count === "number") {
          setAppliedCount(appliedRes.data.count);
        } else {
          console.warn(
            "⚠️ Unexpected applied jobs data format:",
            appliedRes.data
          );
          setAppliedCount(0);
        }

        // 🔹 Fetch favorite jobs
        const favoritesRes = await axios.get(
          `${BASE_URL}/user/jobs/favorites`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("💖 Favorite jobs API response:", favoritesRes.data);

        if (Array.isArray(favoritesRes.data)) {
          setFavoriteJobs(favoritesRes.data);
        } else {
          console.warn(
            "⚠️ Unexpected favorite jobs data format:",
            favoritesRes.data
          );
          setFavoriteJobs([]);
        }

        // 🔹 Fetch job alerts
        const alertsRes = await axios.get(`${BASE_URL}/user/job-alerts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("🔔 Job alerts API response:", alertsRes.data);

        if (Array.isArray(alertsRes.data)) {
          setJobAlerts(alertsRes.data);
        } else {
          console.warn("⚠️ Unexpected job alerts data format:", alertsRes.data);
          setJobAlerts([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching user dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = [
    { month: "Jan", Applications: 4 },
    { month: "Feb", Applications: 6 },
    { month: "Mar", Applications: 3 },
    { month: "Apr", Applications: 8 },
    { month: "May", Applications: 5 },
    { month: "Jun", Applications: 9 },
  ];

  const stats = [
    {
      title: "Applied Jobs",
      value: loading ? (
        <Loader2 className="animate-spin w-5 h-5 text-[#0867bc]" />
      ) : (
        appliedCount
      ),
      icon: <Briefcase className="text-[#0867bc] w-5 h-5" />,
      color: "bg-blue-50",
      textColor: "text-[#0867bc]",
    },
    {
      title: "Favorite Jobs",
      value: loading ? (
        <Loader2 className="animate-spin w-5 h-5 text-[#f43f5e]" />
      ) : (
        favoriteJobs.length
      ),
      icon: <Bookmark className="text-[#f43f5e] w-5 h-5" />,
      color: "bg-pink-50",
      textColor: "text-[#f43f5e]",
    },
    {
      title: "Job Alerts",
      value: loading ? (
        <Loader2 className="animate-spin w-5 h-5 text-[#f59e0b]" />
      ) : (
        jobAlerts.length
      ),
      icon: <Bell className="text-[#f59e0b] w-5 h-5" />,
      color: "bg-yellow-50",
      textColor: "text-[#f59e0b]",
    },
  ];

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen md:px-6 px-2 p-6 font-outfit">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="md:text-2xl text-lg whitespace-nowrap font-semibold text-gray-800">
          Overview
        </h1>
        <input
          type="text"
          placeholder="Search jobs or alerts..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0867bc]"
        />
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl shadow-sm border border-gray-100 ${item.color}`}
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">{item.title}</p>
              {item.icon}
            </div>
            <h2 className={`text-2xl font-semibold mt-2 ${item.textColor}`}>
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* ===== Chart + Recommendations ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#0867bc]" />
            Application Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Applications"
                stroke="#0867bc"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations / Alerts */}
        <div className="bg-gradient-to-r from-[#0867bc] to-[#00aaff] text-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-white" /> Personalized Alerts
          </h3>
          {jobAlerts.length > 0 ? (
            <ul className="space-y-3">
              {jobAlerts.slice(0, 4).map((alert, i) => (
                <li
                  key={i}
                  className="bg-white/10 px-4 py-2 rounded-lg text-sm"
                >
                  {alert.title || "New Job Alert"} —{" "}
                  <span className="opacity-80">{alert.location}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="opacity-80 text-sm">
              No job alerts yet. Subscribe to categories to get updates!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
