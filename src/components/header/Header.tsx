import { Link } from "react-router-dom";

// import { useEffect } from "react";
// import { db } from "../../config/firebase";
// import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const HeaderHome = (): JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-center" id="header">
        <Link to="/" className="inline-flex">
          <img
            src="/src/assets/image/logo/whiteboardtec-logo.png"
            alt="logo"
            className="m-2 h-16"
          />
        </Link>
        <div className="inline-flex items-center ml-48">
          <div className="flex-row flex items-center">
            <span className="text-gray-700 m-2">
              <svg
                className="h-6 w-6 text-[#6abd45]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span className="text-gray-500">
              <span className="flex">
                <a href="tel:1-612-605-5833">1-612-605-5833</a>
              </span>
              <span className="flex">
                <a href="tel:1-612-216-5427">1-612-216-5427</a>
              </span>
            </span>
          </div>
          <div className="inline-flex ml-3">
            <img
              src="/src/assets/image/logo/AISC-Detailer-logo.png"
              alt="AISC Detailer"
              className="h-10 m-0.5"
            />
            <img
              src="/src/assets/image/logo/Tekla_Structures_logo.png"
              alt="Tekla Structures"
              className="h-10 m-0.5"
            />
            <img
              src="/src/assets/image/logo/SDS2-logo.png"
              alt="SDS2 Logo"
              className="h-10 m-0.5"
            />
          </div>
          <div className="flex-col flex items-center ml-2">
            <span className="[&>svg]:h-4 [&>svg]:w-4 m-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#6abd45"
                viewBox="0 0 320 512"
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/whiteboardtec/",
                    "_blank"
                  );
                }}
                className="cursor-pointer"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
            <span className="[&>svg]:h-4 [&>svg]:w-4 m-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#6abd45"
                viewBox="0 0 448 512"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/whiteboardtec/",
                    "_blank"
                  );
                }}
                className="cursor-pointer"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </span>
            <span className="[&>svg]:h-4 [&>svg]:w-4 m-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#6abd45"
                viewBox="0 0 448 512"
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/company/whiteboardtec",
                    "_blank"
                  );
                }}
              >
                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const HeaderBase = (): JSX.Element => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const collRef = collection(db, "views");
  //     const docRef = await getDocs(collRef);
  //     docRef.forEach((docR)=>{
  //       const data = docR.data();
  //       data.view += 1;
  //       const footerView = doc(db, "views", "Ky6liajBNOeINYN9G6dC");
  //       updateDoc(footerView, {
  //         view: data.view,
  //       });
  //     })
  //   };
  //   fetchData();
  // }, [])

  return (
    <>
      <div className="flex items-center justify-center" id="header">
        <Link to="/" className="inline-flex">
          <img
            src="/src/assets/image/logo/whiteboardtec-logo.png"
            alt="logo"
            className="m-2 h-16"
          />
        </Link>
        <div className="inline-flex ml-60 flex-wrap align-start">
          <div className="flex-row flex items-center">
            <span className="text-gray-700 m-2">
              <svg
                className="h-6 w-6 text-[#6abd45]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span className="text-gray-500">
              <span className="flex">
                <a href="tel:1-612-605-5833">1-612-605-5833</a>
              </span>
              <span className="flex">
                <a href="tel:1-612-216-5427">1-612-216-5427</a>
              </span>
            </span>
          </div>
          <div className="inline-flex ml-3">
            <img
              src="/src/assets/image/logo/AISC-Detailer-logo.png"
              alt="AISC Detailer"
              className="h-10 m-0.5"
            />
            <img
              src="/src/assets/image/logo/Tekla_Structures_logo.png"
              alt="Tekla Structures"
              className="h-10 m-0.5"
            />
            <img
              src="/src/assets/image/logo/SDS2-logo.png"
              alt="SDS2 Logo"
              className="h-10 m-0.5"
            />
          </div>
          <div className="flex-row flex items-center ml-2">
            <span className="[&>svg]:h-4 [&>svg]:w-4 m-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#6abd45"
                viewBox="0 0 320 512"
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/whiteboardtec/",
                    "_blank"
                  );
                }}
                className="cursor-pointer"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
            <span className="[&>svg]:h-4 [&>svg]:w-4 m-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#6abd45"
                viewBox="0 0 448 512"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/whiteboardtec/",
                    "_blank"
                  );
                }}
                className="cursor-pointer"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </span>
            <span className="[&>svg]:h-4 [&>svg]:w-4 m-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#6abd45"
                viewBox="0 0 448 512"
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/company/whiteboardtec",
                    "_blank"
                  );
                }}
              >
                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export { HeaderHome, HeaderBase };
