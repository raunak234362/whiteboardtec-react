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
    software: "",
    address: "White Rock, New Mexio",
    Projecttype: "Institute",
    images: [
      {
        src: "../../../assets/tekla/CHAMISA/img2.png",
      },
      {
        src: "../../../assets/tekla/CHAMISA/img3.png",
      },
    ],
  },
  {
    src: "../../../assets/tekla/CNM-FILM-SCHOOL-IFC/img1.png",
    title: "CNM Film School",
    address: "Albuquerque, New Mexico",
    Projecttype: "Institute",
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
      },
    ],
  },
  {
    src: "../../../assets/tekla/MCS-G1/img1.png",
    title: "MCA G1 Plant Expansion",
    software: "",
    address: "Hogansville, Georgia",
    Projecttype: "Facility Expension",
    images: [
      {
        src: "../../../assets/tekla/MCS-G1/img2.png",
      },
      {
        src: "../../../assets/tekla/MCS-G1/img3.png",
      },
    ],
  },
  {
    src: "../../../assets/tekla/PINON/img1.png",
    title: "PINON Elementary School",
    address: "White Rock, New Mexico",
    Projecttype: "Institute",
    images: [
      {
        src: "../../../assets/tekla/PINON/img2.png",
      },
      {
        src: "../../../assets/tekla/PINON/img3.png",
      },
    ],
  },
  {
    src: "../../../assets/tekla/PUEBLO/img1.png",
    title: "The PUEBLO of Sandia Child Development Center",
    software: "",
    address: "Albuquerque, New Mexico",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/tekla/PUEBLO/img2.png",
      },
      {
        src: "../../../assets/tekla/PUEBLO/img3.png",
      },
    ],
  },
  {
    src: "../../../assets/tekla/WINDSOR/img1.png",
    title: "WINDSOR Municipal Building",
    address: "Windsor, Wisconsin",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/tekla/WINDSOR/img2.png",
      },
      {
        src: "../../../assets/tekla/WINDSOR/img3.png",
      },
    ],
  },
  {
    src: "../../../assets/tekla/WAUSAU/img1.png",
    title: "WAUSAU West High School",
    software: "",
    address: "Wausau, Wisconsin",
    Projecttype: "Institute",
    images: [
      {
        src: "../../../assets/tekla/WAUSAU/img2.png",
      },
      {
        src: "../../../assets/tekla/WAUSAU/img3.png",
      },
      {
        src: "../../../assets/tekla/WAUSAU/img4.png",
      },
    ],
  },
  {
    src: "../../../assets/tekla/WRIGHTSTOWN/img1.png",
    title: "WRIGTHSTOWN SWEF & State Patrol Post Facility",
    software: "",
    address: "Wrightstown, Wisconsin",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/tekla/WRIGHTSTOWN/img2.png",
      },
      {
        src: "../../../assets/tekla/WRIGHTSTOWN/img3.png",
      },
    ],
  },
  {
    src: "../../../assets/sds/LUBBOCK/model (30).png",
    title: "LUBBOCK Medical Examniner's Office",
    software: "",
    address: "Lubbock, Texas",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/sds/LUBBOCK/model (31).png",
      },
      {
        src: "../../../assets/sds/LUBBOCK/model (32).png",
      },
      {
        src: "../../../assets/sds/LUBBOCK/model (33).png",
      },
      {
        src: "../../../assets/sds/LUBBOCK/model (34).png",
      },
      {
        src: "../../../assets/sds/LUBBOCK/model (30).png",
      },
    ],
  },
  {
    src: "../../../assets/sds/R.L.COUSINS-COMMUNITY-CENTER/Exported View 1.png",
    title: "R.L. Cousins Renovation & Community Center",
    software: "",
    address: "Covington, Georgia",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/sds/R.L.COUSINS-COMMUNITY-CENTER/Exported View 2.png",
      },
      {
        src: "../../../assets/sds/R.L.COUSINS-COMMUNITY-CENTER/Exported View 3.png",
      },
      {
        src: "../../../assets/sds/R.L.COUSINS-COMMUNITY-CENTER/Exported View 1.png",
      },
    ],
  },
  {
    src: "../../../assets/sds/RANCHO/Exported View 1.png",
    title: "RANCHO Delrey Building",
    software: "",
    address: "El Paso, Texas",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/sds/RANCHO/Exported View 2.png",
      },
      {
        src: "../../../assets/sds/RANCHO/Exported View.png",
      },
      {
        src: "../../../assets/sds/RANCHO/Exported View 1.png",
      },
    ],
  },
  {
    src: "../../../assets/sds/STAHL/Exported View 1.png",
    title: "STAHL Mezzanine",
    software: "",
    address: "Calhoun, Georgia",
    Projecttype: "Industrial",
    images: [
      {
        src: "../../../assets/sds/STAHL/Exported View 2.png",
      },
      {
        src: "../../../assets/sds/STAHL/Exported View.png",
      },
      {
        src: "../../../assets/sds/STAHL/Exported View 1.png",
      },
    ],
  },
  {
    src: "../../../assets/sds/TINKER/Exported View 1.png",
    title: "Project TINKER",
    software: "",
    address: "Roonak, Virginia",
    Projecttype: "Commercial",
    images: [
      {
        src: "../../../assets/sds/TINKER/Exported View 2.png",
      },
      {
        src: "../../../assets/sds/TINKER/Exported View.png",
      },
      {
        src: "../../../assets/sds/TINKER/Exported View 1.png",
      },
    ],
  },
  {
    src: "../../../assets/sds/Trinity/Exported View 1.png",
    title: "Project Trinity",
    software: "",
    address: "Trinity, Alabama",
    Projecttype: "Industrial",
    images: [
      {
        src: "../../../assets/sds/Trinity/Exported View.png",
      },
      {
        src: "../../../assets/sds/Trinity/Exported View 1.png",
      },
    ],
  },
  {
    src: "../../../assets/sds/Yarbrough/9.png",
    title: "Yarbrough Warehouse",
    software: "",
    address: "Shreveport, Louisiana",
    Projecttype: "Commercial(Warehouse)",
    images: [{ src: "../../../assets/sds/Yarbrough/9.png" }],
  },
  {
    src: "../../../assets/sds/Harrison/Exported View 1.png",
    title: "Harrison Middle School",
    software: "",
    address: "Albuquerque, New Mexico",
    Projecttype: "Institute",
    images: [
      {
        src: "../../../assets/sds/Harrison/Exported View.png",
      },
      {
        src: "../../../assets/sds/Harrison/Exported View 1.png",
      },
    ],
  },
];

function Tekla() {
  const [popupImages, setPopupImages] = useState<{ src: string }[] | null>(
    null
  );
  const [popupTitle, setPopupTitle] = useState<string | null>(null);
  const [popupAddress, setPopupAddress] = useState<string | null>(null);
  const [popupSoftware, setPopupSoftware] = useState<string | null>(null);
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
    software: string,
    projectType: string
  ) => {
    preloadImages(images);
    setPopupImages(images);
    setPopupTitle(title);
    setPopupAddress(address);
    setPopupSoftware(software);
    setPopupProjectType(projectType);
    setPopupIndex(0);
  };

  const closePopup = () => {
    setPopupImages(null);
    setPopupTitle(null);
    setPopupAddress(null);
    setPopupSoftware(null);
    setPopupProjectType(null);
  };
  return (
    <div className="tekla">
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
              onClick={() =>
                openPopup(
                  item.images,
                  item.title,
                  item.address || "Unknown address",
                  item.software || "Unknown software",
                  item.Projecttype,
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

      {popupImages && popupTitle && (
        <ImageModal
          images={popupImages}
          title={popupTitle}
          Projecttype={popupProjectType || ""}
          address={popupAddress || ""}
          software={popupSoftware || ""}
          initialIndex={popupIndex}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default Tekla;
