/* eslint-disable react/prop-types */
import { Carousel } from "flowbite-react";
import { testimonials } from "../../lib/constant";

function Testimonial() {
  // Create paired testimonials for showing two at a time
  const pairedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    pairedTestimonials.push([
      testimonials[i],
      testimonials[i + 1] || null, // Handle odd number of testimonials
    ]);
  }

  const getBadgeText = (type) => {
    switch (type) {
      case "hospital":
        return "Hospital Staff";
      case "pregnant-woman":
        return "Patient";
      case "community-health-worker":
        return "Health Worker";
      default:
        return type;
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "hospital":
        return "bg-blue-100 text-blue-800";
      case "pregnant-woman":
        return "bg-pink-100 text-pink-800";
      case "community-health-worker":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Single testimonial card component - maintains your original styling

  const TestimonialCard = ({ testimonial }) => {
    if (!testimonial) return null;

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
        <div className="md:flex h-full">
          <div className="md:shrink-0 flex items-center justify-center p-4 md:p-6">
            <div className="h-24 w-24 md:h-28 md:w-28 relative">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {/* This would be an actual image in production */}
                <span className="text-3xl text-gray-400">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <span
                className={`absolute bottom-0 right-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(
                  testimonial.type
                )}`}
              >
                {getBadgeText(testimonial.type)}
              </span>
            </div>
          </div>
          <div className="p-4 md:p-6 md:flex-1 flex flex-col justify-center">
            <div className="text-blue-600 mb-2">
              <svg
                className="h-5 w-5 inline-block mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
              </svg>
            </div>
            <p className="text-gray-700 text-sm md:text-base mb-4 italic">
              {testimonial.content}
            </p>
            <div>
              <p className="text-gray-900 font-bold">{testimonial.name}</p>
              <p className="text-gray-600 text-xs md:text-sm">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          What People Are Saying
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Discover how our platform is making healthcare more accessible and
          efficient for hospitals, patients, and community health workers.
        </p>

        <div className="h-96 sm:h-96 xl:h-80 2xl:h-96">
          <Carousel slide={true} indicators={true} pauseOnHover interval={6000}>
            {pairedTestimonials.map((pair, index) => (
              <div
                key={index}
                className="flex h-full items-center justify-center p-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl">
                  {pair.map(
                    (testimonial) =>
                      testimonial && (
                        <div key={testimonial.id} className="h-full">
                          <TestimonialCard testimonial={testimonial} />
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
