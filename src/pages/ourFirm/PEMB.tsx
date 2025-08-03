/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PageBanner, BannerPropType } from "../../components/banner";
import { motion } from "framer-motion";
import {  useEffect, useState } from "react";
import { ImageModal } from "./ImagePopup";

const banner: BannerPropType = {
  header: "Gallery",
  image: "../../assets/gall.jpg",
};

function PEMB() {
  const [popupImages, setPopupImages] = useState<string[] | null>(null);
  const [popupTitle, setPopupTitle] = useState<string | null>(null);
  const [popupAddress, setPopupAddress] = useState<string | null>(null);
  const [popupProjectType, setPopupProjectType] = useState<string | null>(null);
  const [popupProjectStatus, setPopupProjectStatus] = useState<string | null>(
    null
  );
  const [popupIndex, setPopupIndex] = useState<number>(0);
  const [popupSoftware, setPopupSoftware] = useState<string | null>(null);

  const [galleryImages, setGalleryImages] = useState<
    {
      src: string;
      title: string;
      softwareUsed: string;
      ProjectStatus: string;
      location: string;
      Projecttype: string;
      images: string[];
    }[]
  >([]);

  // Replace this with your actual service or dummy data
  const fetchGalleryImage = async () => {
    try {
      // Example dummy data (replace this with your own API call or local JSON)
      const data = [
        {
          src: "/images/sample1.jpg",
          title: "Project One",
          softwareUsed: "AutoCAD",
          ProjectStatus: "Completed",
          location: "Bangalore",
          Projecttype: "PEMB",
          images: ["/images/sample1.jpg", "/images/sample2.jpg"],
        },
        // ...more items
      ];
      setGalleryImages(data);
    } catch (error) {
      console.error("Failed to fetch PEMB gallery images:", error);
    }
  };

  useEffect(() => {
    document.title = "Gallery - Whiteboard Tech";
    fetchGalleryImage();
  }, []);

  const preloadImages = (images: string[]) => {
    images.forEach((image: string) => {
      const img = new Image();
      img.src = image;
    });
  };

  const openPopup = (
    images: string[],
    title: string,
    location: string,
    softwareUsed: string,
    projectType: string,
    projectStatus: string
  ) => {
    preloadImages(images);
    setPopupImages(images);
    setPopupTitle(title);
    setPopupAddress(location);
    setPopupSoftware(softwareUsed);
    setPopupProjectType(projectType);
    setPopupProjectStatus(projectStatus);
    setPopupIndex(0);
  };

  const closePopup = () => {
    setPopupImages(null);
    setPopupTitle(null);
    setPopupAddress(null);
    setPopupSoftware(null);
    setPopupProjectType(null);
    setPopupProjectStatus(null);
  };

  return (
    <div className="pemb">
      <PageBanner {...banner} />
      <div className="grid grid-cols-2 gap-6 px-5 py-10 lg:grid-cols-4 md:grid-cols-3">
        {galleryImages.map((item, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className="justify-center h-full text-center cursor-pointer"
              onClick={() =>
                openPopup(
                  item?.images,
                  item?.title,
                  item?.location || "Unknown address",
                  item?.softwareUsed || "Unknown",
                  item?.Projecttype,
                  item?.ProjectStatus || "Status not available"
                )
              }
            >
              <img
                src={item.src}
                alt={item.title}
                className="rounded-lg shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center transition duration-300 bg-black rounded-lg opacity-0 bg-opacity-70 hover:opacity-75">
                <span className="text-xl font-bold text-white">
                  {item.title.toUpperCase()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {popupTitle && popupAddress && popupProjectType && (
        <ImageModal
          images={popupImages || []}
          title={popupTitle}
          location={popupAddress || ""}
          softwareUsed={popupSoftware || ""}
          projectType={popupProjectType || ""}
          ProjectStatus={popupProjectStatus || ""}
          initialIndex={popupIndex}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default PEMB;
