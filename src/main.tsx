import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import OurFirm from './pages/ourFirm/OurFirm.tsx'
import Services from './pages/services/Services.tsx'
import Error from './pages/error/Error.tsx'
import OurWork from './pages/ourWork/OurWork.tsx'
import {
  Resources, WbtBlog, CaseStudies
} from './pages/resources'
import Portal from './pages/portal/Portal.tsx'
import Careers from './pages/careers/Careers.tsx'
import Connect from './pages/connect/Connect.tsx'

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/our-firm', element: <OurFirm/>, errorElement: <Error/> },
      { path: '/services', element: <Services/> , errorElement: <Error/> },
      { path: '/our-work', element: <OurWork/> , errorElement: <Error/>},
      { path: '/resources', element: <Resources />, errorElement: <Error/>},
      { path: '/portal', element: <Portal/>, errorElement: <Error/> },
      { path: '/career', element: <Careers/>, errorElement: <Error/> },
      { path: '/connect', element: <Connect/>, errorElement: <Error/> },
      { path: '/resources/case-studies', element: <CaseStudies />, errorElement: <Error/> },
      { path: '/resources/wbt-blog', element: <WbtBlog />, errorElement: <Error/> },
      { path: '*', element: <Error/>}
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter} />
  </React.StrictMode>,
)