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
    software: "",
    ProjectStatus: "Completed",
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
    software: "",
    ProjectStatus: "Completed",
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
    software: "",
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
    title: "Lonestar Truck Wichita Falls Service Facility",
    software: "",
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
      },
    ],
  },
  {
    src: "../../../assets/PEMB/East Chambers-New Junior High School/Exported View 1.png",
    title: "East Chambers-New Junior High School",
    software: "",
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
    software: "",
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
    software: "",
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
    software: "",
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
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Benning Construction Company/img1.png",
    title: "Benning Construction Company",
    software: "Tekla Structural",
    address: "Delton Georgia",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/PEMB/Benning Construction Company/img1.png",
      },
      {
        src: "../../../assets/PEMB/Benning Construction Company/img2.png",
      },
      {
        src: "../../../assets/PEMB/Benning Construction Company/img3.png",
      },
      {
        src: "../../../assets/PEMB/Benning Construction Company/img4.png",
      },
      {
        src: "../../../assets/PEMB/Benning Construction Company/img5.png",
      },
      {
        src: "../../../assets/PEMB/Benning Construction Company/img6.png",
      },
      {
        src: "../../../assets/PEMB/Benning Construction Company/img7.png",
      },
      {
        src: "../../../assets/PEMB/Benning Construction Company/img8.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/BWC Education/img1.png",
    title: "BWC Education",
    software: "Tekla Structural",
    address: "Denton, Texas",
    Projecttype: "Educational",
    images: [
      {
        src: "../../../assets/PEMB/BWC Education/img1.png",
      },
      {
        src: "../../../assets/PEMB/BWC Education/img2.png",
      },
      {
        src: "../../../assets/PEMB/BWC Education/img3.png",
      },
      {
        src: "../../../assets/PEMB/BWC Education/img4.png",
      },
      {
        src: "../../../assets/PEMB/BWC Education/img5.png",
      },
      {
        src: "../../../assets/PEMB/BWC Education/img6.png",
      },
      {
        src: "../../../assets/PEMB/BWC Education/img7.png",
      },
      {
        src: "../../../assets/PEMB/BWC Education/img8.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Commercial Construction & Maintenance, Inc/img1.png",
    title: "Commercial Construction & Maintenance, Inc",
    software: "Tekla Structural",
    address: "Manvel, Texas",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/PEMB/Commercial Construction & Maintenance, Inc/img1.png",
      },
      {
        src: "../../../assets/PEMB/Commercial Construction & Maintenance, Inc/img2.png",
      },
      {
        src: "../../../assets/PEMB/Commercial Construction & Maintenance, Inc/img3.png",
      },
      {
        src: "../../../assets/PEMB/Commercial Construction & Maintenance, Inc/img4.png",
      },
      {
        src: "../../../assets/PEMB/Commercial Construction & Maintenance, Inc/img5.png",
      },
      {
        src: "../../../assets/PEMB/Commercial Construction & Maintenance, Inc/img6.png",
      },
      {
        src: "../../../assets/PEMB/Commercial Construction & Maintenance, Inc/img7.png",
      },
      {
        src: "../../../assets/PEMB/Commercial Construction & Maintenance, Inc/img8.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Mac's Construction Company, Inc/img1.png",
    title: "Mac's Construction Company, Inc",
    software: "Tekla Structural",
    address: "Wiggins, Mississippi",
    Projecttype: "Educational",
    images: [
      {
        src: "../../../assets/PEMB/Mac's Construction Company, Inc/img1.png",
      },
      {
        src: "../../../assets/PEMB/Mac's Construction Company, Inc/img2.png",
      },
      {
        src: "../../../assets/PEMB/Mac's Construction Company, Inc/img3.png",
      },
      {
        src: "../../../assets/PEMB/Mac's Construction Company, Inc/img4.png",
      },
      {
        src: "../../../assets/PEMB/Mac's Construction Company, Inc/img5.png",
      },
      {
        src: "../../../assets/PEMB/Mac's Construction Company, Inc/img6.png",
      },
      {
        src: "../../../assets/PEMB/Mac's Construction Company, Inc/img7.png",
      },
      {
        src: "../../../assets/PEMB/Mac's Construction Company, Inc/img8.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/N&T Construction Co, Inc/img1.png",
    title: "N&T Construction Co, Inc",
    software: "Tekla Structural",
    address: "Port Arthur, Texas",
    Projecttype: "Educational",
    images: [
      {
        src: "../../../assets/PEMB/N&T Construction Co, Inc/img1.png",
      },
      {
        src: "../../../assets/PEMB/N&T Construction Co, Inc/img2.png",
      },
      {
        src: "../../../assets/PEMB/N&T Construction Co, Inc/img3.png",
      },
      {
        src: "../../../assets/PEMB/N&T Construction Co, Inc/img4.png",
      },
      {
        src: "../../../assets/PEMB/N&T Construction Co, Inc/img5.png",
      },
      {
        src: "../../../assets/PEMB/N&T Construction Co, Inc/img6.png",
      },
      {
        src: "../../../assets/PEMB/N&T Construction Co, Inc/img7.png",
      },
      {
        src: "../../../assets/PEMB/N&T Construction Co, Inc/img9.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Pogue Construction/img1.png",
    title: "Pogue Construction",
    software: "Tekla Structural",
    address: "Collin, Texas",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/PEMB/Pogue Construction/img1.png",
      },
      {
        src: "../../../assets/PEMB/Pogue Construction/img2.png",
      },
      {
        src: "../../../assets/PEMB/Pogue Construction/img3.png",
      },
      {
        src: "../../../assets/PEMB/Pogue Construction/img4.png",
      },
      {
        src: "../../../assets/PEMB/Pogue Construction/img5.png",
      },
      {
        src: "../../../assets/PEMB/Pogue Construction/img6.png",
      },
      {
        src: "../../../assets/PEMB/Pogue Construction/img7.png",
      },
      {
        src: "../../../assets/PEMB/Pogue Construction/img9.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Rudick Construction Group/img1.png",
    title: "Rudick Construction Group",
    software: "Tekla Structural",
    address: "Fannin, Texas",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/PEMB/Rudick Construction Group/img1.png",
      },
      {
        src: "../../../assets/PEMB/Rudick Construction Group/img2.png",
      },
      {
        src: "../../../assets/PEMB/Rudick Construction Group/img3.png",
      },
      {
        src: "../../../assets/PEMB/Rudick Construction Group/img4.png",
      },
      {
        src: "../../../assets/PEMB/Rudick Construction Group/img5.png",
      },
      {
        src: "../../../assets/PEMB/Rudick Construction Group/img6.png",
      },
      {
        src: "../../../assets/PEMB/Rudick Construction Group/img7.png",
      },
      {
        src: "../../../assets/PEMB/Rudick Construction Group/img9.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Voelkel McWilliams Construction, LLC/img.png",
    title: "Rudick Construction Group",
    software: "Tekla Structural",
    address: "Saint John, Lousiana",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/PEMB/Voelkel McWilliams Construction, LLC/img.png",
      },
      {
        src: "../../../assets/PEMB/Voelkel McWilliams Construction, LLC/img2.png",
      },
      {
        src: "../../../assets/PEMB/Voelkel McWilliams Construction, LLC/img3.png",
      },
      {
        src: "../../../assets/PEMB/Voelkel McWilliams Construction, LLC/img4.png",
      },
      {
        src: "../../../assets/PEMB/Voelkel McWilliams Construction, LLC/img5.png",
      },
      {
        src: "../../../assets/PEMB/Voelkel McWilliams Construction, LLC/img6.png",
      },
      {
        src: "../../../assets/PEMB/Voelkel McWilliams Construction, LLC/img7.png",
      },
      {
        src: "../../../assets/PEMB/Voelkel McWilliams Construction, LLC/img9.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Waldrop Construction/img0.png",
    title: "Waldrop Construction",
    software: "Tekla Structural",
    address: "Edwards, Texas",
    Projecttype: "Educational",
    images: [
      {
        src: "../../../assets/PEMB/Waldrop Construction/img.png",
      },
      {
        src: "../../../assets/PEMB/Waldrop Construction/img2.png",
      },
      {
        src: "../../../assets/PEMB/Waldrop Construction/img3.png",
      },
      {
        src: "../../../assets/PEMB/Waldrop Construction/img4.png",
      },
      {
        src: "../../../assets/PEMB/Waldrop Construction/img5.png",
      },
      {
        src: "../../../assets/PEMB/Waldrop Construction/img6.png",
      },
      {
        src: "../../../assets/PEMB/Waldrop Construction/img7.png",
      },
      {
        src: "../../../assets/PEMB/Waldrop Construction/img9.png",
      },
    ],
  },
  {
    src: "../../../assets/PEMB/Warren Construction INC/img0.png",
    title: "Warren Construction INC",
    software: "Tekla Structural",
    address: "Dona Ana, New Mexico",
    Projecttype: "Educational",
    images: [
      {
        src: "../../../assets/PEMB/Warren Construction INC/img0.png",
      },
      {
        src: "../../../assets/PEMB/Warren Construction INC/img1.png",
      },
      {
        src: "../../../assets/PEMB/Warren Construction INC/img3.png",
      },
      {
        src: "../../../assets/PEMB/Warren Construction INC/img4.png",
      },
      {
        src: "../../../assets/PEMB/Warren Construction INC/img5.png",
      },
      {
        src: "../../../assets/PEMB/Warren Construction INC/img6.png",
      },
      {
        src: "../../../assets/PEMB/Warren Construction INC/img7.png",
      },
      {
        src: "../../../assets/PEMB/Warren Construction INC/img9.png",
      },
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
  const [popupProjectStatus, setPopupProjectStatus] = useState<string | null>(null);
  const [popupIndex, setPopupIndex] = useState<number>(0);
  const [popupSoftware, setPopupSoftware] = useState<string | null>(null);

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
    software: string,
    projectType: string,
    projectStatus: string
  ) => {
    console.log('Opening popup with:', { images, title, address, software, projectType });
    preloadImages(images);
    setPopupImages(images);
    setPopupTitle(title);
    setPopupAddress(address);
    setPopupSoftware(software);
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

  console.log('Render state:', {
    hasImages: !!popupImages,
    hasTitle: !!popupTitle,
    hasAddress: !!popupAddress,
    hasProjectType: !!popupProjectType,
    hasProjectStatus: !!popupProjectStatus
  });

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
                  item?.images,
                  item?.title,
                  item?.address || "Unknown address",
                  item?.software || "Unknown",
                  item?.Projecttype,
                  item?.ProjectStatus || "Status not available"
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
          address={popupAddress || ""}
          software={popupSoftware || ""}
          Projecttype={popupProjectType || ""}
          ProjectStatus={popupProjectStatus || ""}
          initialIndex={popupIndex}
          onClose={closePopup}
        />
      )}
    </div>
  );
}
export default PEMB;
