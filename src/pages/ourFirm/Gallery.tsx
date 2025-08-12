
import { useEffect } from "react";
import { PageBanner, BannerPropType } from "../../components/banner";
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";
// import GalleryImages from "./GalleryImages"; // REMOVE THIS IMPORT

const banner: BannerPropType = {
  header: "Gallery",
  image:
    "https://res.cloudinary.com/dp7yxzrgw/image/upload/v1753686686/manage/gall_rr1yxc.jpg",
};

const galleryCategories = [
  
  {
    src: "../../assets/Tekla.jpg", 
    title: "Structural Steel Detailing Project",
    department: "STRUCTURAL", 
  },
  {
    src: "../../assets/pembIMG.jpg", 
    title: "PEMB Designing and Detailing",
    department: "PEMB",
  },
];

function Gallery() {
  useEffect(() => {
    document.title = "Gallery - Whiteboard Tech";
  }, []);

  const navigate = useNavigate();

  const handleCategoryClick = (department: string) => {
    console.log("Navigating to department:", department);
  
    navigate(`/our-firm/gallery/images?department=${department}`);
  };



  return (
    <div>
      <PageBanner {...banner} />
      <section className="px-5 py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {galleryCategories?.map(
              (
                category,
                index 
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
                    onClick={() => handleCategoryClick(category.department)} 
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

      
    </div>
  );
}

export default Gallery;
