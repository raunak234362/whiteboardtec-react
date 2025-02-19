import { PageBanner, BannerPropType } from "../../components/banner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const banner: BannerPropType = {
  header: "Gallery",
  image: "../../assets/gall.jpg",
};

const structural = [
  {
    src: "../../assets/teklaIMG.jpg",
    title: "TEKLA Projects",
    url: "/our-firm/gallery/Structural/tekla",
  },
  {
    src: "../../assets/SDSIMG.jpg",
    title: "SDS/2 Projects",
    url: "/our-firm/gallery/Structural/sds",
  },
];

function Structural() {
  const navigate = useNavigate();

  return (
    <div>
      <PageBanner {...banner} />
      <div className="grid grid-cols-1 py-10 px-5 md:grid-cols-2 gap-6 ">
        {structural.map((image, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className="h-full cursor-pointer"
              onClick={() => navigate(image.url)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-50 transition duration-300 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-bold">
                  {image.title}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Structural;
