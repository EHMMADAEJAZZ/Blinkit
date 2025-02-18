import { Link } from 'react-router-dom';
import formatCurrency from '../utils/currencyFormat';
import validUrl from '../utils/createValidUrl';
import discountedPrice from '../utils/pricewithDiscount';
// import { cartApi } from '../common/api';
// import { toast } from'react-toastify';
// import { useState } from 'react';
// import { UseGlobalContext } from '../context/globalContext';
import AddToCart from './AddToCart';

const CardProduct = ({ data }) => {
  // const [isLoading, setIsLoading] = useState(false)
//  const {fetchCartItems}= UseGlobalContext()
  const url = ` ${validUrl(data?.name)}-${data._id}`;
  const pricewithDiscount = discountedPrice(data?.price, data?.discount);
  
  return (
    <Link
      to={`/product/${url}`}
      className='min-h-72 max-h-[320px] border p-2 grid gap-2 w-full  min-w-[200px] overflow-hidden shadow-lg max-w-[200px] '
    >
      <div className='w-full h-32 rounded p-2'>
        <img
          className='object-scale-down w-full h-32 lg:scale-110 bg-blend-color-burn'
          src={data.images[0]}
          alt={data.name}
        />
      </div>
      <div className=' rounded bg-green-50 text-green-600 text-xs p-1 w-fit font-medium'>
        10 min
      </div>
      <div className=' text-sm truncate overflow-hidden font-medium max-h-10 h-10 capitalize'>
        {data?.name}
      </div>
      <div className=' rounded bg-green-50 text-green-600 text-xs p-1 w-fit font-medium'>
        {data?.unit}
      </div>
        {data?.discount ? (
      <p className='text-xs flex gap-1 h-4'>
        <span className='line-through text-red-600 font-semibold'>
          {formatCurrency('INR', data?.price)}
        </span>
        <span className='text-orange-600'>{data?.discount}% discount</span>
      </p>
        ):<p className='text-xs flex gap-1 h-4'>{''}</p>}
      <div className='flex items-center justify-between gap-4'>
        <div className='rounded bg-red-500 text-red-50 text-sm p-1 w-fit font-medium'>
          {formatCurrency('INR', pricewithDiscount)}
        </div>
        <div className='group'>
         <AddToCart data={data}/>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
