import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const ProfilePage = () => {
  const user = {
    name: "Okeke Miracle",
    title: "Graphic design and web design",
    experience: "1 year",
    availability: "Immediately",
    location: "Imo",
    about:
      "I, (Okeke Miracle) am a visionary and fascinating young woman who is passionate for development, progress and advancement anywhere I am given opportunity to serve. I am apt, humble and inquisitive to learning and personal improvement. I am of the opinion that personal development is the key to success.",
    profileCompletion: 100,
    education: [
      {
        institution: "National Open University of Nigeria",
        degree: "B.Sc Computer Science",
        period: "October 2020 - Current",
      },
    ],
    skills: ["Graphic Design", "Web Design", "UI/UX Design"],
    associations: [],
    certificates: [
      { title: "Completion of JavaScript", year: "2022" },
      { title: "Completion of DOMINION CITY ACADEMY", year: "2021" },
      { title: "Certificate in ICT", year: "2019" },
    ],
    languages: [{ name: "English", level: "Professional working proficiency" }],
    coverLetter:
      "I would love to apply for this job because I know I am very much capable for this job and I am confident in pulling through with it.",
    cv: {
      name: "MIRACL resume.pdf",
      uploaded: "Jul 28, 2022",
    },
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 font-outfit  min-h-screen ">
        <div className="  py-8 container mx-auto  px-4 2xl:px-20">
          {/* Header Section */}
          <div className="bg-gradient-to-b from-blue-700 to-blue-500 rounded-t-lg shadow">
            <div className="flex flex-col items-center py-10 text-white">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover mb-4"
              />
              <h2 className="text-xl md:text-2xl font-semibold">{user.name}</h2>
              <p className="text-blue-100 text-sm mt-1">{user.title}</p>
              <p className="text-blue-100 text-xs mt-2">
                Experience: {user.experience} | Availability:{" "}
                {user.availability} | Location: {user.location}
              </p>
            </div>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* LEFT SIDE */}
            <div className="col-span-2 space-y-6">
              {/* Employment */}
              <Section title="Employment & Availability" buttonText="UPDATE">
                <p className="text-sm text-gray-600">
                  Keeping this section up to date will help employers &
                  recruiters find you. They will know your field, preferred
                  industries, and availability.
                </p>
              </Section>

              {/* About Me */}
              <Section title="About Me">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {user.about}
                </p>
              </Section>

              {/* Education */}
              <Section title="Education" buttonText="Add">
                {user.education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold text-gray-800">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-600">
                      {edu.degree} | {edu.period}
                    </p>
                  </div>
                ))}
                <button className="text-blue-600 text-sm font-semibold mt-2">
                  VIEW ALL
                </button>
              </Section>

              {/* Job Skills */}
              <Section title="Job Skills" buttonText="Add">
                <p className="text-sm text-gray-700">
                  What are your areas of expertise?
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                  {user.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </Section>

              {/* Associations */}
              <Section title="Associations" buttonText="Add">
                <p className="text-sm text-gray-600">
                  Part of a professional association or organization? Add them
                  to help enrich your professional profile.
                </p>
              </Section>

              {/* Certificates */}
              <Section title="Certificates & Awards" buttonText="Add">
                {user.certificates.map((cert, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold text-gray-800">
                      {cert.title}{" "}
                      <span className="text-gray-500">| {cert.year}</span>
                    </p>
                  </div>
                ))}
                <button className="text-blue-600 text-sm font-semibold mt-2">
                  VIEW ALL
                </button>
              </Section>

              {/* Language */}
              <Section title="Language Skills" buttonText="Add">
                {user.languages.map((lang, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-semibold text-gray-800">{lang.name}</p>
                    <p className="text-sm text-gray-600">{lang.level}</p>
                  </div>
                ))}
                <button className="text-blue-600 text-sm font-semibold mt-2">
                  VIEW ALL
                </button>
              </Section>

              {/* Cover Letter */}
              <Section title="Cover Letter" buttonText="Edit">
                <p className="text-sm text-gray-700">{user.coverLetter}</p>
              </Section>

              {/* CV */}
              <Section title="CV" buttonText="Add">
                <p className="text-sm text-gray-800 font-semibold">
                  {user.cv.name}
                </p>
                <p className="text-xs text-gray-500">
                  Uploaded {user.cv.uploaded}
                </p>
                <button className="text-blue-600 text-sm font-semibold mt-2">
                  View
                </button>
              </Section>

              {/* Projects */}
              <Section title="Projects & Portfolio" buttonText="Add">
                <p className="text-sm text-gray-600">
                  Add links to your online projects and portfolios or sites such
                  as LinkedIn.
                </p>
              </Section>

              {/* Download Profile */}
              <Section title="Download your Profile as a CV">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Completing your Career Profile makes it easier for employers
                  to find you and will also be sent to employers & recruiters
                  when you apply for a job. Keep it up to date!
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <p className="text-blue-700 text-sm font-medium">
                    Your Career Profile is ready to be downloaded.
                  </p>
                </div>
              </Section>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="bg-white rounded-lg shadow p-6 h-fit">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative w-28 h-28 mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="#0867bc"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${user.profileCompletion * 3.14}, 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-semibold text-lg text-[#0867bc]">
                    {user.profileCompletion}%
                  </span>
                </div>
                <p className="text-[#0867bc] text-sm font-semibold">
                  You've Unlocked Jobberman Plus
                </p>
                <button className="text-blue-600 text-xs font-medium mt-1 hover:underline">
                  Activate Your Boost
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Helper section component
const Section = ({ title, buttonText, children }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center border-b pb-3 mb-3">
      <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
      {buttonText && (
        <button className="text-sm text-[#0867bc] font-semibold">
          {buttonText}
        </button>
      )}
    </div>
    {children}
  </div>
);

export default ProfilePage;
