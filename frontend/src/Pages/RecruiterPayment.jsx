import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, ShieldCheck } from "lucide-react";
import BASE_URL from "../config";

const RecruiterPayment = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [paid, setPaid] = useState(false);

  // Load user info from localStorage

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setPaid(storedUser?.company?.paymentStatus === "paid");
  }, []);

  // Check payment status
  useEffect(() => {
    const checkPayment = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(
          `${BASE_URL}/payment/recruiter/status/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.paymentStatus === "paid") setPaid(true);
        console.log("Token being sent:", localStorage.getItem("token"));
      } catch (err) {
        console.error("Payment status check failed:", err);
      }
    };

    checkPayment();
  }, [user?._id]);

  const handlePay = async () => {
    const token = localStorage.getItem("token");
    if (!user || !token) {
      alert("Please log in again. Token missing.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/payment/recruiter/initiate`,
        {
          email: user.email,
          amount: 3000, // in Naira
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Token being sent:", localStorage.getItem("token"));

      console.log("Paystack response:", res.data);

      const { authorization_url } = res.data;
      if (!authorization_url) {
        alert("Payment initialization failed. Check console for details.");
        return;
      }

      window.location.href = authorization_url;
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Unable to start payment. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col font-outfit  items-center justify-center p-10 bg-white rounded-2xl shadow">
      {!user ? (
        <p className="text-gray-500">Loading user info...</p>
      ) : paid ? (
        <>
          <ShieldCheck size={50} color="green" />
          <h2 className="text-xl font-semibold mt-3">Payment Verified</h2>
          <p className="text-gray-500 mt-1 text-center">
            You can now access your recruiter dashboard and post jobs.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-3">
            Activate Your Recruiter Account
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            To start posting jobs, please make a one-time payment of{" "}
            <span className="font-semibold text-green-600">₦3,000</span>.
          </p>

          <button
            disabled={loading}
            onClick={handlePay}
            className="bg-[#0867bc] hover:bg-[#065a9b] text-white px-6 py-3 rounded-lg flex items-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />{" "}
                Processing...
              </>
            ) : (
              "Pay ₦3,000 with Paystack"
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default RecruiterPayment;
