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
    src: "../../../assets/PEMB/3D Building Systems (Brownwood ISD - Practice Facility)/Exported View 3.png",
    title: "Brownwood ISD - Practice Facility",
    address: "Brpwnwood, Texas",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/PEMB/3D Building Systems (Brownwood ISD - Practice Facility)/Exported View 1.png",
      },
      {
        src: "../../../assets/PEMB/3D Building Systems (Brownwood ISD - Practice Facility)/Exported View 2.png",
      },
      {
        src: "../../../assets/PEMB/3D Building Systems (Brownwood ISD - Practice Facility)/Exported View 3.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Berry and Clay (Bartlett ISD Cafeteria and Kitchen)/Exported View 1.png",
    title: "Bartlett ISD Cafeteria and Kitchen",
    address: "Barlett, Texas",
    Projecttype: "Institute",
    images: [
      {
        src: "../../../assets/PEMB/Berry and Clay (Bartlett ISD Cafeteria and Kitchen)/Exported View 1.png",
      },
      {
        src: "../../../assets/PEMB/Berry and Clay (Bartlett ISD Cafeteria and Kitchen)/Exported View 2.png",
      },
      {
        src: "../../../assets/PEMB/Berry and Clay (Bartlett ISD Cafeteria and Kitchen)/Exported View 3.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Crossland Construction Company (Rollertown Beerworks Brewery)/Exported View 1.png",
    title: "Rollertown Beerworks Brewery",
    address: "Frisco, Texas",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/PEMB/Crossland Construction Company (Rollertown Beerworks Brewery)/Exported View 1.png",
      },
      {
        src: "../../../assets/PEMB/Crossland Construction Company (Rollertown Beerworks Brewery)/Exported View 2.png",
      },
      {
        src: "../../../assets/PEMB/Crossland Construction Company (Rollertown Beerworks Brewery)/Exported View 3.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Cunningham Clark Construction (Lonestar Truck Wichita Falls Service Facility)/Exported View 1.png",
    title:
      "Lonestar Truck Wichita Falls Service Facility",
    address: "Wichita Falls, Texas",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/PEMB/Cunningham Clark Construction (Lonestar Truck Wichita Falls Service Facility)/Exported View 1.png",
      },
      {
        src: "../../../assets/PEMB/Cunningham Clark Construction (Lonestar Truck Wichita Falls Service Facility)/Exported View 2.png",
      },
      {
        src: "../../../assets/PEMB/Cunningham Clark Construction (Lonestar Truck Wichita Falls Service Facility)/Exported View 3.png",
      }
    ],
  },
  {
    src: "../../../assets/PEMB/East Chambers-New Junior High School/Exported View 1.png",
    title: "East Chambers-New Junior High School",
    address: "Winnie, Texas",
    Projecttype: "Institute",
    images: [
      {
        src: "../../../assets/PEMB/East Chambers-New Junior High School/Exported View 1.png",
      },
      {
        src: "../../../assets/PEMB/East Chambers-New Junior High School/Exported View 2.png",
      },
      {
        src: "../../../assets/PEMB/East Chambers-New Junior High School/Exported View 3.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Fort Construction (Emmanuel Chin Baptist Church)/Exported View 3.png",
    title: "Emmanuel Chin Baptist Church",
    address: "Denton, Texas",
    Projecttype: "Worship",
    images: [
      {
        src: "../../../assets/PEMB/Fort Construction (Emmanuel Chin Baptist Church)/Exported View 1.png",
      },
      {
        src: "../../../assets/PEMB/Fort Construction (Emmanuel Chin Baptist Church)/Exported View 2.png",
      },
      {
        src: "../../../assets/PEMB/Fort Construction (Emmanuel Chin Baptist Church)/Exported View 3.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Jackson Construction (Chapel Hill ISD Operations-Transportation)/Exported View 1.png",
    title: "Chapel Hill ISD Operations-Transportation",
    address: "Tyler, Texas",
    Projecttype: "Education",
    images: [
      {
        src: "../../../assets/PEMB/Jackson Construction (Chapel Hill ISD Operations-Transportation)/Exported View 1.png",
      },
      {
        src: "../../../assets/PEMB/Jackson Construction (Chapel Hill ISD Operations-Transportation)/Exported View 2.png",
      },
      {
        src: "../../../assets/PEMB/Jackson Construction (Chapel Hill ISD Operations-Transportation)/Exported View 3.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Pat Williams Construction (Lake Charles Airport Hangar )/Exported View 1.png",
    title: "Lake Charles Airport Hangar",
    address: "Lake Charles, Louisiana",
    Projecttype: "Hangar",
    images: [
      {
        src: "../../../assets/PEMB/Pat Williams Construction (Lake Charles Airport Hangar )/Exported View 1.png",
      },
      {
        src: "../../../assets/PEMB/Pat Williams Construction (Lake Charles Airport Hangar )/Exported View 2.png",
      },
      {
        src: "../../../assets/PEMB/Pat Williams Construction (Lake Charles Airport Hangar )/Exported View 3.png",
      }
    ],
  },
];

function PEMB() {
  const [popupImages, setPopupImages] = useState<{ src: string }[] | null>(
    null
  );
  const [popupTitle, setPopupTitle] = useState<string | null>(null);
  const [popupAddress, setPopupAddress] = useState<string | null>(null);
  const [popupProjectType, setPopupProjectType] = useState<string | null>(null);
  const [popupIndex, setPopupIndex] = useState<number>(0);

  const preloadImages = (images: { src: string }[]) => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  };

  const openPopup = (
    images: { src: string }[],
    title: string,
    address: string,
    projectType: string
  ) => {
    preloadImages(images);
    setPopupImages(images);
    setPopupTitle(title);
    setPopupAddress(address);
    setPopupProjectType(projectType);
    setPopupIndex(0);
  };

  const closePopup = () => {
    setPopupImages(null);
    setPopupTitle(null);
    setPopupAddress(null);
    setPopupProjectType(null);
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
              onClick={() =>
                openPopup(
                  item.images,
                  item.title,
                  item.address || "Unknown address",
                  item.Projecttype
                )
              }
            >
              <img
                src={item.src}
                alt={item.title}
                className="rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-50 transition duration-300 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-bold">
                  {item.title}
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
          address={popupAddress}
          Projecttype={popupProjectType}
          initialIndex={popupIndex}
          onClose={closePopup}
        />
      )}
    </div>
  );
}
export default PEMB;
