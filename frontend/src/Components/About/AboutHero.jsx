import React from "react";
import { Briefcase, Building2, Users2 } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="container mx-auto px-4 2xl:px-20 py-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="max-w-xl">
          <p className="text-[#0867bc] font-semibold mb-2">Who We Are</p>
          <h2 className="text-4xl font-bold mb-4">
            Helping job seekers connect with their dream careers.
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We’re a passionate team dedicated to helping people find the right
            opportunities. Our mission is to make job hunting simple, fast, and
            effective — whether you’re just starting your career or looking to
            take the next step forward.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Stat icon={<Briefcase />} number="175,324" label="Available Jobs" />
          <Stat icon={<Building2 />} number="97,354" label="Top Companies" />
          <Stat
            icon={<Users2 />}
            number="3,847,154"
            label="Active Job Seekers"
          />
        </div>
      </div>
    </section>
  );
};

const Stat = ({ icon, number, label }) => (
  <div className="flex items-center gap-3">
    <div className="text-[#0867bc] text-lg bg-blue-50 px-4 py-3 rounded-sm">
      {icon}
    </div>
    <div>
      <p className="text-lg font-bold">{number}</p>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  </div>
);

export default AboutHero;
