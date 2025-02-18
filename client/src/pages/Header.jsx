import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../UI/Logo';
import Search from '../UI/Search';
import { FaRegUserCircle } from 'react-icons/fa';
import { useMobile } from '../hooks/useMobile';
import { BsCart4 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { GoTriangleDown } from 'react-icons/go';
import { GoTriangleUp } from 'react-icons/go';
import UserMenu from '../components/UserMenu';
import { useState } from 'react';
import {
  getCartQuantity,
  getTotalDiscount,
  getTotalPrice,
} from '../features/cart/cartSlice';
import formatCurrency from '../utils/currencyFormat';
import DisplaycartItems from '../components/DisplaycartItems';
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { userDetails, isAuthenticated } = useSelector((state) => state.user);

  const totalQuantity = useSelector(getCartQuantity);
  const totalPrice = useSelector(getTotalPrice);
  const totalDiscount = useSelector(getTotalDiscount);
  const {cart} = useSelector(state=>state.cart);
  const handleSearch = (e) => {
    e.preventDefault();
  };
  const location = useLocation();
  const navigate = useNavigate();
  // Check if the current route is a search route
  const isSearchRoute = location.pathname === '/search';
  const isMobile = useMobile();
  const handleCloseMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleMobileUser = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    navigate('/user');
  };
  const toggleCart=()=>{
    setOpenCart(!openCart)
    
  }
  return (
    <header className='min-h-24 fixed top-0 z-40 w-full sm:min-h-20  bg-gray-100  flex flex-col justify-center md:flex-row md:items-center md:justify-between  shadow-md gap-2 px-2 '>
      <div className='min-h-full min-w-full px-4  flex items-center justify-between  gap-2'>
        {/* LOGO */}
        {!(isMobile && isSearchRoute) && <Logo />}

        {/* search */}
        <div className='hidden sm:block'>
          <Search handleSearch={handleSearch} />
        </div>
        {/* login & cart */}
        {!(isMobile && isSearchRoute) && (
          <div className='flex items-center gap-4'>
            <button
              onClick={handleMobileUser}
              className='text-3xl text-neutral-500  lg:hidden'
            >
              <FaRegUserCircle />
            </button>
            <div className='hidden lg:flex gap-4 items-center'>
              {userDetails?._id ? (
                <div className='relative'>
                  <div
                    onClick={() => setShowMenu((prev) => !prev)}
                    className='flex items-center gap-1 cursor-pointer select-none'
                  >
                    <p>Account</p>
                    {showMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {showMenu && (
                    <div className='absolute top-12 right-0 '>
                      <div className='p-4 bg-slate-100 rounded w-52 mx-w-52 lg:shadow-lg '>
                        <UserMenu handleClose={handleCloseMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to='/auth'
                  className='bg-primary-200 text-white hover:bg-primary-100 px-4 py-2 w-24 text-center rounded-md border text-sm uppercase font-semibold'
                >
                  login
                </Link>
              )}

              <div onClick={()=>setOpenCart(true)} className='  flex justify-center items-center cursor-pointer  bg-green-800 rounded p-1 gap-2'>
                <div className='animate-bounce text-white z-0'>
                  <BsCart4 size={25} />
                </div>
                {
                  cart[0] && ( <div className='text-xs font-semibold tracking-widest  w-full flex flex-col items-center  '>
                  <p className=' text-center  text-xs text-white '>
                    {totalQuantity} items
                  </p>
                  <p className='  text-center text-xs text-white '>
                    {formatCurrency('INR', totalPrice - totalDiscount)}
                  </p>
                </div>)
                }
               
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='container mx-auto sm:hidden mb-2'>
        <Search handleSearch={handleSearch} />
      </div>
      {
        openCart && (
         
            <DisplaycartItems onClose={toggleCart}/>
         
        )
      }
    </header>
  );
};

export default Header;
