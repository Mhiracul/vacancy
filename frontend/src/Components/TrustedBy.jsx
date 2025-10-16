import React from "react";
import Microsoft from "../assets/microsoft.svg";
import Walmart from "../assets/walmart.svg";
import Accenture from "../assets/accenture.png";
import Samsung from "../assets/samsung.png";
import Amazon from "../assets/amazon.png";
import Adobe from "../assets/adobe.png";
const TrustedBy = () => {
  return (
    <div className="bg-white shadow-md  font-outfit  w-full text-gray-700 py-10">
      <div className="container mx-auto px-4 2xl:px-20 text-center">
        <p className="font-medium text-sm md:text-base mb-6">
          Used & Trusted by
        </p>
        <div className="flex flex-wrap  justify-between items-center gap-6 md:gap-10">
          <img className="h-6" src={Microsoft} alt="Microsoft" />
          <img className="h-6" src={Walmart} alt="Walmart" />
          <img className="h-6" src={Accenture} alt="Accenture" />
          <img className="h-6" src={Samsung} alt="Samsung" />
          <img className="h-6" src={Amazon} alt="Amazon" />
          <img className="h-6" src={Adobe} alt="Adobe" />
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
