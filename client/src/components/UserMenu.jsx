import { useSelector,useDispatch } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import Divider from "./Divider"
import api from "../common/api";
import { logout } from "../features/user/userSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineExternalLink } from "react-icons/hi";
import { UseGlobalContext } from "../context/globalContext";
const UserMenu = ({handleClose=()=>{}}) => {
    const [isLoading, setIsLoading] = useState(false)
  const {userDetails}=  useSelector((state)=>state.user);
  const {handleClearCart} = UseGlobalContext()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
    setIsLoading(true);
    try {
        const data = await api.logoutUser();
        localStorage.clear()
        dispatch(logout())
        handleClearCart()
        navigate('/')
        toast.success(data?.message)
        handleClose()
        
    } catch (error) {
        toast.error(error?.message)
        
    }finally{
        setIsLoading(false);
    }
  }
  const isAdmin = userDetails?.role == 'admin'
  return (
    <div className="w-full" >
      <p className="text-sm font-semibold max-w-52 text-ellipsis line-clamp-1 ">My Account</p>
      <div className="flex items-center gap-2 py-1">
        <p className="text-sm capitalize">{userDetails?.name} </p>
        <Link to='/dashboard/profile' 
        onClick={()=>handleClose()}className="hover:text-orange-600"><HiOutlineExternalLink size={18}/></Link>
        
      </div>
       <div className={`capitalize text-green-600 font-semibold tracking-widest ${isAdmin?"block":"hidden"}`}><span>{isAdmin?"admin":""}</span></div>
        
        <Divider/>
        <div className="grid  text-sm capitalize " onClick={()=>handleClose()}>
          {
            userDetails?.role === 'admin' && (<>
            <Link to='/dashboard/category' className='hover:bg-orange-200 py-2 px-2' >category</Link>
            <Link to='/dashboard/sub-category' className='hover:bg-orange-200 py-2 px-2' >sub category</Link>
             <Link to='/dashboard/upload-product' className='hover:bg-orange-200 py-2 px-2' >upload product</Link>
              <Link to='/dashboard/products' className='hover:bg-orange-200 py-2 px-2' >products</Link>
            </>)
            
          }
           
           
            <Link to='/dashboard/orders' className='hover:bg-orange-200 py-2 px-2' >My orders</Link>
            <Link to='/dashboard/address' className='hover:bg-orange-200 py-2 px-2' >save address</Link>
            <button onClick={handleLogout} disabled={isLoading} className={`text-left capitalize px-2 hover:bg-orange-200 py-1 ${isLoading ?"cursor-wait":""}`}>logout</button>
        </div>
    </div>
  )
}

export default UserMenu