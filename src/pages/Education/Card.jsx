import { PropTypes } from "prop-types";
import VideoPlayer from "../../components/shared/VideoPlayer";
import className from "classnames";
import { useState } from "react";
import ModalPopUp from "../../components/shared/ModalPopUp";
import { Button, Modal } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEducationAction,
  getAllEducationAction,
} from "../../redux/slices/educationSlice";
import toast from "react-hot-toast";
function AllEducationCard({
  videoUrl,
  title,
  content,
  type,
  recommended,
  author,
  id,
}) {
  const [deleteEducation, setDeleteEducation] = useState(false);
  const { auth } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const dispatch = useDispatch();

  const handleDeleteEducation = async (e) => {
    e.preventDefault();

    if (auth?.user?.id !== author?.id || auth?.user?.role !== "ADMIN")
      return toast.error(
        "You are not authorized to delete this education content"
      );

    await dispatch(deleteEducationAction(id));
    await dispatch(getAllEducationAction());
    closeModal();
  };

  return (
    <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
      <div className="order-1 sm:ml-6 xl:ml-0">
        <h3 className="mb-1 text-slate-900 font-semibold">
          <span className="mb-1 flex justify-between text-sm leading-6 text-blue-700 my-4">
            {type}
          </span>
          {title}
        </h3>
        <div className="prose prose-slate prose-sm text-slate-600">
          <p>{content?.slice(0, 150) + "..."}</p>
        </div>
        <button
          onClick={openModal}
          className="group hover:transition hover:duration-700 hover:ease-in-out inline-flex cursor-pointer items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-blue-700 hover:text-white focus:ring-slate-500 mt-6"
        >
          Learn more
          <svg
            className="overflow-visible ml-3 text-slate-300 group-hover:text-white"
            width="3"
            height="6"
            viewBox="0 0 3 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0L3 3L0 6"></path>
          </svg>
        </button>
        <ModalPopUp showModal={showModal} closeModal={closeModal}>
          <div className="">
            <Modal.Body className="lg:h-screen lg:w-screen lg:max-w-screen-lg lg:relative lg:-left-28 bg-primaryBg dark:bg-gray-800 rounded-lg">
              <VideoPlayer videoUrl={videoUrl} />
              <div className="p-8 lg:p-12">
                <h3 className="mb-1 text-slate-900 font-semibold flex justify-between">
                  {title}
                  <span
                    className={className(
                      "px-2 rounded-full  text-white relative -top-8",
                      {
                        "bg-blue-700":
                          recommended === "LOW" || recommended === "ALL",
                        "bg-orange-400": recommended === "MEDIUM",
                        "bg-red-500": recommended === "HIGH",
                      }
                    )}
                  >
                    For {recommended} {recommended === "ALL" ? "" : "risks"}
                  </span>
                </h3>
                <div className="prose prose-slate prose-sm text-slate-600">
                  <p>{content}</p>
                </div>

                <div className="my-8 border-t border border-slate-200 py-8 px-4">
                  <h4 className="text-slate-900 font-semibold">Author</h4>
                  <div className="flex  gap-48 mt-4">
                    <div className="flex gap-9">
                      <img
                        className="rounded w-36 h-36 border border-slate-200"
                        src={author?.profileImageUrl}
                        alt="Profile"
                      />
                      <div className="space-y-2">
                        <p className="font-semibold">
                          Full Name:{" "}
                          <span className="font-normal">
                            {author?.full_name}
                          </span>{" "}
                        </p>
                        <p className="font-semibold">
                          Email:{" "}
                          <span className="font-normal">{author?.email}</span>
                        </p>
                        <p className="font-semibold">
                          Role:{" "}
                          <span className="font-normal">{author?.role}</span>
                        </p>
                        <p className="font-semibold">
                          Phone Number:{" "}
                          <span className="font-normal">
                            {author?.phoneNumber}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">
                        Address:{" "}
                        <span className="font-normal">
                          {author?.location?.address}
                        </span>
                      </p>
                      <p className="font-semibold">
                        Region:{" "}
                        <span className="font-normal">
                          {author?.location?.region}
                        </span>
                      </p>
                      <p className="font-semibold">
                        Province:{" "}
                        <span className="font-normal">
                          {author?.location?.province}
                        </span>
                      </p>
                      <p className="font-semibold">
                        Latitude:{" "}
                        <span className="font-normal">
                          {author?.location?.latitude}
                        </span>
                      </p>
                      <p className="font-semibold">
                        Longitude:{" "}
                        <span className="font-normal">
                          {author?.location?.longitude}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-end gap-4">
                  {auth?.user?.id === author?.id && (
                    <form
                      className="flex gap-3 items-end"
                      onSubmit={handleDeleteEducation}
                    >
                      <div className="flex flex-col">
                        <p>
                          Type in <strong>delete</strong> to remove item.
                        </p>
                        <input
                          type="text"
                          onChange={(e) => setDeleteEducation(e.target.value)}
                          className="rounded-lg px-2 min-w-max text-center"
                          placeholder="delete"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={deleteEducation !== "delete"}
                        color="red"
                        className="bg-red-600 text-white hover:bg-red-700 hover:text-red-600"
                      >
                        Delete
                      </Button>
                    </form>
                  )}
                  <Button color="gray" onClick={closeModal}>
                    <IoMdClose className="items-center size-5" /> Close
                  </Button>
                </div>
              </div>
            </Modal.Body>
            {/* <Modal.Footer></Modal.Footer> */}
          </div>
        </ModalPopUp>
      </div>
      <VideoPlayer videoUrl={videoUrl} />
    </div>
  );
}

AllEducationCard.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  recommended: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  author: PropTypes.object.isRequired,
};

export default AllEducationCard;
