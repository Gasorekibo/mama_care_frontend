import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findNearByHospitalAction } from "../../../redux/slices/hospitalSlice";
import toast from "react-hot-toast";
import HospitalCard from "./NearestHospitalCard";
import getLocation from "../../../lib/helpers/getLocation";
import FormInput from "../../shared/InputText";
import { useForm } from "react-hook-form";

function NearestHospital() {
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const { handleSubmit, control } = useForm({
    defaultValues: {
      latitude: "",
      longitude: "",
      maxDistance: "",
    },
  });
  const onSubmit = async (data) => {
    let dataToSend = {};
    try {
      if (!data.latitude || !data.longitude) {
        dataToSend = {
          ...data,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        };
      } else {
        dataToSend = {
          ...data,
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        };
      }
      await dispatch(findNearByHospitalAction(dataToSend));
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const { nearByHospitals, error } = useSelector((state) => state.hospitals);

  useEffect(() => {
    async function getUserLocation() {
      try {
        const { latitude, longitude } = await getLocation();
        setUserLocation({ latitude, longitude });
      } catch (error) {
        toast.error(error);
      }
    }
    getUserLocation();
  }, [dispatch]);
  if (error) return toast.error(error?.message);
  return (
    <div className="md:grid md:grid-cols-4 md:col-span-1">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="shadow p-2">
        <h2 className="text-lg font-semibold mb-4 text-blue-700">
          Find Nearest Hospitals
        </h2>
        <FormInput
          name="latitude"
          label="Latitude"
          type="number"
          placeholder="Enter latitude"
          control={control}
        />
        <FormInput
          name="longitude"
          label="longitude"
          type="number"
          placeholder="Enter Longitude"
          control={control}
        />
        <FormInput
          name="maxDistance"
          label="Max Distance"
          type="number"
          placeholder="Enter Max Distance in KM"
          rules={{ required: "Max Distance is required" }}
          control={control}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md my-2"
        >
          Find Nearest Hospitals
        </button>
      </form>
      <div className="md:col-span-3">
        {!nearByHospitals.length ? (
          <h1 className="text-center text-blue-700 text-xl font-semibold mb-2">
            Enter Your Location First
          </h1>
        ) : (
          <h1 className="text-center text-blue-700 text-xl font-semibold mb-2">
            {nearByHospitals?.length} Hospital Found
          </h1>
        )}
        {nearByHospitals.map((hospital) => (
          <div key={hospital?.id} className="mb-6">
            <HospitalCard hospital={hospital} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearestHospital;
