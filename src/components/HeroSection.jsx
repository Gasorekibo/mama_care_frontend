/* eslint-disable react/prop-types */
import { Carousel } from "flowbite-react";
import classNames from "classnames";
const HeroSection = ({ auth, navigate, hospitals }) => {
  return (
    <div className="relative">
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-800/70 z-10" />
        <Carousel pauseOnHover slide={true} interval={3000} className="h-full">
          <img
            src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Hospital exterior"
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.pexels.com/photos/634030/pexels-photo-634030.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Medical equipment"
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Doctor consultation"
            className="w-full h-full object-cover"
          />
        </Carousel>

        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white px-4">
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-300">MamaCare</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Your trusted partner in healthcare, providing comprehensive
              medical services with compassion and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                Book Appointment
              </button>
              <button
                disabled={auth?.user?.role === "HOSPITAL" ? true : false}
                onClick={() =>
                  navigate(`/profile/${auth?.user?.id}/nearest-hospital`)
                }
                className={classNames(
                  auth?.user?.role === "HOSPITAL"
                    ? "cursor-not-allowed"
                    : "cursor-pointer",
                  "border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors"
                )}
              >
                Find Nearest Hospital
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: hospitals?.length + "+", label: "Hospital Registered" },
            { number: "500+", label: "Happy Patients" },
            { number: "1+", label: "Years Experience" },
            { number: "24/7", label: "Emergency Care" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:-translate-y-1 transition-transform"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
