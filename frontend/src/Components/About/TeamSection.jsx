import React from "react";
import BG1 from "../../assets/1.svg";
import BG2 from "../../assets/2.svg";
import BG3 from "../../assets/3.svg";
import BG4 from "../../assets/4.svg";
const teamImages = [
  "https://images.unsplash.com/photo-1603415526960-f7e0328d1d22", // Left large
  BG4,
  BG3,
  BG2,
  BG1,
];

const TeamSection = () => {
  return (
    <section className="container mx-auto px-4 2xl:px-20 py-20">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left large image */}
        <img
          src={teamImages[4]}
          alt="team-left"
          className="rounded-xl object-cover w-full  shadow-md"
        />

        {/* Middle column with 2 stacked images */}
        <div className="flex flex-col gap-6">
          <img
            src={teamImages[1]}
            alt="team-middle-top"
            className="rounded-xl object-cover w-full  shadow-md"
          />
          <img
            src={teamImages[2]}
            alt="team-middle-bottom"
            className="rounded-xl object-cover w-full  shadow-md"
          />
        </div>

        {/* Right large image */}
        <img
          src={teamImages[3]}
          alt="team-right"
          className="rounded-xl object-cover w-full  shadow-md"
        />
      </div>
    </section>
  );
};

export default TeamSection;
