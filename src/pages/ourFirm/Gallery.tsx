/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import { Modal } from "../../pages/ourFirm/Modal"; // Assuming Modal is implemented separately to handle image viewing
import { motion } from "framer-motion"; // Import Framer Motion for animation
import { useNavigate } from "react-router-dom";
const banner: BannerPropType = {
  header: "Gallery",
  image: "../../assets/gall.jpg",
};

const galleryImages = [
  {
    src: "../../assets/Tekla.jpg",
    title: "Structural Steel Detailing Project",
    // url: "/our-firm/gallery/Structural",
    projectDepartment: "Structural",
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

  // const openModal = (image: string) => {
  //   setSelectedImage(image);
  // };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <PageBanner {...banner} />
      <section className="py-10 px-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-full cursor-pointer" onClick={() => navigate(image.url)}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-50 transition duration-300 flex items-center justify-center rounded-lg">
                    <span
                      className="text-white text-xl font-bold"
                    >
                      {image.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default Gallery;
