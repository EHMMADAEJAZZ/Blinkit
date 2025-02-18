import { Link } from "react-router-dom"
import logo from "../assets/Logo.png"
const Logo = () => {
  return (
    <div className=" h-14  md:rounded-md flex items-center">
      <Link to="/" className=" h-14 rounded-full md:rounded-md flex items-center">
        <img src={logo} alt="logo"
        width='180px' height='60px'
        className="max-h-full filter  hidden md:block rounded-md object-scale-down"
        />
        <img src={logo} alt="logo"
        width='100px' height='50px'
        className=" min-w-[60px] min-h-10 rounded-md md:hidden object-scale-down "
        />
        </Link>
    </div>
  )
}

export default Logo