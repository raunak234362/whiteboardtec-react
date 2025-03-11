import { Outlet } from "react-router-dom";
import { HeaderHome } from "./components/header/Header";
// import { HeaderBase } from './components/header/Header'
import { Footer } from "./components/footer/Footer";
import { NavigationBar, HomeNav } from "./components/navigation";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { database } from "./config/firebase";
import { onValue, ref, set } from "firebase/database";
import GoTo from "./components/goto/GoTo";
import popupImg from "/popup.png";

function App(): JSX.Element {
  const [updated, setUpdated] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(true); // Add state for popup visibility

  useEffect(() => {
    // console.log('App loaded')
    const reference = ref(database, "/view");
    onValue(reference, async (snapshot) => {
      if (!updated) {
        await set(reference, snapshot.val() + 1);
        setUpdated(true);
      }
    });
  }, []);

  const location = useLocation();
  const reference = useRef<HTMLDivElement>(null);
  if (location.pathname.startsWith("/admin")) {
    return (
      <>
        <Outlet />
        <Footer />
      </>
    );
  } else {
    // console.log("Appppp Loooadded")
    return (
      <>
        <div ref={reference}></div>

        <div className="max-md:flex max-md:flex-wrap max-md:justify-between">
          {/* {(location.pathname === '/') ? <HeaderHome /> : <HeaderBase />} */}
          <HeaderHome />
          {location.pathname === "/" ? <HomeNav /> : <NavigationBar />}
        </div>
        {showPopup && ( // Add popup image with close button
          <div className=" popup z-50 absolute top-0 overflow-x-hidden h-screen w-screen bg-black/50">
            <div className="p-10 flex justify-center items-center h-full rounded-2xl">
              <img
                src={popupImg}
                alt="Popup"
                className="h-[95%] items-center w-[100%] rounded-2xl"
              />
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-10 p-3 rounded-full text-white bg-red-500"
            >
              Close
            </button>
          </div>
        )}
        <Outlet />
        {location.pathname !== "/" && <GoTo props={reference} />}
        <Footer />
      </>
    );
  }
}

export default App;
