import React, { useState } from "react";
import { motion } from "framer-motion";

interface ImageModalProps {
  images: { src: string }[];
  title: string;
  address: string | "Image not available";
  software: string | "Unknown";
  Projecttype: string | "Image not available";
  ProjectStatus: string | "Status not available";
  initialIndex: number;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  images,
  title,
  address,
  Projecttype,
  ProjectStatus,
  software,
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-slate-950 bg-opacity-75 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="relative bg-white rounded-lg shadow-lg p-4 w-[90%] md:w-[45%] mx-auto">
        <button
          className="absolute top-2 right-2 bg-red-500 px-3 py-1 rounded-full text-white text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <img
            src={images[currentIndex]?.src}
            alt={title}
            className="lg:w-auto lg:h-96 rounded-lg"
            onError={(e) => (e.currentTarget.src = "/assets/placeholder.png")}
          />
          <div className="mt-4 text-center">
            <p className="md:text-4xl font-bold text-green-700">
              {title.toUpperCase()}
            </p>
            <p className="md:text-lg text-gray-700">
              <span>Location: </span>
              {address}
            </p>
            <p className="md:text-lg text-gray-700">
              <span>Project Type: </span>
              {Projecttype}
            </p>
            <p className="md:text-lg text-gray-700">
              <span>Software Used: </span>
              {software}
            </p>
            <p className="md:text-lg text-gray-700">
              <span>Project Status: </span>
              {ProjectStatus}
            </p>
          </div>
          <div className="flex gap-5 justify-center mt-4">
            <button
              className="text-white bg-green-400 rounded-full text-3xl font-bold px-4"
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
  );
};
