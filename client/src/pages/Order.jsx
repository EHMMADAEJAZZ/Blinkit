import { useEffect} from "react"
import { UseGlobalContext } from "../context/globalContext";
import {  useSelector } from "react-redux";
import NoData from "../components/NoData";
import formatCurrency from "../utils/currencyFormat";

const Order = () => {
  const {loading,fetchOrders}=UseGlobalContext()
const {orderList}=  useSelector(state=>state.orders)
  
  useEffect(() => {
    fetchOrders();
    
  }, []);
  if(loading){
    return <div>Loading...</div>
  }
  return (
     <section className='bg-blue-50 fixed w-full top-28 sm:top-20 p-0 sm:p-1'>
      <div className='w-full shadow border-b-2  bg-white p-2 flex items-center justify-between'>
        <h3 className='font-semibold text-lg tracking-widest'>My Orders</h3>
       
      </div>
      <div className='bg-white w-full  min-h-[63vh] sm:min-h-[72vh] max-h-[63vh] sm:max-h-[72vh] overflow-hidden overflow-y-scroll scrollbar-none scroll-smooth '>
        {!orderList[0] && (<div className=" max-w-lg ">
          <NoData/></div>)}
        <div>

        {orderList[0] && orderList.map((order, index) => (
          <div key={index} className='p-4 shadow-md'>
            <p className='text-xs font-medium'>order No {order?.orderId}</p>
            <div>
              {
                order?.products.map((product, index) =>(
                  <div key={index} className="flex gap-3 items-center ">
                    <img src={product?.product?.images[0]} alt={product?.product?.name} className="w-14 h-14 object-scale-down" />
                    <div className="flex flex-col gap-1">
                   <p className="font-semibold text-xs" >{product?.product?.name} </p>
                   <p className="text-xs">quantity {product?.quantity}</p>

                    </div>
                    
                  </div>
                ))
              }
            </div>
              <p className="text-xs text-red-600">Price: {formatCurrency('INR',order?.totalAmount) }</p>
          </div>
        ))}
        </div>
        </div>
        </section>
  )
}

export default Order