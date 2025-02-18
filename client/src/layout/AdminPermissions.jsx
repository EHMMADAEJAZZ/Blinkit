import { useSelector } from "react-redux"
import isAdmin from "../utils/isAdmin"
import { Outlet } from "react-router-dom"

const AdminPermissions = () => {
    const {userDetails} = useSelector((state)=>state.user)
  return (
    <>
    {
        isAdmin(userDetails?.role)?<Outlet/>: <p  className="p-4 bg-red-200 text-red-600 capitalize">do not have permission</p>
    }
    </>
  )
}

export default AdminPermissions