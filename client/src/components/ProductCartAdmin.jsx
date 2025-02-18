import formatCurrency from "../utils/currencyFormat";
import { Link, useNavigate } from "react-router-dom";
import discountedPrice from "../utils/pricewithDiscount";
import validUrl from '../utils/createValidUrl';
const ProductCartAdmin = ({data,handleDelete}) => {
    
    const {name,images,unit,price,discount}= data;
   const navigate = useNavigate()
const pricewithDiscount= discountedPrice(price,discount);
 const url = ` ${validUrl(data?.name)}-${data._id}`;
  return (
    <Link to={`/product/${url}`} className="w-full">
        <div className="w-full  rounded-md rounded-b-none">
            <img
            src={images[0]}
            alt={name}
            className="w-full h-full rounded-md rounded-b-none object-scale-down"
            />
        </div>
        <div className="p-2">
        <p className="text-ellipsis line-clamp-2 text-xs font-extrabold">{name}</p>
            <p>{unit}</p>
            <div className="text-sm flex gap-1"> <span className="line-through text-red-500">{formatCurrency('inr',price) }</span>
            
            <p className="flex items-center gap-1">
                <span className="text-green-600 font-semibold">{formatCurrency('inr',pricewithDiscount)}</span>
            <span className="text-orange-600 text-xs">{discount}%</span>
            </p>
        </div>
        <div className='flex lg:hidden gap-2 items-center px-2 h-12 lg:group-hover:flex transition-all duration-1000'>
                <button
                   onClick={(e)=>{
                    e.preventDefault();
                     e.stopPropagation();
                    navigate(`/dashboard/product/${data._id}`)}
                  }
                    type="button"
                  className='flex-1 bg-green-400 rounded border border-gray-800 px-2 py-1 text-xs font-semibold hover:bg-green-700 hover:text-white hover:scale-110'
                >
                  Edit
                </button>
                <button
                  onClick={(e) =>{ 
                     e.preventDefault();
                    e.stopPropagation();
                    handleDelete(data._id)}
                  }
                  type="button"
                 className='flex-1 bg-red-600 rounded border border-gray-800 px-2 py-1 text-white text-xs font-semibold hover:bg-red-700 hover:scale-110'>
                  
                    Delete
                  
                </button>
              </div>
           
            </div>
          
    </Link>
  )
}

export default ProductCartAdmin