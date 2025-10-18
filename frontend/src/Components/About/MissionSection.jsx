import React from "react";
import Image from "../../assets/svgimage.webp";

const MissionSection = () => {
  return (
    <section className="container mx-auto px-4 2xl:px-20 py-20 flex flex-col md:flex-row items-center gap-10">
      <div className="max-w-xl">
        <p className="text-blue-600 font-semibold mb-2">Our Mission</p>
        <h2 className="text-4xl font-bold mb-4">
          Empowering job seekers to reach their full potential.
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Our mission is to make the job search process simple, transparent, and
          rewarding. We connect passionate people with the right opportunities,
          helping them build meaningful careers and secure brighter futures.
        </p>
      </div>
      <img src={Image} alt="Mission Illustration" className="w-1/2" />
    </section>
  );
};

export default MissionSection;
