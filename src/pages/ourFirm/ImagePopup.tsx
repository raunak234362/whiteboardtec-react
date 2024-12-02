import React, { useState } from "react";
import { motion } from "framer-motion";

interface ImageModalProps {
  images: { src: string }[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  images,
  title,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      <motion.div
        className="fixed inset-0 bg-slate-950 bg-opacity-65 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative bg-white rounded-lg shadow-lg p-2 w-[90%] md:w-[70%] mx-auto ">
          <button
            className=" top-2 right-2 bg-red-500 px-2 rounded-full text-black text-2xl font-bold"
            onClick={onClose}
          >
            ×
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <img
                src={images[currentIndex]?.src}
                alt={title}
                className="lg:w-auto  lg:h-96 rounded-lg"
              />
            </div>
            <div>
              <p className="text-center text-3xl font-bold mt-4">{title}</p>
            </div>
            <div className="flex gap-5 justify-center mt-4 mx-10">
              <button
                className="text-white bg-green-400 rounded-full text-2xl font-bold px-4"
                onClick={prevImage}
              >
                {"<"}
              </button>
              <button
                className="text-white bg-green-400 rounded-full text-2xl font-bold px-4"
                onClick={nextImage}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
