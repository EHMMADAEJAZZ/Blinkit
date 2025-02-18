import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { productApi } from "../common/api"
import CategorySlide from "../skeleton/CategorySlide"
import CardProduct from "./CardProduct"
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux"
import validUrl from "../utils/createValidUrl"

const CategoryWiseProducts = ({categoryId,categoryName}) => {

   const [categoryData, setCategoryData] = useState([])

   const [isLoading, setIsLoading] = useState(true)
   const refContainer = useRef()
     const { allSubCategories } = useSelector((state) => state.subCategory);
   // Fetching category data on component mount
    const fetchData = async () => {
         setIsLoading(true)
         try {
            const response = await productApi.fetchProductsByCategory(categoryId)
            setCategoryData(response?.data?.data)
         } catch (error) {
            console.error('Error fetching data:', error?.message)
         }finally{
            setIsLoading(false)
         }
      }
   useEffect(() => {
      fetchData()
   }, [])
const scrollLeft =()=>{
    refContainer.current.scrollLeft -= 200;
}
const scrollRight =()=>{
    refContainer.current.scrollLeft += 200;
}
  const handeRedirect = (categoryId, categoryName) => {
    const subcategory = allSubCategories.find((sub) => {
    const filtered = sub.category.some((cat) => {
      return cat._id === categoryId;
    });
    return filtered;
  });
//   const url =validUrl(categoryName)
  const url =`/${validUrl(categoryName)}/${categoryId}/${subcategory?._id}`;
  return url
  };
  const redirect = handeRedirect(categoryId, categoryName)
  // Rendering product list
  return (
    <div className="container mx-auto px-4 my-5 relative">
        <div className="flex items-center justify-between ">
            <h2 className="text-sm sm:text-lg md:text-xl font-semibold capitalize">{categoryName}</h2>
            <Link to={redirect} className="text-green-600 capitalize">see All</Link>
           
        </div>
        <div className="w-full flex items-center  gap-2 sm:gap-4 lg:gap-8 overflow-hidden
          overflow-x-scroll mt-2 scroll-smooth " ref={refContainer}>

        {
            isLoading && (<CategorySlide/>)
        }
        {
            categoryData.length > 0 && categoryData.map((product,index) => (
                <CardProduct data={product} key={index}/>
            ))
        }
        <div className="hidden w-full absolute md:flex justify-between p-2 ">
         <button onClick={scrollLeft} className=" rounded-full bg-white shadow-2xl z-30 border border-gray-500/30 text-center p-1 hover:bg-yellow-300/80 hover:scale-110 transition-all duration-300">
            <FaAngleLeft className="text-2xl hover:text-black p-1"/>
         </button>
         <button onClick={scrollRight} className="rounded-full bg-white shadow-2xl z-30 border border-gray-500/30 text-center p-1 hover:bg-yellow-300/80 hover:scale-110 transition-all duration-300">
            <FaAngleRight className="text-2xl hover:text-black p-1 "/>
         </button>
        </div>
        </div>
        
    </div>
  )
}

export default CategoryWiseProducts