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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-6xl shadow-2xl relative overflow-hidden max-h-full">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white shadow-md border border-gray-200 rounded-full p-2 text-gray-600 hover:bg-[#0867bc] hover:text-white transition-all"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* --- Header --- */}
        <div className="flex items-center gap-6 border-b border-gray-300 px-8 py-6">
          <img
            src={
              candidate.profileImage ||
              "https://via.placeholder.com/100x100.png?text=User"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-medium text-gray-800">
              {`${candidate.firstName || ""} ${candidate.lastName || ""}`}
            </h2>
            <p className="text-sm text-gray-500">
              {candidate.profession || "Website Designer (UI/UX)"}
            </p>

            {/* Info Chips */}
            <div className="mt-3 flex flex-wrap gap-3">
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
                <span>{candidate.gender || "Male"}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${candidate.email}`}
              className="flex items-center gap-2 border border-blue-200 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 text-sm font-medium"
            >
              <Mail size={16} /> Send Mail
            </a>
          </div>
        </div>

        {/* --- Body --- */}
        <div className="grid grid-cols-3 gap-8 px-8 py-6">
          {/* Left Content */}
          <div className="col-span-2 overflow-y-auto max-h-full pr-4">
            {/* Biography */}
            <section className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 mb-3">
                Biography
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {candidate.bio ||
                  "I’ve been passionate about graphic design and digital art from an early age..."}
              </p>
            </section>

            {/* Cover Letter */}
            <section className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 mb-3">
                Cover Letter
              </h3>
              <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 leading-relaxed">
                {candidate.coverLetter || "No cover letter provided."}
              </div>
            </section>

            {/* Resume */}
            <section>
              <h3 className="text-sm font-medium capitalize tracking-wide text-gray-800 mb-3">
                Resume
              </h3>
              {candidate.resume ? (
                <a
                  className="bg-blue-50 text-black px-3 text-sm py-1 rounded inline-flex gap-2 items-center"
                  href={candidate.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume <Download size={16} color="#0867bc" />
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
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center gap-3">
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

                <div className="flex flex-col items-center gap-3">
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

            {/* Download Resume */}
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <h4 className="font-medium text-sm text-gray-800 mb-3 capitalize">
                Download My Resume
              </h4>
              {candidate.resume ? (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText size={40} color="#d1d5dc" />
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
                    className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100"
                  >
                    <Download size={18} />
                  </a>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No resume available to download.
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-3 text-sm text-gray-700">
              <h4 className="font-medium text-sm text-gray-800 mb-3 capitalize">
                Contact Information
              </h4>

              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-1" color="#0867bc" />
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="font-medium text-gray-800 text-sm">
                    {candidate.email}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-1" color="#0867bc" />
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="font-medium text-gray-800 text-sm">
                    {candidate.phone || "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1" color="#0867bc" />
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="font-medium text-gray-800 text-sm">
                    {candidate.location || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-gray-800 mb-3 uppercase">
                Follow Me
              </h4>
              <div className="flex items-center gap-3">
                {[
                  BsFacebook,
                  BsTwitter,
                  BsLinkedin,
                  BsInstagram,
                  BsYoutube,
                ].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 flex items-center justify-center rounded bg-blue-50 hover:bg-blue-100 text-[#0867bc]"
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
