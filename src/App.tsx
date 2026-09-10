import { Outlet } from "react-router-dom";
import { HeaderHome } from "./components/header/Header";
// import { HeaderBase } from './components/header/Header'
import { Footer } from "./components/footer/Footer";
import { NavigationBar, HomeNav } from "./components/navigation";
import { useLocation } from "react-router-dom";
// import GoTo from "./components/goto/GoTo";

function App(): JSX.Element {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  } else {
    console.log("App component rendered with location:", location.pathname);
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-1">
          <div className="max-md:flex max-md:flex-wrap max-md:justify-between">
            <HeaderHome />
            {location.pathname === "/" ? <HomeNav /> : <NavigationBar />}
          </div>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
