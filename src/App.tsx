import { Outlet } from "react-router-dom";
import { HeaderHome } from "./components/header/Header";
// import { HeaderBase } from './components/header/Header'
import { Footer } from "./components/footer/Footer";
import { NavigationBar, HomeNav } from "./components/navigation";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import GoTo from "./components/goto/GoTo";

function App(): JSX.Element {
  const [updated, setUpdated] = useState<boolean>(false);


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

        <div className="max-md:flex max-md:flex-wrap max-md:justify-between">
          {/* {(location.pathname === '/') ? <HeaderHome /> : <HeaderBase />} */}
          <HeaderHome />
          {location.pathname === "/" ? <HomeNav /> : <NavigationBar />}
        </div>
        <Outlet />
        {/* {location.pathname !== "/" && <GoTo props={reference} />} */}
        <Footer />
      </>
    );
  }
}

export default App;
