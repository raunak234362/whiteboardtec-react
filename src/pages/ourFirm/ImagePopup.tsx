import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Service from "../../config/service";

interface ImageModalProps {
  projectID: string;
  onClose: () => void;
  imageList: string[];
  title: string;
  location: string;
  softwareUsed: string;
  projectType: string;
  ProjectStatus: string;
  initialIndex: number;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  projectID,
  onClose,
}) => {
  const [imageData, setImageData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  interface GalleryFile {
    secureUrl: string;
    [key: string]: any;
  }

  interface GalleryResponse {
    file: GalleryFile | GalleryFile[] | string[];
    projectTitle?: string;
    title?: string;
    description?: string;
    [key: string]: any;
  }

  const fetchImageData = async () => {
    try {
      const response: GalleryResponse = await Service.getGalleryProjectById(
        projectID
      );
      let images: string[] = [];
      if (Array.isArray(response.images)) {
        if (typeof response.images[0] === "string") {
          images = response.images as string[];
        } else {
          images = (response.images as GalleryFile[]).map((f) => f.secureUrl);
        }
      } else if (
        response.images &&
        typeof response.images === "object" &&
        "secureUrl" in response.images
      ) {
        images = [(response.images as GalleryFile).secureUrl];
      }
      setImageData({
        title: response.projectTitle || response.title || "",
        description: response.description || "",
        type: response.type || "",
        images,
        department: response.department || "Unknown",
        projectLocation: response.projectLocation || "Unknown",
        technologyUsed: response.technologyUsed || "Unknown",
      });
      setCurrentIndex(0);
    } catch {
      setImageData(null);
    }
  };

  useEffect(() => {
    if (projectID) fetchImageData();
  }, [projectID]);

  const nextImage = () => {
    if (imageData?.images?.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % imageData.images.length);
    }
  };

  const prevImage = () => {
    if (imageData?.images?.length > 0) {
      setCurrentIndex(
        (prev) => (prev - 1 + imageData.images.length) % imageData.images.length
      );
    }
  };

  return (
    <Dialog
      open={!!projectID}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-20 backdrop-blur-lg"
    >
      <Dialog.Panel className="relative flex flex-col max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {imageData?.images?.length > 0 ? (
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="relative flex items-center justify-center md:flex-[0.65] bg-gray-100 p-5">
              <img
                src={imageData.images[currentIndex]}
                alt={`Project image ${currentIndex + 1}`}
                className="max-h-[85vh] w-full object-contain rounded-lg shadow-md"
              />
              {imageData.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute p-3 text-3xl font-bold text-gray-700 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 left-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute p-3 text-3xl font-bold text-gray-700 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 right-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    ›
                  </button>
                  <div className="absolute px-4 py-1 text-base font-semibold text-white transform translate-x-1/2 bg-black rounded-full select-none bottom-3 right-1/2 bg-opacity-60">
                    {currentIndex + 1} / {imageData.images.length}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col md:flex-[0.35] px-8 py-7 overflow-y-auto">
              <h2 className="mb-4 text-3xl font-extrabold text-center text-green-700 md:text-left">
                {imageData.title || "Untitled Project"}
              </h2>
              {(imageData.type || imageData.description) && (
                <p className="mb-5 text-center text-gray-700 whitespace-pre-line md:text-left">
                  {imageData.type || ""}
                  {imageData.type && imageData.description ? "\n\n" : ""}
                  {imageData.description || ""}
                </p>
              )}

              <div className="grid grid-cols-1 gap-6 text-sm text-gray-600 md:grid-cols-1">
                <div>
                  <p className="mb-1 font-semibold text-green-600">
                    Department
                  </p>
                  <p>{imageData.department || "Unknown"}</p>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-green-600">Location</p>
                  <p>{imageData.projectLocation || "Unknown"}</p>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-green-600">
                    Technology Used
                  </p>
                  <p>{imageData.technologyUsed || "Unknown"}</p>
                </div>
              </div>

              <div className="flex justify-center mt-8 md:justify-start">
                <button
                  onClick={onClose}
                  className="py-3 font-semibold text-white bg-green-600 rounded-lg shadow px-7 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="p-10 italic text-center text-gray-500">
            No images available for this project.
          </p>
        )}
      </Dialog.Panel>
    </Dialog>
  );
};
