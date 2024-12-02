/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PageBanner, BannerPropType } from "../../components/banner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ImageModal } from "./ImagePopup";

const banner: BannerPropType = {
  header: "Gallery",
  image: "../../../public/assets/gall.jpg",
};

const sds = [
  {
    src: "../../../public/assets/sds/LUBBOCK/model (30).png",
    title: "LUBBOCK Medical Examniner's Office",
    images: [
      {
        src: "../../../public/assets/sds/LUBBOCK/model (31).png",
      },
      {
        src: "../../../public/assets/sds/LUBBOCK/model (32).png",
      },
      {
        src: "../../../public/assets/sds/LUBBOCK/model (33).png",
      },
      {
        src: "../../../public/assets/sds/LUBBOCK/model (34).png",
      },
      {
        src: "../../../public/assets/sds/LUBBOCK/model (30).png",
      }
    ],
  },
  {
    src: "../../../public/assets/sds/R.L.COUSINS-COMMUNITY-CENTER/Exported View 1.png",
    title: "R.L. Cousins Renovation & Community Center",
    images: [
      {
        src: "../../../public/assets/sds/R.L.COUSINS-COMMUNITY-CENTER/Exported View 2.png",
      },
      {
        src: "../../../public/assets/sds/R.L.COUSINS-COMMUNITY-CENTER/Exported View 3.png",
      },
      {
        src: "../../../public/assets/sds/R.L.COUSINS-COMMUNITY-CENTER/Exported View 1.png",
      }
    ],
  },
  {
    src: "../../../public/assets/sds/RANCHO/Exported View 1.png",
    title: "RANCHO Delrey Building",
    images: [
      {
        src: "../../../public/assets/sds/RANCHO/Exported View 2.png",
      },
      {
        src: "../../../public/assets/sds/RANCHO/Exported View.png",
      },
      {
        src: "../../../public/assets/sds/RANCHO/Exported View 1.png",
      }
    ],
  },
  {
    src: "../../../public/assets/sds/STAHL/Exported View 1.png",
    title: "STAHL Mezzanine",
    images: [
      {
        src: "../../../public/assets/sds/STAHL/Exported View 2.png",
      },
      {
        src: "../../../public/assets/sds/STAHL/Exported View.png",
      },
      {
        src: "../../../public/assets/sds/STAHL/Exported View 1.png",
      }
    ],
  },
  {
    src: "../../../public/assets/sds/TINKER/Exported View 1.png",
    title: "Project TINKER",
    images: [
      {
        src: "../../../public/assets/sds/TINKER/Exported View 2.png",
      },
      {
        src: "../../../public/assets/sds/TINKER/Exported View.png",
      },
      {
        src: "../../../public/assets/sds/TINKER/Exported View 1.png",
      }
    ],
  },
  {
    src: "../../../public/assets/sds/Trinity/Exported View 1.png",
    title: "Project Trinity",
    images: [
      {
        src: "../../../public/assets/sds/Trinity/Exported View.png",
      },
      {
        src: "../../../public/assets/sds/Trinity/Exported View 1.png",
      }
    ],
  },
  {
    src: "../../../public/assets/sds/Yarbrough/9.png",
    title: "Yarbrough Warehouse",
    images: [{ src: "../../../public/assets/sds/Yarbrough/9.png" }],
  },
  {
    src: "../../../public/assets/sds/Harrison/Exported View 1.png",
    title: "Harrison Middle School",
    images: [
      {
        src: "../../../public/assets/sds/Harrison/Exported View.png",
      },
      {
        src: "../../../public/assets/sds/Harrison/Exported View 1.png",
      },
    ],
  },
];

function SDS() {
  const navigate = useNavigate();
  const [popupImages, setPopupImages] = useState<{ src: string }[] | null>(
    null
  );
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
        {sds?.map((item, index) => (
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
export default SDS;
