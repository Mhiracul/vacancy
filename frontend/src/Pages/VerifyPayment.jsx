import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, ShieldCheck, XCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BASE_URL from "../config";

const VerifyPayment = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const recruiterId = searchParams.get("recruiterId");
      const reference = searchParams.get("reference");

      if (!recruiterId || !reference) {
        setStatus("invalid");
        setMessage("Invalid verification link");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${BASE_URL}/payment/recruiter/verify?recruiterId=${recruiterId}&reference=${reference}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setStatus("success");
          setMessage(
            "Payment verified successfully! Redirecting to your dashboard..."
          );
          setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          setStatus("failed");
          setMessage("Payment not successful. Please try again.");
        }
      } catch (err) {
        console.error("Payment verification failed", err);
        setStatus("failed");
        setMessage("Payment verification failed. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col font-outfit  items-center justify-center min-h-screen bg-gray-50 p-6">
      {loading ? (
        <>
          <Loader2 className="animate-spin text-blue-600" size={40} />
          <p className="mt-3 text-gray-700">Verifying your payment...</p>
        </>
      ) : status === "success" ? (
        <>
          <ShieldCheck className="text-green-600" size={60} />
          <h2 className="text-2xl font-semibold mt-4 text-green-700">
            Payment Successful
          </h2>
          <p className="mt-2 text-gray-600">{message}</p>
        </>
      ) : (
        <>
          <XCircle className="text-red-500" size={60} />
          <h2 className="text-2xl font-semibold mt-4 text-red-600">
            Payment Failed
          </h2>
          <p className="mt-2 text-gray-600">{message}</p>
          <button
            onClick={() => navigate(-1)} // ⬅️ go back to previous page
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

export default VerifyPayment;
