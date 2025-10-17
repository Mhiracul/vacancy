import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { Loader2 } from "lucide-react";

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
        const userRes = await axios.get(`${BASE_URL}/auth/profile-settings`, {
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );

  return (
    <div className="p-4 md:p-8">
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

      {/* ===== Dashboard Stats or Content Below ===== */}
      <div>{/* your other dashboard sections here */}</div>
    </div>
  );
};

export default UserDashboard;
