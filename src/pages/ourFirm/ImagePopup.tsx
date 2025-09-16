
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
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(
    null
  );

  interface GalleryFile {
    secureUrl: string;
  }
  interface GalleryResponse {
    images?: GalleryFile[] | string[] | GalleryFile;
    projectTitle?: string;
    title?: string;
    description?: string;
    department?: string;
    location?: string;
    projectLocation?: string;
    technologyused?: string;
    designingSoftware?: string; // Add this key to the interface
    status?: string;
    ProjectStatus?: string;
    softwareUsed?: string;
    type?: string;
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
        "secureUrl" in (response.images as GalleryFile)
      ) {
        images = [(response.images as GalleryFile).secureUrl];
      }

      setImageData({
        title: response.projectTitle || response.title || "Untitled Project",
        description: response.description || "No description available",
        type: response.type || "Not specified",
        otherType: response.otherType || "Not specified",
        images,
        department: response.department || "Not specified",
        projectLocation:
          response.location || response.projectLocation || "Not specified",
        technologyUsed:
          response.technologyused || response.technologyUsed || "Not specified",
        designingSoftware: response.designingSoftware || "Not specified", // Added this line
        projectStatus:
          response.status || response.ProjectStatus || "Not specified",
        softwareUsed: response.softwareUsed || "Not specified",
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
      setSlideDirection("next");
      setCurrentIndex((prev) => (prev + 1) % imageData.images.length);
    }
  };

  const prevImage = () => {
    if (imageData?.images?.length > 0) {
      setSlideDirection("prev");
      setCurrentIndex(
        (prev) => (prev - 1 + imageData.images.length) % imageData.images.length
      );
    }
  };

  // Automatic slide every 3 seconds
  useEffect(() => {
    if (imageData?.images?.length > 1) {
      const interval = setInterval(() => {
        nextImage();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [imageData]);

  return (
    <Dialog
      open={!!projectID}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-lg"
    >
      <Dialog.Panel className="relative flex flex-col w-[50%] bg-white rounded-2xl shadow-2xl overflow-auto">
        {imageData?.images?.length > 0 ? (
          <div className="flex flex-col md:flex-col md:space-x-8">
            {/* Image Viewer */}
            <div className="relative flex items-center justify-center p-5 bg-gray-100 md:w-full overflow-hidden">
              <img
                src={imageData.images[currentIndex]}
                alt={`Project image ${currentIndex + 1}`}
                className={`w-full object-contain rounded-lg shadow-md transition-transform duration-2000 ease-in-out ${
                  slideDirection === "next"
                    ? "animate-slide-in-right"
                    : slideDirection === "prev"
                    ? "animate-slide-in-left"
                    : ""
                }`}
                key={currentIndex}
              />
              <style>
                {`
                  @keyframes slide-in-right {
                    from {
                      transform: translateX(100%);
                      opacity: 0;
                    }
                    to {
                      transform: translateX(0);
                      opacity: 1;
                    }
                  }
                  @keyframes slide-in-left {
                    from {
                      transform: translateX(-100%);
                      opacity: 0;
                    }
                    to {
                      transform: translateX(0);
                      opacity: 1;
                    }
                  }
                  .animate-slide-in-right {
                    animation: slide-in-right 2s ease-in-out;
                  }
                  .animate-slide-in-left {
                    animation: slide-in-left 2s ease-in-out;
                  }
                `}
              </style>
              {imageData.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Previous"
                    className="absolute p-3 text-3xl -translate-y-1/2 bg-white rounded-full shadow-md left-3 top-1/2"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next"
                    className="absolute p-3 text-3xl -translate-y-1/2 bg-white rounded-full shadow-md right-3 top-1/2"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Project Details */}
            <div className="p-6 md:w-11/12">
              <h2 className="mb-4 text-3xl font-bold text-green-700 whitespace-normal break-words">
                {imageData.title.toUpperCase()}
              </h2>
              <p className="mb-4 text-gray-700 whitespace-normal break-words">
                {imageData.description.toUpperCase()}
              </p>

              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <span className="font-semibold text-green-600">
                    Location:
                  </span>{" "}
                  {imageData.projectLocation.toUpperCase()}
                </div>
                {imageData.type === "OTHER" ? (
                  <div>
                    <span className="font-semibold text-green-600">
                      Project Type:
                    </span>{" "}
                    {imageData.otherType.toUpperCase()}
                  </div>
                ) : (
                  <div>
                    <span className="font-semibold text-green-600">
                      Project Type:
                    </span>{" "}
                    {imageData.type.toUpperCase()}
                  </div>
                )}
                <div>
                  <span className="font-semibold text-green-600">Status:</span>{" "}
                  {imageData.projectStatus.toUpperCase()}.
                </div>
                {imageData.designingSoftware && (
                  <div>
                    <span className="font-semibold text-green-600">
                      Designing Software:
                    </span>{" "}
                    {imageData.designingSoftware.toUpperCase()}
                  </div>
                )}
                <div>
                  <span className="font-semibold text-green-600">
                    Detailing Software:
                  </span>{" "}
                  {imageData.technologyUsed.toUpperCase()}
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2 mt-6 text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <p className="p-10 italic text-center text-gray-500">
            No images available
          </p>
        )}
      </Dialog.Panel>
    </Dialog>
  );
};