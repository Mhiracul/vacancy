import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, ShieldCheck } from "lucide-react";
import BASE_URL from "../config";

const UserPayment = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    // Use hasPaid directly, not payment.userAccess
    setPaid(storedUser?.hasPaid === true);
  }, []);

  useEffect(() => {
    const checkPayment = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`${BASE_URL}/user/status/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Backend returns paymentStatus = "success"
        if (res.data.hasPaid && res.data.paymentStatus === "success") {
          setPaid(true);
        }
      } catch (err) {
        console.error("Payment status check failed:", err);
      }
    };
    checkPayment();
  }, [user?._id]);

  const handlePay = async () => {
    const token = localStorage.getItem("token");
    if (!user || !token) return alert("Please log in again.");

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/user/initiate`,
        { email: user.email, amount: 1500 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { authorization_url } = res.data;
      window.location.href = authorization_url;
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Unable to start payment. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-outfit p-10 bg-white rounded-2xl shadow">
      {!user ? (
        <p>Loading...</p>
      ) : paid ? (
        <>
          <ShieldCheck size={50} color="green" />
          <h2 className="text-xl font-semibold mt-3">Access Granted</h2>
          <p className="text-gray-500">You can now apply for jobs.</p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-3">
            Activate Your Jobseeker Access
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            To start applying for jobs, please make a one-time payment of{" "}
            <span className="font-semibold text-green-600">₦1,500</span>.
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
              "Pay ₦1,500 with Paystack"
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default UserPayment;
