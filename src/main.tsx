import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  OurFirm,
  BusiessModel,
  LeadershipTeam,
  Gallery,
  PEMB as PEMBGallery,
  Structural as StructuralGallery,
} from "./pages/ourFirm";

import {
  ArchitecturalBIM,
  MiscellaneousSteel,
  PESEStampig,
  PEMB,
  StructuralSteel,
  Rebar,
} from "./pages/services";
import Error from "./pages/error/Error.tsx";
import { Portfolio } from "./pages/ourWork";
import { Resources, WbtBlog, CaseStudies } from "./pages/resources";
import Portal from "./pages/portal/Portal.tsx";
import Careers from "./pages/careers/Careers.tsx";
import Connect from "./pages/connect/Connect.tsx";
import {
  Admin,
  Login,
  Dashboard,
  AdminCareer,
  AdminGallery,
  AdminPortfolio,
} from "./pages/admin";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import GalleryImages from "./pages/ourFirm/GalleryImages.tsx";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/our-firm" element={<OurFirm />} />
      <Route path="/our-firm/gallery" element={<Gallery />} />
      <Route path="/our-firm/gallery/images" element={<GalleryImages />} />
      <Route path="/our-firm/gallery/pemb" element={<PEMBGallery />} />
      <Route
        path="/our-firm/gallery/Structural"
        element={<StructuralGallery />}
      />
      <Route path="/our-firm/leadership-teams" element={<LeadershipTeam />} />
      <Route path="/our-firm/business-model" element={<BusiessModel />} />

      <Route path="/services" element={<StructuralSteel />} />
      <Route
        path="/services/structural-steel-detailing"
        element={<StructuralSteel />}
      />
      <Route
        path="/services/miscellaneous-steel-detailing"
        element={<MiscellaneousSteel />}
      />
      <Route
        path="/services/connection-design-and-pe-se-stamping"
        element={<PESEStampig />}
      />
      <Route
        path="/services/architectural-bim-services"
        element={<ArchitecturalBIM />}
      />
      <Route path="/services/pemb-detailing" element={<PEMB />} />
      <Route
        path="/services/rebar-estimation-and-detailing"
        element={<Rebar />}
      />

      <Route path="/our-work" element={<Portfolio />} />
      <Route path="/our-work/project-portfolio" element={<Portfolio />} />

      <Route path="/portal" element={<Portal />} />
      <Route path="/career" element={<Careers />} />
      <Route path="/connect" element={<Connect />} />

      <Route path="/resources" element={<Resources />} />
      <Route path="/resources/case-studies" element={<CaseStudies />} />
      <Route path="/resources/wbt-blog" element={<WbtBlog />} />

      <Route path="*" element={<Error />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/career" element={<AdminCareer />} />
      <Route path="/admin/portfolio" element={<AdminPortfolio />} />
      <Route path="/admin/gallery" element={<AdminGallery />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
