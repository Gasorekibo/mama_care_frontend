import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHospitalAction } from "../../redux/slices/hospitalSlice";
import AllHospitalTable from "./AllHospitalTable";
import { Button, Modal } from "flowbite-react";
import ModalPopUp from "../../components/shared/ModalPopUp";
import AddNewHospital from "./AddNewHospital";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

function AllHospitals() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { hospitals, loading } = useSelector((state) => state.hospitals);
  const { auth } = useSelector((state) => state?.auth);
  useEffect(() => {
    dispatch(getAllHospitalAction());
  }, [dispatch, hospitals?.length]);
  function handleOpenModal() {
    setOpenModal(true);
  }
  function handleCloseModal() {
    setOpenModal(false);
  }
  return (
    <div>
      {auth?.user?.role === "ADMIN" && (
        <Button
          onClick={() => handleOpenModal()}
          color="blue"
          className="font-bold mb-2"
        >
          Add New
        </Button>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <AllHospitalTable hospitals={hospitals} />
      )}
      <ModalPopUp
        showModal={openModal}
        title={"Add New Hospital"}
        closeModal={handleCloseModal}
      >
        <Modal.Body>
          <AddNewHospital closeModal={handleCloseModal} />
        </Modal.Body>
      </ModalPopUp>
    </div>
  );
}

export default AllHospitals;
