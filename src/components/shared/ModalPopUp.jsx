import { Modal } from "flowbite-react";
import PropTypes from "prop-types";

const ModalPopUp = ({ showModal, title, children, closeModal }) => {
  return (
    <>
      <div
        tabIndex="-1"
        aria-hidden={!showModal}
        className={`${
          showModal ? "flex" : "hidden"
        } overflow-y-auto overflow-x-auto fixed top-0 right-0 left-0 z-50 justify-center items-center bottom-0 bg-black bg-opacity-50`}
      >
        <Modal dismissible show={showModal} onClose={closeModal}>
          {title && <Modal.Header>{title}</Modal.Header>}
          {children}
        </Modal>
      </div>
    </>
  );
};
ModalPopUp.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ModalPopUp;
