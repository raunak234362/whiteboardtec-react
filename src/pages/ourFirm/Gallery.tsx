/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import { Modal } from "../../pages/ourFirm/Modal"; // Assuming Modal is implemented separately to handle image viewing
import { motion } from "framer-motion"; // Import Framer Motion for animation
import { useNavigate } from "react-router-dom";
import GalleryImages from "./GalleryImages";
const banner: BannerPropType = {
  header: "Gallery",
  image: "../../assets/gall.jpg",
};

const galleryImages = [
  {
    src: "../../assets/Tekla.jpg",
    title: "Structural Steel Detailing Project",
    url: "/our-firm/gallery/Structural",
    projectDepartment: "STRUCTURAL",
  },
  {
    src: "../../assets/pembIMG.jpg",
    title: "PEMB Designing and Detailing",
    url: "/our-firm/gallery/pemb",
    projectDepartment: "PEMB",
  },
];
function Gallery() {
  useEffect(() => {
    document.title = "Gallery - Whiteboard Tech";
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  console.log("Selected Image:", selectedImage);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <PageBanner {...banner} />
      <section className="px-5 py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="h-full cursor-pointer"
                  onClick={() => openModal(image?.projectDepartment)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="object-cover w-full h-full rounded-lg cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition duration-300 bg-black rounded-lg opacity-0 bg-opacity-70 hover:opacity-50">
                    <span className="text-xl font-bold text-white">
                      {image.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && <GalleryImages department={selectedImage} />}

      {/* {selectedImage && <Modal image={selectedImage} onClose={closeModal} />} */}
    </div>
  );
}

export default Gallery;
