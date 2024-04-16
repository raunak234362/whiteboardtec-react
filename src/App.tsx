import { Outlet } from 'react-router-dom'
import { HeaderBase, HeaderHome } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { NavigationBar, HomeNav } from './components/navigation';
import { useLocation } from 'react-router-dom';

import { useEffect } from "react";
import { database } from "./config/firebase";
import { onValue, ref, set } from "firebase/database";


function App(): JSX.Element{

  useEffect(()=> {
    const reference = ref(database, "/view");
    onValue(reference, (snapshot) => {
      set(reference, snapshot.val()+1);
    })
  }, [])

  
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