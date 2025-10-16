import React from "react";
import Logo from "../assets/Logoo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#FFF] font-outfit text-gray-700 pt-20 pb-10 border-t border-gray-200">
      <div className="container px-4 2xl:px-20 mx-auto">
        {/* Newsletter + Stats (Side by Side) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          {/* Newsletter input (Left) */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Get the latest job updates and career tips directly to your inbox.
            </p>
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 outline-none text-sm"
              />
              <button className="bg-[#0867bc] text-white px-6 py-2 text-sm font-medium hover:bg-[#065a9b]">
                Subscribe
              </button>
            </div>
          </div>

          {/* Stats (Right) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-start md:text-right w-full md:w-2/5">
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-[#0867bc]">
                12K
              </h3>
              <p className="md:text-sm text-xs mt-1 text-gray-600">
                Job Posted
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-[#0867bc]">
                10M
              </h3>
              <p className="md:text-sm text-xs mt-1 text-gray-600">
                Happy Customers
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-[#0867bc]">
                76K
              </h3>
              <p className="md:text-sm text-xs mt-1 text-gray-600">
                Freelancers
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-[#0867bc]">
                200+
              </h3>
              <p className="md:text-sm text-xs mt-1 text-gray-600">Companies</p>
            </div>
          </div>
        </div>

        {/* Footer links section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo and description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={Logo} alt="logo" className="h-12" />
              <h2 className="text-xl font-semibold text-[#0A0A0A]">
                Vacancy.NG
              </h2>
            </div>
            <p className="text-xs text-start text-gray-500">
              Connecting the best talent with top companies. Start your journey
              today.
            </p>
          </div>

          {/* Column 1: For Clients */}
          <div>
            <h4 className="font-semibold text-[#0A0A0A] mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Free Business tools</li>
              <li>Affiliate Program</li>
              <li>Success Stories</li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="font-semibold text-[#0A0A0A] mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help & Support</li>
              <li>Our Resources</li>
              <li>Upwork Reviews</li>
            </ul>
          </div>

          {/* Column 3: The Company */}
          <div>
            <h4 className="font-semibold text-[#0A0A0A] mb-4">The Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Leadership</li>
              <li>Contact Us</li>
              <li>Investor Relations</li>
              <li>Trust, Safety & Security</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-200 pt-6">
        © {new Date().getFullYear()} Vacancy.NG. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
