import { Baby, Brain, Droplet, Heart } from "lucide-react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function PregnantWomanHeader() {
  const {
    users: { pregnancyHealthRecords },
  } = useSelector((state) => state.users);
  const healthRecord = pregnancyHealthRecords?.[0];
  if (!healthRecord) {
    return <div></div>;
  }
  return (
    <Fragment>
      {healthRecord && (
        <div className=" mt-4 md:mt-0 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="hidden md:block p-3 bg-red-100 rounded-lg">
                <Heart className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Fetal Heart Rate</p>
                <h3 className="text-2xl font-bold">
                  {healthRecord?.fetalHeartRate} BPM
                </h3>
                <p className="text-sm text-gray-500">Normal Range: 120-160</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="hidden md:block p-3 bg-blue-100 rounded-lg">
                <Droplet className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Blood Sugar</p>
                <h3 className="text-2xl font-bold">
                  {healthRecord?.bloodSugar?.fasting} mg/dL
                </h3>
                <p className="text-sm text-gray-500">Fasting</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="hidden md:block p-3 bg-purple-100 rounded-lg">
                <Baby className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Fetal Movements</p>
                <h3 className="text-2xl font-bold">
                  {healthRecord?.fetalMovements} kicks
                </h3>
                <p className="text-sm text-gray-500">Last 2 hours</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="hidden md:block p-3 bg-orange-100 rounded-lg">
                <Brain className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Mood</p>
                <h3 className="text-lg font-bold">{healthRecord?.mood}</h3>
                <p className="text-sm text-gray-500">Trending Positive</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default PregnantWomanHeader;
