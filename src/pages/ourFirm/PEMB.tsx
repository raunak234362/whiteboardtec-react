/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PageBanner, BannerPropType } from "../../components/banner";
import { motion } from "framer-motion";
import { useState } from "react";
import { ImageModal } from "./ImagePopup";

const banner: BannerPropType = {
  header: "Gallery",
  image: "../../assets/gall.jpg",
};

const pembImg = [
  {
    src: "../../../public/assets/PEMB/3D Building Systems (Brownwood ISD - Practice Facility)/Exported View 1.png",
    title: "3D Building Systems (Brownwood ISD - Practice Facility)",
    images: [
      {
        src: "../../../public/assets/PEMB/3D Building Systems (Brownwood ISD - Practice Facility)/Exported View 1.png",
      },
      {
        src: "../../../public/assets/PEMB/3D Building Systems (Brownwood ISD - Practice Facility)/Exported View 2.png",
      },
      {
        src: "../../../public/assets/PEMB/3D Building Systems (Brownwood ISD - Practice Facility)/Exported View 3.png",
      },
    ],
  },
  {
    src:"../../../public/assets/PEMB/Berry and Clay (Bartlett ISD Cafeteria and Kitchen)/Exported View 1.png",
    title: "Berry and Clay (Bartlett ISD Cafeteria and Kitchen)",
    images: [
        {
            src: "../../../public/assets/PEMB/Berry and Clay (Bartlett ISD Cafeteria and Kitchen)/Exported View 1.png",
        },
        {
            src: "../../../public/assets/PEMB/Berry and Clay (Bartlett ISD Cafeteria and Kitchen)/Exported View 2.png",
        },
        {
            src: "../../../public/assets/PEMB/Berry and Clay (Bartlett ISD Cafeteria and Kitchen)/Exported View 3.png",
        }
    ]
  },
  {
    src:"../../../public/assets/PEMB/Crossland Construction Company (Rollertown Beerworks Brewery)/Exported View 1.png",
    title: "Crossland Construction Company (Rollertown Beerworks Brewery)",
    images: [
        {
            src: "../../../public/assets/PEMB/Crossland Construction Company (Rollertown Beerworks Brewery)/Exported View 1.png",
        },
        {
            src: "../../../public/assets/PEMB/Crossland Construction Company (Rollertown Beerworks Brewery)/Exported View 2.png",
        },
        {
            src: "../../../public/assets/PEMB/Crossland Construction Company (Rollertown Beerworks Brewery)/Exported View 3.png",
        }
    ]
  },
  {
    src:"../../../public/assets/PEMB/Cunningham Clark Construction (Lonestar Truck Wichita Falls Service Facility)/Exported View 1.png",
    title: "Cunningham Clark Construction (Lonestar Truck Wichita Falls Service Facility)",
    images: [
      {
        src: "../../../public/assets/PEMB/Cunningham Clark Construction (Lonestar Truck Wichita Falls Service Facility)/Exported View 1.png",
      },
      {
        src: "../../../public/assets/PEMB/Cunningham Clark Construction (Lonestar Truck Wichita Falls Service Facility)/Exported View 2.png",
      }
    ]
  },
  {
    src:"../../../public/assets/PEMB/East Chambers-New Junior High School/Exported View 1.png",
    title: "East Chambers-New Junior High School",
    images: [
      {
        src: "../../../public/assets/PEMB/East Chambers-New Junior High School/Exported View 1.png",
      },
      {
        src: "../../../public/assets/PEMB/East Chambers-New Junior High School/Exported View 2.png",
      },
      {
        src: "../../../public/assets/PEMB/East Chambers-New Junior High School/Exported View 3.png",
      }
    ]
  },
  {
    src:"../../../public/assets/PEMB/Fort Construction (Emmanuel Chin Baptist Church)/Exported View 1.png",
    title: "Fort Construction (Emmanuel Chin Baptist Church)",
    images: [
      {
        src: "../../../public/assets/PEMB/Fort Construction (Emmanuel Chin Baptist Church)/Exported View 1.png",
      },
      {
        src: "../../../public/assets/PEMB/Fort Construction (Emmanuel Chin Baptist Church)/Exported View 2.png",
      },
      {
        src: "../../../public/assets/PEMB/Fort Construction (Emmanuel Chin Baptist Church)/Exported View 3.png",
      }
    ]
  },
  {
    src:"../../../public/assets/PEMB/Jackson Construction (Chapel Hill ISD Operations-Transportation)/Exported View 1.png",
    title: "Jackson Construction (Chapel Hill ISD Operations-Transportation)",
    images: [
      {
        src: "../../../public/assets/PEMB/Jackson Construction (Chapel Hill ISD Operations-Transportation)/Exported View 1.png",
      },
      {
        src: "../../../public/assets/PEMB/Jackson Construction (Chapel Hill ISD Operations-Transportation)/Exported View 2.png",
      },
      {
        src: "../../../public/assets/PEMB/Jackson Construction (Chapel Hill ISD Operations-Transportation)/Exported View 3.png",
      }
    ]
  },
  {
    src:"../../../public/assets/PEMB/Pat Williams Construction (Lake Charles Airport Hangar )/Exported View 1.png",
    title: "Pat Williams Construction (Lake Charles Airport Hangar )",
    images: [
      {
        src: "../../../public/assets/PEMB/Pat Williams Construction (Lake Charles Airport Hangar )/Exported View 1.png",
      },
      {
        src: "../../../public/assets/PEMB/Pat Williams Construction (Lake Charles Airport Hangar )/Exported View 2.png",
      },
      {
        src: "../../../public/assets/PEMB/Pat Williams Construction (Lake Charles Airport Hangar )/Exported View 3.png",
      }
    ]
  }
];

function PEMB() {
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
    <div className="pemb">
      <PageBanner {...banner} />
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 px-5 py-10">
        {pembImg.map((item, index) => (
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
export default PEMB;
