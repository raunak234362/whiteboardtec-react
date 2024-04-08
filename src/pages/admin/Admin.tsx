import { useEffect } from 'react'
import { auth } from '../../config/firebase'
import { Navigate } from 'react-router-dom'

function Admin() {
  useEffect(() => {
    document.title = "Admin Portal - Whiteboard";
  }, []);

    if (auth.currentUser?.email){
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