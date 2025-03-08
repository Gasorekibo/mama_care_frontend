import { MdOutlinePlaylistAddCircle } from "react-icons/md";
import AddEducationModal from "../../components/shared/Modal";
import { useEffect, useState } from "react";
import AllEducationCard from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { getAllEducationAction } from "../../redux/slices/educationSlice";

function AllEducation() {
  const dispatch = useDispatch();
  const { education, error } = useSelector((state) => state.education);
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllEducationAction());
  }, [dispatch, auth?.user?.id]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNew = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gray-200">
      {error && (
        <p className="text-red-500 text-center text-3xl ">Error: {error}</p>
      )}
      <button
        onClick={handleAddNew}
        type="button"
        className="text-white md:right-14 md:top-20 z-50 md:my-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <MdOutlinePlaylistAddCircle className="text-lg me-2" />
        Add new
      </button>

      {education.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <p className="text-xl font-semibold mb-2">
            No education content available
          </p>
          <p className="text-sm">
            Click the <strong>Add new</strong> button above to create your first
            education content.
          </p>
        </div>
      )}
      <AddEducationModal
        modelId="authentication-modal"
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8 md:p-12">
        {education?.map((item) => (
          <AllEducationCard
            key={item.id}
            videoUrl={item.videoUrl}
            title={item.title}
            content={item.content}
            type={item.type}
            recommended={item.recommendedForRiskLevel}
            id={item.id}
            author={item.author}
          />
        ))}
      </div>
    </div>
  );
}

export default AllEducation;
