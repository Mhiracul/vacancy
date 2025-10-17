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
  const [user, setUser] = useState(null);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // ✅ Fetch user details
        const userRes = await axios.get(`${BASE_URL}/auth/settings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userRes.data;
        setUser(userData);

        // ✅ Check profile completeness (based on deeper fields)
        const missing =
          !userData.dob ||
          !userData.education ||
          !userData.experience ||
          !userData.profession ||
          !userData.website ||
          !userData.gender ||
          !userData.resumes ||
          userData.resumes.length === 0 ||
          !userData.socialLinks ||
          Object.values(userData.socialLinks).every((link) => !link);

        setIsProfileIncomplete(missing);

        // 🧩 Fetch other data
        const [appliedRes, favoritesRes, alertsRes] = await Promise.all([
          axios.get(`${BASE_URL}/user/jobs/applied/count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/user/jobs/favorites`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/user/job-alerts`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAppliedCount(appliedRes.data.count || 0);
        setFavoriteJobs(favoritesRes.data || []);
        setJobAlerts(alertsRes.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
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

      {/* ===== Profile Incomplete Banner ===== */}

      {isProfileIncomplete && (
        <div className="flex flex-col md:flex-row items-center justify-between bg-red-500 text-white rounded-xl p-5 mb-8 shadow-md">
          <div className="flex items-center gap-4">
            <img
              src={
                user?.profileImage || "https://via.placeholder.com/60?text=👤"
              }
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h2 className="font-semibold text-lg">
                Your profile editing is not completed.
              </h2>
              <p className="text-sm opacity-90">
                Complete your profile & build your custom resume to get better
                job matches.
              </p>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/user/settings")}
            className="mt-4 md:mt-0 bg-white text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Edit Profile →
          </button>
        </div>
      )}

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
