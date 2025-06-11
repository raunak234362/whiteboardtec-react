import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ImageModalProps {
  images: string[];
  title: string;
  location: string;
  softwareUsed: string;
  projectType: string;
  ProjectStatus: string;
  initialIndex: number;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  images,
  title,
  location,
  projectType,
  ProjectStatus,
  softwareUsed,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (images.length > 0 && currentIndex >= 0 && currentIndex < images.length) {
    console.log(
      "Current image index and src:",
      currentIndex,
      images[currentIndex]
    );
  } else {
    console.log(
      "Current image index and src:",
      currentIndex,
      "No image available"
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-slate-950 bg-opacity-75 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      tabIndex={-1}
      ref={modalRef}
    >
      <div className="relative bg-white rounded-lg shadow-lg p-4 w-[90%] md:w-[45%] mx-auto outline-none">
        <button
          className="absolute top-2 right-2 bg-red-500 px-3 py-1 rounded-full text-white text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <img
            src={images?.[currentIndex]}
            alt={title}
            className="lg:w-auto lg:h-96 rounded-lg object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/placeholder.png";
            }}
          />
          <div className="mt-4 text-center">
            <p className="md:text-4xl font-bold text-green-700">
              {title?.toUpperCase()}
            </p>
            <p className="md:text-lg text-gray-700">
              <span className="font-semibold">Location: </span>
              {location || "Not available"}
            </p>
            <p className="md:text-lg text-gray-700">
              <span className="font-semibold">Project Type: </span>
              {projectType || "Not available"}
            </p>
            <p className="md:text-lg text-gray-700">
              <span className="font-semibold">Software Used: </span>
              {softwareUsed || "Unknown"}
            </p>
            <p className="md:text-lg text-gray-700">
              <span className="font-semibold">Project Status: </span>
              {ProjectStatus || "Not available"}
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
