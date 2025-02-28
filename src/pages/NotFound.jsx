import { ArrowBigLeft, ArrowBigRight, FileQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  const goBack = () => navigate(-1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-lg p-8 text-center">
        <div className="mb-8 animate-bounce">
          <FileQuestion size={80} className="mx-auto text-indigo-500" />
        </div>

        <h1 className="relative text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse">
          404
        </h1>

        <div className="mt-4 space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The resource you are looking for might have been removed, had its
            name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={goBack}
            className="w-full sm:w-auto px-6 py-3 bg-white text-indigo-600 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 border border-indigo-100"
          >
            <ArrowBigLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>

          <button
            onClick={goHome}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Go Home</span>
            <ArrowBigRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 transform rotate-12" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-indigo-500 to-purple-500 transform -rotate-12" />
      </div>
    </div>
  );
};

export default NotFound;
