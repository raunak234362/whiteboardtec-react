// src/pages/ourFirm/Gallery.tsx (Main Gallery page)
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import { motion } from "framer-motion"; // Import Framer Motion for animation
import { useNavigate } from "react-router-dom";
// import GalleryImages from "./GalleryImages"; // REMOVE THIS IMPORT

const banner: BannerPropType = {
  header: "Gallery",
  image: "../../assets/gall.jpg", // Ensure this path is correct
};

const galleryCategories = [
  // Renamed for clarity, as these are categories, not individual images
  {
    src: "../../assets/Tekla.jpg", // Ensure this path is correct
    title: "Structural Steel Detailing Project",
    department: "STRUCTURAL", // Use 'department' directly for consistency
  },
  {
    src: "../../assets/pembIMG.jpg", // Ensure this path is correct
    title: "PEMB Designing and Detailing",
    department: "PEMB", // Use 'department' directly for consistency
  },
];

function Gallery() {
  useEffect(() => {
    document.title = "Gallery - Whiteboard Tech";
  }, []);

  // No longer need departmentType state here as navigation handles the state
  // const [departmentType, setDepartmentType] = useState<string | null>("");
  const navigate = useNavigate();

  const handleCategoryClick = (department: string) => {
    console.log("Navigating to department:", department);
    // This will navigate to /our-firm/gallery/images?department=STRUCTURAL or PEMB
    navigate(`/our-firm/gallery/images?department=${department}`);
  };

  // No longer need closeModal or console.log("Selected Image:") here as GalleryImages handles its own state

  return (
    <div>
      <PageBanner {...banner} />
      <section className="px-5 py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {galleryCategories.map(
              (
                category,
                index // Use 'category' for clarity
              ) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className="h-full cursor-pointer"
                    onClick={() => handleCategoryClick(category.department)} // Pass the department
                  >
                    <img
                      src={category.src}
                      alt={category.title}
                      className="object-cover w-full h-full rounded-lg cursor-pointer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition duration-300 bg-black rounded-lg opacity-0 bg-opacity-70 hover:opacity-50">
                      <span className="text-xl font-bold text-white">
                        {category.title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* GalleryImages will be rendered by your router on a different route */}
      {/* {selectedImage && <GalleryImages department={selectedImage} />} */}
    </div>
  );
}

export default Gallery;
