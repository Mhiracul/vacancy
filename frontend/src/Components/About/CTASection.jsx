import React from "react";
import BG1 from "../../assets/CTA2.svg";
import BG2 from "../../assets/CTA1.svg";

const CTASection = () => {
  return (
    <section className="container mx-auto px-4 2xl:px-20 py-20 grid md:grid-cols-2 gap-8">
      {/* Candidate CTA */}
      <div
        className="relative py-12 px-8 rounded-2xl shadow-md overflow-hidden group text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${BG1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10">
          <h3 className="text-2xl font-semibold mb-4 text-black">
            Become a Candidate
          </h3>
          <p className="opacity-90 max-w-sm mb-6 text-gray-500">
            Create your free account and start applying for jobs that match your
            skills and goals. Take the next step in your career today!
          </p>
          <button className="bg-white text-[#0867bc] px-6 py-2 rounded-xl hover:bg-gray-100 transition">
            Register Now
          </button>
        </div>
      </div>

      {/* Employer CTA */}
      <div
        className="relative py-12 px-8 rounded-2xl shadow-md overflow-hidden group text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url(${BG2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10">
          <h3 className="text-2xl font-semibold mb-4">Become an Employer</h3>
          <p className="opacity-90 max-w-sm mb-6">
            Join thousands of companies hiring top talent. Post your jobs,
            review applicants, and find the perfect fit for your team with ease.
          </p>
          <button className="bg-white text-[#0867bc] px-6 py-2 rounded-xl hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
