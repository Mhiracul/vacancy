import React, { useEffect, useState } from "react";
import { FaStar, FaUsers, FaClock } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  // Simulate fetching from Udemy/Coursera API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Example for Udemy:
        // const response = await fetch("https://www.udemy.com/api-2.0/courses/?page_size=6", {
        //   headers: { Authorization: `Bearer YOUR_UDEMY_API_KEY` },
        // });
        // const data = await response.json();
        // setCourses(data.results);

        // Temporary static data (replace with API data)
        const sampleCourses = [
          {
            id: 1,
            title: "Entrepreneurship and Small Business Course",
            image:
              "https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg",
            students: 119,
            duration: "3h",
            platform: "Jobberman",
            price: "FREE",
            date: "2025-10-25 17:00:00",
            reviews: "No reviews yet",
          },
          {
            id: 2,
            title: "Soft Skills Training",
            image:
              "https://img-c.udemycdn.com/course/480x270/2365628_0b60_2.jpg",
            students: 178,
            duration: "3h",
            platform: "Jobberman",
            price: "FREE",
            date: "2025-10-18 17:00:00",
            reviews: "No reviews yet",
          },
          {
            id: 3,
            title: "Global Gig Work Mastery Course",
            image:
              "https://img-c.udemycdn.com/course/480x270/5678286_9f03_3.jpg",
            students: 312,
            duration: "3h",
            platform: "Jobberman",
            price: "FREE",
            date: "2025-10-29 17:00:00",
            reviews: "No reviews yet",
          },
        ];
        setCourses(sampleCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen ">
        <div className="  py-8 container mx-auto  px-4 2xl:px-20">
          {" "}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              All Courses
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
              <select className="border border-gray-300 text-sm rounded-md px-3 py-2">
                <option>Platform</option>
                <option>Udemy</option>
                <option>Coursera</option>
              </select>
              <select className="border border-gray-300 text-sm rounded-md px-3 py-2">
                <option>Language</option>
                <option>English</option>
                <option>French</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 text-sm rounded-md px-3 py-2 w-48"
              />
              <select className="border border-gray-300 text-sm rounded-md px-3 py-2">
                <option>Sort By</option>
                <option>Newest</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                    {course.price}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-gray-800 line-clamp-2">
                    {course.platform} {course.title} ({course.date})
                  </h3>

                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <FaStar className="text-yellow-500 mr-1" />
                    {course.reviews}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button className="bg-[#0867bc] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#065a9b]">
                      View
                    </button>
                  </div>

                  <div className="flex justify-between text-gray-500 text-xs mt-4 border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1">
                      <FaUsers /> {course.students} Students
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock /> {course.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesPage;
