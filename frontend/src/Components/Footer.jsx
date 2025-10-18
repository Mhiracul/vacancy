import React from "react";
import Logo from "../assets/Logoo.svg";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 font-outfit pt-20 pb-10 border-t border-gray-200">
      <div className="container mx-auto px-4 2xl:px-20">
        {/* Top Section - Newsletter + Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          {/* Newsletter */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">
              Stay Updated with Job Alerts
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Subscribe to get the latest job openings, career tips, and hiring
              insights delivered to your inbox.
            </p>
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 outline-none text-sm"
              />
              <button className="bg-[#0867bc] text-white px-6 py-2 text-sm font-medium hover:bg-[#065a9b] transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-start md:text-right w-full md:w-2/5">
            {[
              { value: "15K+", label: "Jobs Posted" },
              { value: "1.2M+", label: "Registered Users" },
              { value: "500+", label: "Hiring Companies" },
              { value: "98%", label: "Success Rate" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0867bc]">
                  {stat.value}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={Logo} alt="Vacancy.NG logo" className="h-10" />
              <h2 className="text-xl font-semibold text-[#0A0A0A]">
                Vacancy.NG
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Empowering job seekers and employers with the right tools to
              connect, grow, and succeed in today’s digital world.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-[#0867bc]">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#0867bc]">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#0867bc]">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#0867bc]">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="font-semibold text-[#0A0A0A] mb-4">Job Seekers</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Find Jobs</li>
              <li>Upload Resume</li>
              <li>Career Advice</li>
              <li>Job Alerts</li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="font-semibold text-[#0A0A0A] mb-4">Employers</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Post a Job</li>
              <li>Search Resumes</li>
              <li>Employer Dashboard</li>
              <li>Recruitment Tips</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#0A0A0A] mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@vacancy.ng
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +234 801 234 5678
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container px-4 2xl:px-20 mx-auto">
        <ul className="  flex items-center justify-between text-sm text-gray-600">
          <li className="">About Us</li>
          <li className="">Terms</li>
          <li className="">Privacy</li>
          <li className="">CV Review Service</li>
        </ul>
      </div>
      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-200 pt-6">
        © {new Date().getFullYear()} Vacancy.NG — Connecting People with
        Opportunities.
      </div>
    </footer>
  );
};

export default Footer;
