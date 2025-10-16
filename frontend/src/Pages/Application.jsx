import React, { useState } from "react";
import Header from "../Components/Header";
import { CloudUpload } from "lucide-react";
import { jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../Components/Footer";

const Application = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  return (
    <div>
      <Header />
      <div className="container font-outfit  min-h-[65vh] mx-auto px-4 2xl:px-20 my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              {" "}
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  Select Resume
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  className="hidden"
                  type="file"
                />
                <div className="bg-blue-700 rounded-lg p-3 hover:bg-blue-800 transition">
                  <CloudUpload color="#fff" strokeWidth={1} />{" "}
                </div>
              </label>{" "}
              <button
                onClick={(e) => setIsEdit(false)}
                className="bg-green-100 border border-green-400 px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href=""
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg py-2 px-4"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl mb-4 font-semibold">Job Applied</h2>
        <table className="rounded-lg text-sm min-w-full bg-white border-[#d3d3d3] border ">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-[#d3d3d3] text-left">
                Company
              </th>
              <th className="py-3 px-4 border-b border-[#d3d3d3] text-left">
                Job Title
              </th>
              <th className="py-3 px-4 border-b border-[#d3d3d3] text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b border-[#d3d3d3] text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b border-[#d3d3d3] text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {jobsApplied.map((job, index) =>
              true ? (
                <tr>
                  <td className="py-3 px-4 flex items-center gap-2 border-[#d3d3d3] border-b">
                    <img
                      className="md:w-8 md:h-8 w-4 h-4"
                      src={job.image}
                      alt=""
                    />
                    {job.company}
                  </td>
                  <td className="py-2 px-4 border-b border-[#d3d3d3]">
                    {job.title}
                  </td>
                  <td className="py-2 px-4 border-b border-[#d3d3d3] max-sm:hidden">
                    {job.location}{" "}
                  </td>
                  <td className="py-2 px-4 border-b border-[#d3d3d3] max-sm:hidden">
                    {moment(job.date).format("ll")}{" "}
                  </td>
                  <td className="py-2 px-4 border-b border-[#d3d3d3]">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-100"
                          : job.status === "Rejected"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>

        {/* {resume && (. */}
        {/*  <p className="text-sm text-gray-500 mt-2">Uploaded: {resume.name}</p> */}
        {/*    */}
      </div>
      <Footer />
    </div>
  );
};

export default Application;
