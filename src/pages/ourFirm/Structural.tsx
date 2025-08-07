import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageBanner, BannerPropType } from "../../components/banner";
import { ImageModal } from "./ImagePopup";
import Service from "../../config/service";
import { IProject } from "../../config/interface";

const banner: BannerPropType = {
  header: "Gallery",
  image: "../../assets/gall.jpg",
};

function Structural() {
  const [popupImages, setPopupImages] = useState<string[] | null>(null);
  const [popupTitle, setPopupTitle] = useState<string | null>(null);
  const [popupAddress, setPopupAddress] = useState<string | null>(null);
  const [popupProjectType, setPopupProjectType] = useState<string | null>(null);
  const [popupProjectStatus, setPopupProjectStatus] = useState<string | null>(
    null
  );
  const [popupIndex, setPopupIndex] = useState<number>(0);
  const [popupSoftware, setPopupSoftware] = useState<string | null>(null);

  const [galleryImages, setGalleryImages] = useState<IProject[]>([]);

  const fetchGalleryImages = useCallback(async () => {
    try {
      const fetched = await Service.getGalleryByDepartment("Structural");
      setGalleryImages(fetched);
    } catch (error) {
      console.error("Error fetching Structural gallery:", error);
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

const openPopup = async (
  images: string[],
  title: string,
  location: string,
  softwareUsed: string,
  projectType: string,
  projectStatus: string,
  id: string // project id
) => {
  try {
    // 🔥 Call the API when image is clicked
    await Service.getProjectById(id); // Replace with your actual service method
    console.log("Image click logged for ID:", id);
  } catch (error) {
    console.error("Error logging image click:", error);
  }

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
            key={item.id}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className="justify-center h-full text-center cursor-pointer"
              onClick={() =>
                openPopup(
                  item.images || [],
                  item.title,
                  item.location,
                  item.technologyused || "Unknown",
                  item.type,
                  item.status
                )
              }
            >
              <img
                src={item.images?.[0] || "/default.jpg"}
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

      {popupImages && popupTitle && popupAddress && popupProjectType && (
        <ImageModal
          images={popupImages}
          title={popupTitle}
          location={popupAddress}
          softwareUsed={popupSoftware || "Unknown"}
          projectType={popupProjectType}
          ProjectStatus={popupProjectStatus || "Unknown"}
          initialIndex={popupIndex}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default Structural;
