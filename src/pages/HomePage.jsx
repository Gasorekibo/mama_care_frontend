import { useEffect } from "react";
import Footer from "../components/Footer";
import { process } from "../utils/processes";
import HeroSection from "../components/HeroSection";
import HospitalCard from "../components/shared/HospitalCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllHospitalAction } from "../redux/slices/hospitalSlice";
import classname from "classnames";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { auth } = useSelector((state) => state.auth);
  const { hospitals, error, loading } = useSelector((state) => state.hospitals);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllHospitalAction());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection auth={auth} navigate={navigate} hospitals={hospitals} />

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {process.map((item, index) => (
            <div key={item.index} className="relative">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
              {index < process.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className={classname("py-20 bg-gray-100", { hidden: error || loading })}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Hospital Network
          </h2>

          {hospitals?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hospitals?.map((hospital) => (
                <div key={hospital.id}>
                  <HospitalCard hospital={hospital} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Medical Assistance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team of medical professionals is here to help you 24/7. Book an
            appointment or contact us for emergency services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(`/profile/${auth?.user?.id}/hospitals`)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Book Appointment
            </button>
            <button
              onClick={() => navigate(`/profile/${auth?.user?.id}/alerts`)}
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Emergency Contact
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
