import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const sections = [
  {
    id: "terms",
    title: "01. Terms & Conditions",
    content: [
      "Welcome to our platform. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our services.",
      "Our platform provides a space for job seekers to find employment opportunities and for employers to connect with potential candidates. By registering, you agree that all information you provide is accurate and up to date.",
      "We reserve the right to update or modify these terms at any time without prior notice. Continued use of the platform after such changes constitutes your acceptance of the new terms.",
      "You agree not to use the site for any unlawful purpose or in a way that could harm our reputation, system, or other users.",
      "All content on this site, including logos, graphics, and text, is owned by or licensed to us and may not be copied or reused without permission.",
    ],
  },
  {
    id: "limitations",
    title: "02. Limitations",
    content: [
      "We strive to maintain the accuracy and reliability of all job listings and company information, but we cannot guarantee that every post is current or error-free.",
      "We are not responsible for any losses or damages that may result from your use of the platform, including job offers, application outcomes, or employer actions.",
      "Job seekers are advised to verify any job opportunity and avoid sharing sensitive personal or financial information with unverified employers.",
      "Employers are responsible for ensuring that all job postings comply with local labor laws and do not contain false or misleading information.",
    ],
  },
  {
    id: "security",
    title: "03. Security",
    content: [
      "We take user data protection seriously. All sensitive information, such as passwords, is securely encrypted to prevent unauthorized access.",
      "However, no online platform can guarantee complete security. Users are encouraged to use strong passwords and avoid sharing login details with others.",
      "If you suspect any unauthorized access or data breach, please contact our support team immediately.",
    ],
  },
  {
    id: "privacy",
    title: "04. Privacy Policy",
    content: [
      "Your privacy is important to us. We collect only the information necessary to provide our services effectively, such as your name, email, and profile details.",
      "We do not sell or share your personal data with third parties without your consent, except as required by law or to deliver essential platform features.",
      "Cookies may be used to improve your browsing experience and personalize job recommendations. You can disable cookies in your browser settings at any time.",
      "By using our platform, you consent to our collection and use of your data in accordance with this Privacy Policy.",
      "If you wish to update or delete your account, you can do so in your profile settings or by contacting our support team.",
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto px-4 md:px-10 lg:px-20 py-20 flex flex-col md:flex-row gap-12">
        {/* Left - Main content */}
        <div className="flex-1">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="mb-16 scroll-mt-24"
            >
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              {section.content.map((text, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Right - Sidebar */}
        <aside className="w-full md:w-1/4 lg:w-1/5 top-24 h-fit border-l border-gray-200 p-6">
          <h3 className="text-gray-800 font-semibold mb-4">
            TABLE OF CONTENTS
          </h3>
          <ul className="space-y-3 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
