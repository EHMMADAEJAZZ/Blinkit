import { cartApi } from '../common/api';
import { toast } from'react-toastify';
import { useEffect, useState } from 'react';
import { UseGlobalContext } from '../context/globalContext';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa';
const AddToCart = ({data,label='Add'}) => {
      const [isLoading, setIsLoading] = useState(false);
      const [isAvailabe, setIsAvailabe] = useState(false)
      const [quantity, setQuantity] = useState(0)
      const [cartItemDetails, setCartItemDetails] = useState(null)
     const {fetchCartItems,updateCartItemQuantity,loading,deleteCartItem}= UseGlobalContext()
     const {cart} = useSelector((state)=>state?.cart);
    const addToCart = async(e,productId)=>{
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      // add to cart logic here
      const response = await cartApi.addToCart(productId);
      toast.success(response?.message)
      fetchCartItems()
    } catch (error) {
      if(error?.message){

        toast.error(error?.message);
      }
    }finally{
      setIsLoading(false);
    }
  }
 useEffect(()=>{
    const checkItem = cart?.some(item=>item?.productId?._id===data?._id);
    setIsAvailabe(checkItem)
    const product=cart?.find(item=>item?.productId?._id===data?._id)
    setQuantity(product?.quantity)
    setCartItemDetails(product)
 },[data,cart,quantity])
 const increaseQuantity=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    updateCartItemQuantity(cartItemDetails?._id,quantity+1)
 }
 const decreaseQuantity=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    if(quantity >1){
       updateCartItemQuantity(cartItemDetails?._id,quantity-1)
    }  else{
       deleteCartItem(cartItemDetails?._id)
    }
 }
  return (
    <div className='w-full max-w-[100px]'>
         {isAvailabe?(
            <div className='flex gap-1 items-center'>
                <button onClick={decreaseQuantity} className={`flex-1 flex items-center justify-center w-full p-1 rounded bg-green-600 hover:bg-green-500 text-white ${loading?"cursor-wait":"cursor-pointer"}`}><FaMinus size={12}/></button>
                <p className='flex-1 px-1 full font-semibold text-xs  rounded text-center bg-white'>{quantity}</p>
                <button onClick={increaseQuantity} className={`flex-1 flex items-center justify-center w-full p-1 rounded bg-green-600 hover:bg-green-500 text-white ${loading?"cursor-wait":"cursor-pointer"}`}><FaPlus size={12}/> </button>
            </div>
         ):(   <button onClick={(e)=>addToCart(e,data?._id)} className={`rounded bg-green-600 text-white group-hover:bg-green-700 text-sm px-4 py-1 w-fit font-medium ${isLoading?"cursor-wait":"cursor-pointer"} ${
              data?.stock < 1
                ? 'cursor-not-allowed opacity-60 text-gray-800'
                : 'cursor-pointer text-white'
            }`}>
            {
              isLoading? 'Adding...' : label
            }
          </button>)
         }
    </div>
  )
}

export default AddToCart