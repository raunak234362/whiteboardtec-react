import { Outlet } from 'react-router-dom'
import { HeaderBase, HeaderHome } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { NavigationBar, HomeNav } from './components/navigation';

function App(): JSX.Element{
  const isHomePage = window.location.pathname === '/';
  return (
    <>
      {isHomePage ? <HeaderHome /> : <HeaderBase />}
      {isHomePage ? <HomeNav /> : <NavigationBar />}
      <Outlet />
      <Footer />
    </>
  )
}

export default App