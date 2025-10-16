import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { JobsContext } from "../context/jobContext";
import { toast } from "react-hot-toast";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import BASE_URL from "../config";

const PaymentVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(JobsContext);
  const [status, setStatus] = useState("verifying"); // verifying | success | failed

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const reference = params.get("reference");

      if (!reference) {
        setStatus("failed");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${BASE_URL}/user/payment/verify/${reference}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.ok) {
          setStatus("success");
          toast.success(res.data.message);

          // Refresh user info to update hasPaid
          const userRes = await axios.get(`${BASE_URL}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userRes.data.user);

          setTimeout(() => navigate("/jobs"), 3000);
        } else {
          setStatus("failed");
          toast.error(res.data.message);
          setTimeout(() => navigate("/pricing"), 3000);
        }
      } catch (err) {
        console.error(err);
        setStatus("failed");
        toast.error("Payment verification failed");
        setTimeout(() => navigate("/pricing"), 3000);
      }
    };

    verifyPayment();
  }, [location, navigate, setUser]);

  const renderContent = () => {
    if (status === "verifying") {
      return (
        <div className="flex flex-col  items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-blue-600 w-16 h-16" />
          <p className="text-lg text-gray-700">Verifying your payment...</p>
        </div>
      );
    } else if (status === "success") {
      return (
        <div className="flex flex-col items-center justify-center space-y-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
          <h2 className="text-2xl font-semibold text-green-700">
            Payment Successful!
          </h2>
          <p className="text-gray-700">Redirecting you to the jobs page...</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center space-y-4">
          <XCircle className="text-red-500 w-16 h-16" />
          <h2 className="text-2xl font-semibold text-red-700">
            Payment Failed
          </h2>
          <p className="text-gray-700">
            Redirecting you back to the pricing page...
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen font-outfit  flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md text-center">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentVerify;
