import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import JobListing from "../Components/JobListing";
import TrustedBy from "../Components/TrustedBy";
import HowItWorks from "../Components/HowItWorks";
import Footer from "../Components/Footer";
import ExperienceFilterPage from "./ExperienceFilterPage";

const Home = () => {
  return (
    <div className="font-outfit ">
      <Header />
      <Hero />
      <ExperienceFilterPage />
      <TrustedBy />

      <JobListing />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
