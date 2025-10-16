import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Briefcase,
  Users,
  CalendarCheck2,
  UserPlus,
  Loader2,
} from "lucide-react";

const RecruiterDashboard = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch total jobs from backend
  useEffect(() => {
    const fetchTotalJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/jobs/recruiter/total",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTotalJobs(res.data.total || 0);
      } catch (error) {
        console.error("Error fetching total jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalJobs();
  }, []);

  // --- Stats Cards Data ---
  const stats = [
    {
      title: "Total Jobs",
      value: loading ? (
        <Loader2 className="animate-spin w-5 h-5 text-[#0867bc]" />
      ) : (
        totalJobs
      ),
      change: "+12%",
      color: "text-green-500",
      icon: <Briefcase className="w-5 h-5 text-[#0867bc]" />,
      report: "View Report",
    },
    {
      title: "Total Applications",
      value: "845",
      change: "+18%",
      color: "text-green-500",
      icon: <Users className="w-5 h-5 text-[#0867bc]" />,
      report: "View Report",
    },
    {
      title: "Interviews Scheduled",
      value: "230",
      change: "+7%",
      color: "text-green-500",
      icon: <CalendarCheck2 className="w-5 h-5 text-[#0867bc]" />,
      report: "View Report",
    },
    {
      title: "New Candidates",
      value: "54",
      change: "+10%",
      color: "text-green-500",
      icon: <UserPlus className="w-5 h-5 text-[#0867bc]" />,
      report: "View More",
    },
  ];

  // --- Chart Data ---
  const chartData = [
    { year: 2019, Applications: 150, Hires: 35 },
    { year: 2020, Applications: 180, Hires: 40 },
    { year: 2021, Applications: 200, Hires: 45 },
    { year: 2022, Applications: 300, Hires: 60 },
    { year: 2023, Applications: 350, Hires: 80 },
    { year: 2024, Applications: 400, Hires: 95 },
  ];

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen p-6">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Recruiter Dashboard Overview
        </h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0867bc]"
        />
      </div>

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">{item.title}</p>
              {item.icon}
            </div>
            <h2 className="text-2xl font-semibold mt-2">{item.value}</h2>
            <div className="flex justify-between items-center mt-3">
              <p className={`text-sm ${item.color}`}>{item.change}</p>
              <a
                href="#"
                className="text-[#0867bc] text-sm hover:underline font-medium"
              >
                {item.report}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Chart + Performance Section ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-semibold mb-4 text-gray-700">
            Applications Over the Years
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <defs>
                <linearGradient
                  id="colorApplications"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#0867bc" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0867bc" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00c6ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0867bc" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="Applications"
                stroke="#0867bc"
                strokeWidth={3}
                dot={{ r: 4 }}
                fill="url(#colorApplications)"
              />
              <Line
                type="monotone"
                dataKey="Hires"
                stroke="#00c6ff"
                strokeWidth={3}
                dot={{ r: 4 }}
                fill="url(#colorHires)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-[#0867bc] to-[#00c6ff] text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Recruitment Goal</h3>
            <p className="text-4xl font-bold mb-1">82%</p>
            <p className="text-sm opacity-90 mb-4">Target Achieved</p>
          </div>

          <div className="border-t border-white/30 pt-4">
            <p className="text-sm mb-1">Total Interviews Completed</p>
            <h4 className="text-2xl font-bold">320</h4>
            <p className="text-sm opacity-80 mt-2">+15% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
