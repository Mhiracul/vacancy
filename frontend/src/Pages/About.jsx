// src/pages/About.jsx
import React from "react";
import AboutHero from "../Components/About/AboutHero";
import CompanyLogos from "../Components/About/CompanyLogos";
import TeamSection from "../Components/About/TeamSection";
import MissionSection from "../Components/About/MissionSection";
import TestimonialSection from "../Components/About/TestimonialSection";
import CTASection from "../Components/About/CTASection";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <div className="flex font-outfit flex-col gap-20">
      <Header />
      <AboutHero />
      <CompanyLogos />
      <TeamSection />
      <MissionSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
