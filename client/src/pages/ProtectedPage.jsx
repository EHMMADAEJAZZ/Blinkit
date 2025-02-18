import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPage = () => {
   const {loading , isAuthenticated}= useSelector((state) => state.user);
     if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <>
    {
        isAuthenticated ? <Outlet/> : <Navigate to='/auth' /> // 
    }
    </>

  )

}

export default ProtectedPage