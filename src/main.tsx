import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import OurFirm from './components/ourFirm/OurFirm.tsx'
import Services from './components/services/Services.tsx'
import Error from './components/error/Error.tsx'
import OurWork from './components/ourWork/OurWork.tsx'
import Resources from './components/resources/Resources.tsx'
import Portal from './components/portal/Portal.tsx'
import Careers from './components/careers/Careers.tsx'
import Connect from './components/connect/Connect.tsx'

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/our-firm', element: <OurFirm/> },
      { path: '/services', element: <Services/> },
      { path: '/our-work', element: <OurWork/>},
      { path: '/resources', element: <Resources/> },
      { path: '/portal', element: <Portal/> },
      { path: '/career', element: <Careers/> },
      { path: '/connect', element: <Connect/> },
      { path: '*', element: <Error/>}
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter} />
  </React.StrictMode>,
)
