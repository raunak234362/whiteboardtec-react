/* eslint-disable @typescript-eslint/no-unused-vars */
import { PageBanner, BannerPropType } from "../../components/banner";
import { motion } from "framer-motion";
import { useState } from "react";
import { ImageModal } from "./ImagePopup";

const banner: BannerPropType = {
  header: "Gallery",
  image: "../../../assets/gall.jpg",
};

const tekla = [
  {
    src: "../../../assets/tekla/CHAMISA/img1.png",
    title: "Chamisa Elementary School Replacement",
    images:[
        {
            src: "../../../assets/tekla/CHAMISA/img2.png",
        },
        {
            src: "../../../assets/tekla/CHAMISA/img3.png",
        }

    ]
  },
  {
    src: "../../../assets/tekla/CNM-FILM-SCHOOL-IFC/img1.png",
    title: "CNM Film School",
    images: [
        {
            src: "../../../assets/tekla/CNM-FILM-SCHOOL-IFC/img2.png",
        },
        {
            src: "../../../assets/tekla/CNM-FILM-SCHOOL-IFC/img3.png",
        },
        {
            src: "../../../assets/tekla/CNM-FILM-SCHOOL-IFC/img4.png",
        },
        {
            src: "../../../assets/tekla/CNM-FILM-SCHOOL-IFC/img5.png",
        }
    ]
  },
  {
    src: "../../../assets/tekla/MCS-G1/img1.png",
    title: "MCA G1 Plant Expansion",
    images: [
        {
            src: "../../../assets/tekla/MCS-G1/img2.png",
        },
        {
            src: "../../../assets/tekla/MCS-G1/img3.png",
        }
    ]
  },
  {
    src: "../../../assets/tekla/PINON/img1.png",
    title: "PINON Elementary School",
    images: [
        {
            src: "../../../assets/tekla/PINON/img2.png",
        },
        {
            src: "../../../assets/tekla/PINON/img3.png",
        },
    ]
  },
  {
    src: "../../../assets/tekla/PUEBLO/img1.png",
    title: "The PUEBLO of Sandia Child Development Center",
    images: [
        {
            src: "../../../assets/tekla/PUEBLO/img2.png",
        },
        {
            src: "../../../assets/tekla/PUEBLO/img3.png",
        }
    ]
  },
  {
    src: "../../../assets/tekla/WINDSOR/img1.png",
    title: "WINDSOR Municipal Building",
    images: [
        {
            src: "../../../assets/tekla/WINDSOR/img2.png",
        },
        {
            src: "../../../assets/tekla/WINDSOR/img3.png",
        }
    ]
  },
  {
    src: "../../../assets/tekla/WAUSAU/img1.png",
    title: "WAUSAU West High School",
    images: [
        {
            src: "../../../assets/tekla/WAUSAU/img2.png",
        },
        {
            src: "../../../assets/tekla/WAUSAU/img3.png",
        },
        {
            src: "../../../assets/tekla/WAUSAU/img4.png",
        }
    ]
  },
  {
    src: "../../../assets/tekla/WRIGHTSTOWN/img1.png",
    title: "WRIGTHSTOWN SWEF & State Patrol Post Facility",
    images: [
        {
            src: "../../../assets/tekla/WRIGHTSTOWN/img2.png",
        },
        {
            src: "../../../assets/tekla/WRIGHTSTOWN/img3.png",
        }
    ]
  },
];

function Tekla() {
    const [popupImages, setPopupImages] = useState<{ src: string }[] | null>(null);
    const [popupTitle, setPopupTitle] = useState<string | null>(null);
    const [popupIndex, setPopupIndex] = useState<number>(0);
  
    const openPopup = (images: { src: string }[], title: string) => {
      setPopupImages(images);
      setPopupTitle(title);
      setPopupIndex(0); // Start from the first image
    };
  
    const closePopup = () => {
      setPopupImages(null);
      setPopupTitle(null);
      setPopupIndex(0);
    };
  
    return (
      <div>
        <PageBanner {...banner} />
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 px-5 py-10">
          {tekla.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="h-full justify-center text-center cursor-pointer"
                onClick={() => openPopup(item?.images, item?.title)}
              >
                <img src={item?.src} alt={item?.title} />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-50 transition duration-300 flex items-center justify-center rounded-lg">
                  <span className="text-white text-xl font-bold">
                    {item?.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
  
        {/* Popup View */}
        {popupImages && popupTitle && (
          <ImageModal
            images={popupImages}
            title={popupTitle}
            initialIndex={popupIndex}
            onClose={closePopup}
          />
        )}
      </div>
    );
  }
  
  export default Tekla;