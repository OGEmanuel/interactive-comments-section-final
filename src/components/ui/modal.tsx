import axios from 'axios';
import ReactDOM from 'react-dom';

type modalPropsType = {
  modalActive: () => void;
  url?: string | undefined;
};

// const header = {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

const Backdrop = (props: modalPropsType) => {
  const { modalActive } = props;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 bg-backdrop backdrop-blur-[1px]"
      onClick={modalActive}
    ></div>
  );
};

const ModalOverlay = (props: modalPropsType) => {
  const { modalActive, url } = props;

  if (!url) {
    throw new Error('Comment not found');
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(url);
    } catch (error) {
      console.error(error);
    }

    modalActive();
  };

  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] w-[20%] translate-y-[-50%] bg-white z-30 rounded-xl py-5 px-5 flex flex-col gap-5 shadow-sm">
      <p className="text-xl font-medium text-[#324152]">Delete comment</p>
      <p className="text-[#67727e] text-lg">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <div className="flex gap-4 w-full text-white font-medium">
        <button
          onClick={modalActive}
          className="bg-[#67727e] w-[50%] rounded-lg py-3"
        >
          NO, CANCEL
        </button>
        <button
          onClick={handleDelete}
          className="bg-[#ed6468] w-[50%] rounded-lg py-3"
        >
          YES, DELETE
        </button>
      </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

if (!portalElement) {
  throw new Error("Element with id 'overlays' not found");
}

const Modal = (props: modalPropsType) => {
  const { modalActive, url } = props;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop modalActive={modalActive} />,
        portalElement,
        // closeModal={closeModal}
      )}
      {ReactDOM.createPortal(
        <ModalOverlay url={url} modalActive={modalActive} />,
        // url={url} closeModal={closeModal}
        portalElement,
      )}
    </>
  );
};

export default Modal;
