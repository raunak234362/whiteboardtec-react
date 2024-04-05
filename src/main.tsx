import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import {
  OurFirm,
  BusiessModel,
  LeadershipTeam,
  Gallery
} from './pages/ourFirm'

import Services from './pages/services/Services.tsx'
import Error from './pages/error/Error.tsx'
import OurWork from './pages/ourWork/OurWork.tsx'
import {
  Resources,
  WbtBlog,
  CaseStudies
} from './pages/resources'
import Portal from './pages/portal/Portal.tsx'
import Careers from './pages/careers/Careers.tsx'
import Connect from './pages/connect/Connect.tsx'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/our-firm" element={<OurFirm />} />
      <Route path="/our-firm/gallery" element={<Gallery />} />
      <Route path="/our-firm/leadership-teams" element={<LeadershipTeam />} />
      <Route path="/our-firm/business-model" element={<BusiessModel />} />
      <Route path="/services" element={<Services />} />
      <Route path="/our-work" element={<OurWork />} />
      <Route path="/portal" element={<Portal />} />
      <Route path="/career" element={<Careers />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resources/case-studies" element={<CaseStudies />} />
      <Route path="/resources/wbt-blog" element={<WbtBlog />} />
      <Route path="*" element={<Error />} />
    </Route>
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
)