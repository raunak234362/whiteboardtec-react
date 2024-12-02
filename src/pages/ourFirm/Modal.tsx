import React from 'react';

type ModalProps = {
  image: string;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="relative">
        <img src={image} alt="Enlarged" className="max-w-full max-h-screen" />
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        >
          X
        </button>
      </div>
    </div>
  );
};
