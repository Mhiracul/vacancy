import React from "react";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/99/IEEE_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Nio_logo.svg",
];

const CompanyLogos = () => {
  return (
    <section className="container mx-auto w-full px-4 2xl:px-20 py-10">
      <div className="flex items-center justify-between flex-wrap gap-10 opacity-70">
        {logos.map((logo, idx) => (
          <img key={idx} src={logo} alt="company logo" className="h-10" />
        ))}
      </div>
    </section>
  );
};

export default CompanyLogos;
