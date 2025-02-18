import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className='  w-full h-12 fixed bottom-0 z-30 bg-black text-white  px-4 py-2'>
      <div className=" flex gap-4  justify-between items-center">
        <p className="text-gray-400 max-[430px]:text-xs text-sm ">&copy; All Rights Reserved {new Date().getFullYear()} | Blinkit</p>
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <Link to='' className="hover:text-primary-100">
          <FaFacebook className="text-xl sm:text-2xl"/>
          </Link>
          <Link to='' className="hover:text-primary-100">
          <FaInstagramSquare  className="text-xl sm:text-2xl" />
          </Link>
          <Link to='' className="hover:text-primary-100">
          <FaLinkedin className="text-xl sm:text-2xl"/>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
