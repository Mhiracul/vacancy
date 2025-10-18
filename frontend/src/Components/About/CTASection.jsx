import React from "react";

const CTASection = () => {
  return (
    <section className="container mx-auto px-4 2xl:px-20 py-20 grid md:grid-cols-2 gap-8">
      {/* Candidate CTA */}
      <div className="bg-gray-100 p-10 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Become a Candidate</h3>
        <p className="text-gray-600 mb-6">
          Create your free account and start applying for jobs that match your
          skills and goals. Take the next step in your career today!
        </p>
        <button className="bg-[#0867bc] text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          Register Now
        </button>
      </div>

      {/* Employer CTA */}
      <div className="bg-[#0867bc] text-white p-10 rounded-2xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Become an Employer</h3>
        <p className="mb-6 opacity-90">
          Join thousands of companies hiring top talent. Post your jobs, review
          applicants, and find the perfect fit for your team with ease.
        </p>
        <button className="bg-white text-[#0867bc] px-6 py-2 rounded-xl hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default CTASection;
