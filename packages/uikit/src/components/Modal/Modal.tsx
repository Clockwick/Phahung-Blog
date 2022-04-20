import React from 'react';
import { ModalProps } from './types';

const Modal: React.FC<ModalProps> = ({ title, children, handleDismiss }) => (
  <div
    aria-hidden="true"
    className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-40 justify-center items-center bg-black bg-opacity-50"
    onClick={handleDismiss}
  >
    <div
      aria-hidden="true"
      className="flex z-40 flex-col w-80 bg-white rounded-3xl shadow-lg "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between pl-7 pt-5 pb-0 pr-5 items-center rounded-t ">
        <div className="text-lg font-semibold text-center ">{title}</div>
      </div>
      <div className="flex flex-col p-6 space-y-4">{children}</div>
    </div>
  </div>
);

export default Modal;
