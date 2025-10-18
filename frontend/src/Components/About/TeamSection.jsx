import React from "react";

const teamImages = [
  "https://images.unsplash.com/photo-1603415526960-f7e0328d1d22", // Left large
  "https://images.unsplash.com/photo-1595152772835-219674b2a8a6", // Top middle
  "https://images.unsplash.com/photo-1551836022-4c4c79ecde51", // Bottom middle
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", // Right large
];

const TeamSection = () => {
  return (
    <section className="container mx-auto px-4 2xl:px-20 py-20">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left large image */}
        <img
          src={teamImages[0]}
          alt="team-left"
          className="rounded-xl object-cover w-full h-[500px] shadow-md"
        />

        {/* Middle column with 2 stacked images */}
        <div className="flex flex-col gap-6">
          <img
            src={teamImages[1]}
            alt="team-middle-top"
            className="rounded-xl object-cover w-full h-[240px] shadow-md"
          />
          <img
            src={teamImages[2]}
            alt="team-middle-bottom"
            className="rounded-xl object-cover w-full h-[240px] shadow-md"
          />
        </div>

        {/* Right large image */}
        <img
          src={teamImages[3]}
          alt="team-right"
          className="rounded-xl object-cover w-full h-[500px] shadow-md"
        />
      </div>
    </section>
  );
};

export default TeamSection;
