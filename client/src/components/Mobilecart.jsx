import formatCurrency from '../utils/currencyFormat';
import { BsCart4 } from 'react-icons/bs';
import {
  getCartQuantity,
  getTotalDiscount,
  getTotalPrice,
} from '../features/cart/cartSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Mobilecart = () => {
    const {cart} = useSelector((state)=>state?.cart);
  const totalQuantity = useSelector(getCartQuantity);
  const totalPrice = useSelector(getTotalPrice);
  const totalDiscount = useSelector(getTotalDiscount);
  return (
    <>
    {
        cart[0] && (
 <div  className={`p-2 fixed bottom-20 right-0 z-40 cursor-pointer text-neutral-100 flex lg:hidden`}>

    <Link to='/cart' className='bg-green-600 p-2 rounded'>
      <div className='flex gap-1'>
        <div className='z-20'>
          <BsCart4 size={22} />
        </div>
        <div className='text-xs font-semibold tracking-widest'>
          <p>{totalQuantity} items</p>
          <p>{formatCurrency('INR', totalPrice - totalDiscount)}</p>
        </div>
      </div>
    </Link>
     </div>
        )
    }
    </>
    

  );
};

export default Mobilecart;
