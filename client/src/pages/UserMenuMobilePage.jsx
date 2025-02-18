import { useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu"
import { IoCloseCircle } from "react-icons/io5";
const UserMenuMobilePage = () => {
   const navigate= useNavigate();
   const handleClose = () => navigate(-1);
  return (
    <section className="w-full min-h-[80dvh] bg-white overflow-hidden">
        <div className="w-full p-4">
            <button onClick={handleClose} className="w-fit block rounded-full ml-auto bg-red-500 ">
                <IoCloseCircle size={25} className=" text-white h-full w-full"/>
            </button>
        </div>
        <div className="container p-4">
            <UserMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobilePage