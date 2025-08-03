import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function Admin() {
  useEffect(() => {
    document.title = "Admin Portal - Whiteboard";
  }, []);
  const token= sessionStorage.getItem("token");

    if (token){
        return (
          <Navigate to='/admin/dashboard'/>
        )
    } else {
        return (
          <Navigate to='/admin/login' />
        )
    }
}

export default Admin