import React from "react";
import { Star } from "lucide-react";

const TestimonialSection = () => {
  return (
    <section className="relative bg-gray-50 py-20 overflow-hidden">
      <div className="container px-4 2xl:px-20 mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="relative z-10">
          <img
            src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51"
            alt="Happy job seeker"
            className="rounded-2xl w-full md:w-[400px] lg:w-[480px] h-[520px] object-cover shadow-lg"
          />
        </div>

        {/* Text content */}
        <div className="flex-1 md:pl-10">
          <p className="text-blue-600 font-semibold mb-2">Testimonials</p>
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>

          <div className="flex mb-4">
            {Array(5)
              .fill()
              .map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" />
              ))}
          </div>

          <p className="text-gray-700 italic mb-4">
            “This platform made my job search so much easier! I found a role
            that perfectly fits my skills and career goals within just a few
            weeks. The process was smooth, and I felt supported every step of
            the way.”
          </p>

          <p className="font-semibold">Sarah Johnson</p>
          <p className="text-sm text-gray-500">Marketing Specialist</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
