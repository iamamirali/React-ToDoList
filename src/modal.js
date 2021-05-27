import React, { useEffect } from "react";
const Modal = ({ close, modalContent }) => {
  useEffect(() => {
    setTimeout(() => {
      close();
    }, 2000);
  });

  return (
    <div className='modal'>
      <p>{modalContent}</p>
    </div>
  );
};
export default Modal;
