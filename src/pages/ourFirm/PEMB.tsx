/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PageBanner, BannerPropType } from "../../components/banner";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ImageModal } from "./ImagePopup";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import Service from "../../config/service";

const banner: BannerPropType = {
  header: "Gallery",
  image: "../../assets/gall.jpg",
};

function PEMB() {
  const [popupImages, setPopupImages] = useState<any|null>(null);
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

  const fetchGalleryImage = async() => {
    // const response = await Service
  }
  useEffect(() => { 
    fetchGalleryImage();
  }, []);

  const fetchGalleryImages = useCallback(async () => {
    try {
      const q = query(
        collection(db, "gallery"),
        where("projectDepartment", "==", "PEMB")
      );
      const snapshot = await getDocs(q);
      const fetchedImages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          src: data.images?.[0]?.src || data.img || "", // fallback if no image
          title: data.title || "Untitled",
          softwareUsed: data.softwareUsed || "Unknown",
          ProjectStatus: data.projectStatus || "Unknown",
          location: data.location || "Unknown",
          Projecttype: data.projectType || "Unknown",
          images: data.images || [], // should be an array of { src }
        };
      });
      setGalleryImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching PEMB gallery images:", error);
    }
  }, []);

  useEffect(() => {
    document.title = "Gallery - Whiteboard Tech";
    fetchGalleryImages();
  }, [fetchGalleryImages]);

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
    console.log("Opening popup with:", {
      images,
      title,
      location,
      softwareUsed,
      projectType,
      popupImages,
    });
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

  console.log("Render state:", {
    hasImages: !!popupImages,
    hasTitle: !!popupTitle,
    hasAddress: !!popupAddress,
    hasProjectType: !!popupProjectType,
    hasProjectStatus: !!popupProjectStatus,
  });

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
          images={popupImages}
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
