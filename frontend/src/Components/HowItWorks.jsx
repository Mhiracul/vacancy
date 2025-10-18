import React from "react";
import DottedLine from "../assets/step1.svg"; // small dotted connector

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create Your Account",
      desc: "Sign up and set up your profile with your skills, experience, and career interests.",
    },
    {
      id: 2,
      title: "Search for Your Dream Job",
      desc: "Browse through thousands of job opportunities that match your profile and preferences.",
    },
    {
      id: 3,
      title: "Apply and Get Hired",
      desc: "Submit your applications, connect with recruiters, and land the job that fits you best.",
    },
  ];

  return (
    <section className="relative font-outfit bg-[#FFF] py-20 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A]">
          How It Works
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Follow these simple steps to find the perfect job and start your
          career journey with us.
        </p>
      </div>

      {/* Steps Section */}
      <div className="relative container mx-auto px-4 2xl:px-20 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
        {/* dotted connector 1 → 2 */}
        <img
          src={DottedLine}
          alt="Connector line"
          className="absolute hidden md:block top-[30%] left-[25%] w-[20%] pointer-events-none z-0"
        />

        {/* dotted connector 2 → 3 */}
        <img
          src={DottedLine}
          alt="Connector line"
          className="absolute hidden md:block top-[30%] left-[58%] w-[20%] pointer-events-none z-0"
        />

        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center max-w-xs mx-auto relative z-10"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#e8f1ff] text-[#0867bc] text-3xl font-bold mb-6">
              {step.id}
            </div>
            <h3 className="font-semibold text-lg text-[#0A0A0A] mb-3">
              {step.title}
            </h3>
            <p className="text-gray-500 text-sm">{step.desc}</p>

            {step.id === 2 && (
              <button className="mt-6 bg-[#0867bc] text-white px-5 py-2 rounded-md hover:bg-[#065a9c] transition">
                Start Searching
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
