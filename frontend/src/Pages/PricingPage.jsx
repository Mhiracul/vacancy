import React from "react";
//import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import BASE_URL from "../config";

const PricingPage = () => {
  const handlePaystackPayment = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/user/payment/initialize`, {
        amount: 300 * 100, // kobo
      });
      const { authorization_url } = res.data;

      window.location.href = authorization_url;
    } catch (err) {
      toast.error("Failed to initialize payment");
      console.error(err);
    }
  };

  return (
    <>
      <Header />

      <div className="md:min-h-[80vh] font-outfit min-h-full px-4 py-4 flex justify-center items-center">
        <div className="h-full container max-w-2xl mx-auto py-20   rounded-2xl flex shadow-sm flex-col items-center justify-center">
          <h1 className="2xl:text-3xl text-lg font-bold mb-4">
            One-time Access Fee
          </h1>
          <p className="mb-6 2xl:text-base text-sm">
            Pay ₦1500 to apply for jobs on Vacancy.NG
          </p>
          <button
            className="bg-green-600 text-white 2xl:text-base text-sm 2xl:p-4 p-2 rounded"
            onClick={handlePaystackPayment}
          >
            Pay ₦1500
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
