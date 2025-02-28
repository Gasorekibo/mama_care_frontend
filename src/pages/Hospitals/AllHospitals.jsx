import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHospitalAction } from "../../redux/slices/hospitalSlice";
import AllHospitalTable from "./AllHospitalTable";

function AllHospitals() {
  const dispatch = useDispatch();
  const { hospitals } = useSelector((state) => state.hospitals);
  useEffect(() => {
    dispatch(getAllHospitalAction());
  }, [dispatch]);
  return (
    <Fragment>
      <AllHospitalTable hospitals={hospitals} />
    </Fragment>
  );
}

export default AllHospitals;
