import { Outlet } from 'react-router-dom'
import { HeaderBase, HeaderHome } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { NavigationBar, HomeNav } from './components/navigation';
import { useLocation } from 'react-router-dom';


function App(): JSX.Element{
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) {
    return (
      <>
        <Outlet />
        <Footer />
      </>
    )

  } else {
    return (
      <>
        {(location.pathname === '/') ? <HeaderHome /> : <HeaderBase />}
        {(location.pathname === '/') ? <HomeNav /> : <NavigationBar />}
        <Outlet />
        <Footer />
      </>
    )
  }
}

export default App