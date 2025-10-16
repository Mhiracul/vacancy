import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import { GlobalContextProvider } from "./context/globalContext.jsx";
import { JobsContextProvider, JobsContext } from "./context/jobContext.jsx";
import ApplyJob from "./Pages/ApplyJob.jsx";
import Application from "./Pages/Application.jsx";
import RecruiterLogin from "./Components/RecruiterLogin.jsx";
import { useContext } from "react";
import AddJob from "./Pages/AddJob.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ManageJobs from "./Pages/ManageJobs.jsx";
import ViewApplication from "./Pages/ViewApplication.jsx";
import "quill/dist/quill.snow.css";
import CoursesPage from "./Pages/CoursesPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import UserLogin from "./Components/UserLogin.jsx";
import RecruiterDashboard from "./Components/RecruiterDashboard.jsx";
import AdminDashboard from "./Components/AdminDashboard.jsx";
import UserDashboard from "./Components/UserDashboard.jsx";
import RecruiterPayment from "./Pages/RecruiterPayment.jsx";
import VerifyPayment from "./Pages/VerifyPayment.jsx";
import RecruiterSettings from "./Pages/RecruiterSettings.jsx";
import PricingPage from "./Pages/PricingPage.jsx";
import FindWork from "./Pages/FindWork.jsx";
import AppliedJobs from "./Pages/AppliedJobs.jsx";
import FavouriteJobs from "./Pages/FavouriteJobs.jsx";
import UserSettings from "./Pages/UserSettings.jsx";
import { Toaster } from "react-hot-toast"; // ✅ Add this
import RecruiterAccountSetup from "./Pages/RecruiterAccountSetup.jsx";
import RecruiterSetupSuccess from "./Pages/RecruiterSetupSuccess.jsx";
import VerifyEmail from "./Pages/VerifyEmail.jsx";
import BrowseCandidates from "./Pages/BrowseCandidates.jsx";
import BrowseRecruiters from "./Pages/BrowseRecruiters.jsx";
import VerifyUserEmail from "./Pages/VerifyUserEmail.jsx";
import VerifyUserPayment from "./Pages/VerifyUserPayment.jsx";
import UserPayment from "./Pages/UserPayment.jsx";

function AppContent() {
  const userData = localStorage.getItem("user");
  const role = userData ? JSON.parse(userData).role : null;
  const { showRecruiterLogin, showUserLogin } = useContext(JobsContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applied-jobs" element={<Application />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/findwork" element={<FindWork />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-user-email" element={<VerifyUserEmail />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/login" element={<UserLogin />} />

        <Route path="/account-setup">
          <Route index element={<RecruiterAccountSetup />} />
          <Route path="success" element={<RecruiterSetupSuccess />} />
        </Route>

        <Route path="/payment/verify" element={<VerifyPayment />} />
        <Route path="/user-payment" element={<UserPayment />} />
        <Route path="/payment/verify-user" element={<VerifyUserPayment />} />
        <Route path="/browse-candidates" element={<BrowseCandidates />} />
        <Route path="/browse-recruiters" element={<BrowseRecruiters />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Default dashboard outlet per role */}
          <Route
            index
            element={
              role === "recruiter" ? (
                <RecruiterDashboard />
              ) : role === "admin" ? (
                <AdminDashboard />
              ) : role === "user" ? (
                <UserDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />{" "}
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-job" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplication />} />
          <Route path="settings" element={<RecruiterSettings />} />
          <Route path="payment" element={<RecruiterPayment />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
          <Route path="favorite-jobs" element={<FavouriteJobs />} />
          <Route path="user-settings" element={<UserSettings />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <GlobalContextProvider>
        <JobsContextProvider>
          <Toaster position="top-right" reverseOrder={false} />

          <AppContent />
        </JobsContextProvider>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
