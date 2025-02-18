import { IoCloseCircle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCartQuantity,
  getTotalDiscount,
  getTotalPrice,
} from '../features/cart/cartSlice';
import formatCurrency from '../utils/currencyFormat';
import { useSelector } from 'react-redux';
import AddToCart from './AddToCart';
import discountedPrice from '../utils/pricewithDiscount';
import empty_cart from '../assets/empty_cart.webp';
import { UseGlobalContext } from '../context/globalContext';
import { useEffect } from 'react';
const DisplaycartItems = ({ onClose }) => {
  const totalQuantity = useSelector(getCartQuantity);
  const {userDetails} = useSelector(state=>state.user);
  const totalPrice = useSelector(getTotalPrice);
  const totalDiscount = useSelector(getTotalDiscount);
  const { cart } = useSelector((state) => state.cart);
  const deliveryCharges = 0
  const {fetchCartItems} = UseGlobalContext()
  const navigate = useNavigate()
  const handleRedirectCheckOut =()=>{
    if(!userDetails?._id){
      navigate('/login',{replace:true});
      if(onClose){

        onClose();
      }
      return;
    }else{
      navigate('/checkout',{replace:true});
       if(onClose){

        onClose();
      }
      return;
    }
  }
  useEffect(()=>{
    fetchCartItems()
  },[])
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-700 bg-opacity-75 z-50 backdrop-blur-md'>
      <div className='w-full flex flex-col bg-white  min-h-screen max-h-screen max-w-sm ml-auto'>
        <div className='flex justify-between items-center bg-white p-4 shadow-md gap-3 min-h-[50px] z-20'>
          <h2 className='font-semibold'>Cart</h2>
          <Link to='/' className='lg:hidden'>
            <IoCloseCircle size={25} />
          </Link>
          <button onClick={onClose} className='hidden lg:block'>
            <IoCloseCircle size={25} />
          </button>
        </div>

        {cart[0] ? (
          <div className='flex-1 flex flex-col bg-blue-50 min-h-[75vh] lg-min-h-[80vh]max-h-[calc(100vh-150px)] overflow-hidden overflow-y-scroll scrollbar-none scroll-smooth'>
            {/* Display items */}
            <div className='flex-1 px-4 py-2 flex flex-col gap-2  '>
              <div className='flex items-center justify-between gap-1 rounded-full tracking-wide text-blue-500 bg-blue-100 px-4 py-2'>
                <p>Your total saving</p>
                <p>{formatCurrency('INR', totalDiscount)}</p>
              </div>
              <div className='bg-white max-h-[52vh] overflow-hidden overflow-y-scroll scrollbar-none scroll-smooth rounded-lg p-4 grid gap-5'>
                {cart[0] &&
                  cart?.map((item, index) => (
                    <div key={index} className=' w-full gap-4 flex max-w-sm'>
                      <div className='min-w-16 max-h-16 bg-red-600 rounded'>
                        <img
                          src={item?.productId?.images[0]}
                          alt={item?.productId?.name}
                          className='w-full h-full object-scale-down'
                        />
                      </div>
                      <div className='w-full max-w-sm font-semibold text-xs flex flex-col gap-0.5'>
                        <p className='text-ellipsis line-clamp-2'>
                          {item?.productId?.name}
                        </p>
                        <p className='text-neutral-400'>
                          {item?.productId?.unit}
                        </p>
                        <p className='font-semibold'>
                          {formatCurrency(
                            'INR',
                            discountedPrice(
                              item?.productId?.price,
                              item?.productId?.discount
                            )
                          )}
                        </p>
                      </div>
                      <div className='w-14'>
                        <AddToCart data={item?.productId} />
                      </div>
                    </div>
                  ))}
               
              </div>
               <div className='bg-white p-4 rounded text-xs flex flex-col gap-1'>
                  <h3 className='font-semibold'>Bill Details</h3>
                  <div className='flex items-center justify-between gap-3 ml-1'>
                    <p className='font-medium'>Total Items</p>
                    <p className='flex items-center gap-2'>
                      <span className='line-through text-neutral-400'>
                        {formatCurrency('INR', totalPrice)}
                      </span>{' '}
                      <span>
                        {formatCurrency('INR', totalPrice - totalDiscount)}
                      </span>
                    </p>
                  </div>
                  <div className='flex items-center justify-between gap-3 ml-1'>
                    <p className='font-medium'>Total Quantity</p>
                    <p className='flex items-center gap-2'>
                      {totalQuantity} items
                    </p>
                  </div>
                  <div className='flex items-center justify-between gap-3 ml-1'>
                    <p className='font-medium'>Delivery Charges</p>
                    <p className='flex items-center gap-2'>
                      {!deliveryCharges ? 'Free' : formatCurrency('INR', deliveryCharges)}
                    </p>
                  </div>
                  <div className='flex items-center justify-between gap-3 ml-1'>
                    <p className='font-bold'>Grand Total</p>
                    <p className='font-bold'>
                      {formatCurrency(
                        'INR',
                        totalPrice + deliveryCharges - totalDiscount
                      )}
                    </p>
                  </div>
                </div>
            </div>
            {/* payment */}
            <div className='fixed bottom-0 w-full '>
              <div className='max-w-sm flex items-center justify-between p-2  bg-green-700 text-neutral-100 shadow-inner gap-4'>
                <div>
                  Total=
                  {formatCurrency(
                    'INR',
                    totalPrice + deliveryCharges - totalDiscount
                  )}
                </div>
                <div className=''>
                  <button onClick={handleRedirectCheckOut}
                    className={`bg-primary-200 p-2 w-fit rounded capitalize font-medium text-white`}
                  >
                    proceed to pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='bg-white flex flex-col items-center'>
            <img
              src={empty_cart}
              alt='empty_cart'
              className='w-full h-full object-scale-down'
            />
            <Link
              to='/'
              className='bg-blue-400 p-4 rounded font-semibold text-neutral-100'
              onClick={() => onClose()}
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplaycartItems;
