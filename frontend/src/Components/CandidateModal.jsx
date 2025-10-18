import React from "react";
import {
  X,
  Mail,
  Calendar,
  Globe,
  User,
  Briefcase,
  BookOpen,
  MapPin,
  Phone,
  FileText,
  Download,
} from "lucide-react";
import {
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";

const CandidateModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-start overflow-y-auto py-6 sm:py-10 px-2 sm:px-4 z-50">
      <div className="bg-white shadow-xl w-full max-w-5xl relative overflow-hidden rounded-lg">
        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white shadow-md border border-gray-200 rounded-full p-2 text-gray-600 hover:bg-[#0867bc] hover:text-white transition-all"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ✅ Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 border-b border-gray-200 px-4 sm:px-8 py-6">
          <img
            src={
              candidate.profileImage ||
              "https://via.placeholder.com/100x100.png?text=User"
            }
            alt="Profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
          />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {`${candidate.firstName || ""} ${candidate.lastName || ""}`}
            </h2>
            <p className="text-sm text-gray-500">
              {candidate.profession || "Website Designer (UI/UX)"}
            </p>

            {/* Info Chips */}
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                <Calendar size={14} color="#0867bc" />
                <span>
                  {candidate.dob
                    ? new Date(candidate.dob).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                <Globe size={14} color="#0867bc" />
                <span>{candidate.nationality || "N/A"}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                <User size={14} color="#0867bc" />
                <span>{candidate.gender || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 sm:mt-0">
            <a
              href={`mailto:${candidate.email}`}
              className="flex items-center justify-center gap-2 border border-blue-200 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 text-sm font-medium transition"
            >
              <Mail size={16} /> Send Mail
            </a>
          </div>
        </div>

        {/* ✅ Body */}
        <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Biography */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 mb-3">
                Biography
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {candidate.bio ||
                  "I’ve been passionate about graphic design and digital art from an early age..."}
              </p>
            </section>

            {/* Cover Letter */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 mb-3">
                Cover Letter
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                {candidate.coverLetter || "No cover letter provided."}
              </div>
            </section>

            {/* Resume */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 mb-3">
                Resume
              </h3>
              {candidate.resume ? (
                <a
                  href={candidate.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded inline-flex gap-2 items-center text-sm hover:bg-blue-100 transition"
                >
                  View Resume <Download size={16} />
                </a>
              ) : (
                <p className="text-gray-500 text-sm">
                  No resume uploaded for this candidate.
                </p>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Stats */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Briefcase size={24} color="#0867bc" />
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Experience</div>
                    <div className="font-medium text-gray-800 text-sm">
                      {candidate.experience
                        ? `${candidate.experience} Years`
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <BookOpen size={24} color="#0867bc" />
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Education</div>
                    <div className="font-medium text-gray-800 text-sm">
                      {candidate.education || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Download */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-gray-800 mb-3">
                Download My Resume
              </h4>
              {candidate.resume ? (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText size={36} color="#d1d5dc" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">
                        {candidate.resumeName || "Resume.pdf"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {candidate.resumeSize || "Unknown Size"}
                      </div>
                    </div>
                  </div>
                  <a
                    href={candidate.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100 transition"
                  >
                    <Download size={18} />
                  </a>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No resume available.</p>
              )}
            </div>

            {/* Contact Info */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-sm text-gray-800 mb-3">
                Contact Information
              </h4>

              {[
                {
                  icon: <Mail size={18} color="#0867bc" />,
                  label: "Email",
                  value: candidate.email,
                },
                {
                  icon: <Phone size={18} color="#0867bc" />,
                  label: "Phone",
                  value: candidate.phone || "N/A",
                },
                {
                  icon: <MapPin size={18} color="#0867bc" />,
                  label: "Location",
                  value: candidate.location || "N/A",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                    <div className="font-medium text-gray-800 text-sm">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-gray-800 mb-3">
                Follow Me
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  BsFacebook,
                  BsTwitter,
                  BsLinkedin,
                  BsInstagram,
                  BsYoutube,
                ].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 text-[#0867bc] transition"
                  >
                    <Icon />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
