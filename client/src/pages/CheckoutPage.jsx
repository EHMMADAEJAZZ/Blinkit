import { useSelector } from 'react-redux';
import {
  getCartQuantity,
  getTotalDiscount,
  getTotalPrice,
} from '../features/cart/cartSlice';
import formatCurrency from '../utils/currencyFormat';
import { useEffect, useState } from 'react';
import AddAddress from '../components/AddAddress';
import { UseGlobalContext } from '../context/globalContext';
import { orderApi } from '../common/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const totalQuantity = useSelector(getCartQuantity);
  //   const { userDetails } = useSelector((state) => state.user);
  const totalPrice = useSelector(getTotalPrice);
  const totalDiscount = useSelector(getTotalDiscount);
  const { addreseList } = useSelector((state) => state.address);
  const { cart } = useSelector((state) => state.cart);
  const { fetchAddresses, fetchCartItems,fetchOrders } = UseGlobalContext();
  const deliveryCharges = 0;
  const navigate = useNavigate()
  const toggleAddAddress = () => {
    setIsAddressOpen(!isAddressOpen);
  };
  useEffect(() => {
    if (addreseList[0]) {
      const defaultAddress = addreseList?.findIndex((ad) => ad?.isDefault);
      console.log(defaultAddress);
      setSelectedAddress(defaultAddress);
    }
    fetchAddresses();
  }, []);
  const cashOnDeliveryOrder = async () => {
    const shippingAddressId = addreseList[selectedAddress]?._id;
    const cartItems = cart;
    const totalAmount = totalPrice + deliveryCharges - totalDiscount;
    try {
      const response = await orderApi.cashOnDeliveryOrder(
        cartItems,
        shippingAddressId,
        totalAmount
      );
      toast.success(response?.message);
      fetchCartItems();
      fetchOrders()
      navigate('/success',{
        state:{
          text:'order'
        }
      })

    } catch (error) {
      toast.error(error?.message);
    }
  };
  //onLinePaymenyorder
  const onLinePaymentOrder = async () => {
    const shippingAddressId = addreseList[selectedAddress]?._id;
    
    const totalAmount = totalPrice + deliveryCharges - totalDiscount;
    toast.loading('loading')
    try {
      const stripePublicKey=import.meta.env.VITE_STRIPE_PUBLIC_API_KEY;
      const stripePromise =await loadStripe(stripePublicKey)
      const response = await orderApi.onLinePaymentOrder(
        cart,
        shippingAddressId,
        totalAmount
      );
      console.log(response.data)
      stripePromise.redirectToCheckout({sessionId:response.data.id})
      fetchCartItems();
     fetchOrders()

    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <section className='bg-blue-50 fixed w-full top-28 sm:top-20 p-0 sm:p-1'>
      <div className='bg-white  container mx-auto min-h-[74vh] sm:min-h-[79vh] max-h-[74vh] sm:max-h-[79vh] overflow-hidden overflow-y-scroll scrollbar-none scroll-smooth grid md:grid-cols-2  gap-4'>
        {/* addressess */}
        <div className='p-4 '>
          <h3 className='font-semibold text-lg tracking-widest'>
            Choose Your Address
          </h3>

          <div className='my-2 flex flex-col gap-2'>
            {addreseList[0] &&
              addreseList.map((addres, index) => (
                <label
                  htmlFor={`address-${index}`}
                  key={index}
                  className={`${!addres?.status && 'hidden'}`}
                >
                  <div
                    className={`rounded text-xs font-medium flex  gap-2 p-4 shadow-md items-center `}
                  >
                    <div>
                      <input
                        type='radio'
                        defaultChecked={addres?.isDefault}
                        name='address'
                        value={selectedAddress}
                        id={`address-${index}`}
                        onChange={() => setSelectedAddress(index)}
                      />
                    </div>
                    <div>
                      <p>{addres?.addressLine}</p>
                      <p>{addres?.city}</p>
                      <p>
                        <span>{addres?.state}</span>-{' '}
                        <span>{addres?.pincode}</span>
                      </p>
                      <p>{addres?.country}</p>
                    </div>
                  </div>
                </label>
              ))}
            <div
              onClick={toggleAddAddress}
              className='h-10 bg-blue-100 capitalize flex items-center justify-center border-dashed text-sm font-semibold cursor-pointer shadow-lg hover:bg-blue-100 rounded tracking-widest'
            >
              Add address
            </div>
          </div>
        </div>
        {/* summary */}
        <div className='p-4 flex flex-col gap-4 w-full max-w-md  '>
          <h3 className='text-base font-semibold sm:text-lg tracking-widest'>
            Summary
          </h3>
          <div className='bg-white  rounded text-xs flex flex-col gap-1'>
            <h3 className='font-semibold'>Bill Details</h3>
            <div className='flex items-center justify-between gap-3 ml-1'>
              <p className='font-medium'>Total Items</p>
              <p className='flex items-center gap-2'>
                <span className='line-through text-neutral-400'>
                  {formatCurrency('INR', totalPrice)}
                </span>{' '}
                <span>{formatCurrency('INR', totalPrice - totalDiscount)}</span>
              </p>
            </div>
            <div className='flex items-center justify-between gap-3 ml-1'>
              <p className='font-medium'>Total Quantity</p>
              <p className='flex items-center gap-2'>{totalQuantity} items</p>
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
          <div className='flex flex-col gap-4'>
            <button
                type='button'
              onClick={() => onLinePaymentOrder()} 
             className='px-10 py-2 border-2 border-gray-800/50 bg-green-600 text-white font-semibold text-xs rounded hover:bg-green-700'>
              Online Payment
            </button>
            <button
              type='button'
              onClick={() => cashOnDeliveryOrder()}
              className='px-10 py-2 border-2 border-green-600 text-green-500 text-sm font-semibold rounded hover:bg-green-600 hover:text-white'
            >
              {' '}
              Cash on Delevery
            </button>
          </div>
        </div>
      </div>
      {isAddressOpen && <AddAddress onCloseModel={toggleAddAddress} />}
    </section>
  );
};

export default CheckoutPage;
