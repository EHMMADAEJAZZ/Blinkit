import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className='  w-full h-12 fixed bottom-0 z-30 bg-black text-white  px-4 py-2'>
      <div className=" flex flex-col gap-4  sm:flex-row sm:justify-between sm:items-center">
        <p className="text-gray-400 text-sm text-center">&copy; All Rights Reserved {new Date().getFullYear()} | Blinkit</p>
        <div className="flex justify-center items-center gap-4 text-2xl sm:text-3xl">
          <Link to='' className="hover:text-primary-100">
          <FaFacebook/>
          </Link>
          <Link to='' className="hover:text-primary-100">
          <FaInstagramSquare/>
          </Link>
          <Link to='' className="hover:text-primary-100">
          <FaLinkedin/>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
