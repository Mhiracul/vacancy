import React from "react";
import { X, Globe, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const RecruiterModal = ({ recruiter, onClose }) => {
  if (!recruiter) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-start overflow-y-auto py-6 sm:py-10 px-2 sm:px-4">
      <div className="bg-white shadow-xl w-full max-w-3xl relative overflow-y-auto rounded-lg">
        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white shadow-md border border-gray-200 rounded-full p-2 text-gray-600 hover:bg-[#0867bc] hover:text-white transition-all"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ✅ Banner */}
        <div className="relative h-40 sm:h-52 bg-gray-100">
          <img
            src={
              recruiter.companyBanner || "https://via.placeholder.com/800x200"
            }
            alt="Banner"
            className="w-full h-full object-cover"
          />

          {/* ✅ Logo + Company Info */}
          <div className="absolute -bottom-12 sm:-bottom-14 left-0 right-0 px-4 sm:px-8">
            <div className="flex items-center gap-4 bg-white rounded-t-lg p-4 shadow-sm">
              <img
                src={recruiter.companyLogo || "https://via.placeholder.com/100"}
                alt="Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-4 border-white shadow-md object-cover"
              />
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {recruiter.companyName}
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {recruiter.industry}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Body */}
        <div className="p-4 sm:p-8 pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <section>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                About Us
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {recruiter.about ||
                  "This company specializes in innovative solutions in tech and digital products."}
              </p>
            </section>

            {/* Vision */}
            <section>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                Company Vision
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {recruiter.vision ||
                  "Our mission is to empower businesses and individuals through technology and creativity."}
              </p>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="border border-gray-200 rounded-lg p-5 space-y-3">
              <h4 className="font-semibold text-gray-800 mb-2">
                Contact Information
              </h4>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                <Globe className="w-4 h-4 text-[#0867bc]" />
                <a
                  href={recruiter.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-all"
                >
                  {recruiter.website || "No website provided"}
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                <Phone className="w-4 h-4 text-[#0867bc]" />
                <span>{recruiter.phone || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                <Mail className="w-4 h-4 text-[#0867bc]" />
                <span className="break-all">{recruiter.email || "N/A"}</span>
              </div>
            </div>

            {/* Social */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">Follow Us On</h4>
              <div className="flex flex-wrap gap-3">
                {recruiter.socialLinks?.facebook && (
                  <a
                    href={recruiter.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e7f1fd] text-[#0867bc] w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#dceafd]"
                  >
                    <FaFacebookF className="text-lg" />
                  </a>
                )}
                {recruiter.socialLinks?.instagram && (
                  <a
                    href={recruiter.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e7f1fd] text-[#0867bc] w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#dceafd]"
                  >
                    <FaInstagram className="text-lg" />
                  </a>
                )}
                {recruiter.socialLinks?.youtube && (
                  <a
                    href={recruiter.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e7f1fd] text-[#0867bc] w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#dceafd]"
                  >
                    <FaYoutube className="text-lg" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterModal;
