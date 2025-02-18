import EditProduct from "../components/EditProduct";
import { productApi } from '../common/api';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Spinner from "../UI/Spinner";

const UpdateProuct = () => {
   const [isLoading, setisLoading] = useState(false);
    const [product, setProduct] = useState(null);
      const { id } = useParams();
       const fetchProduct = async () => {
          setisLoading(true);
          try {
            const response = await productApi.fetchProductDetails(id);
            setProduct(response?.data);
          } catch (error) {
            toast.error(error?.message);
          } finally {
            setisLoading(false);
          }
        };
        useEffect(() => {
          fetchProduct();
        }, [id]);
        if(isLoading){
            return <div>
                <Spinner/>
            </div>;
        }
  return (
    <section className="">
        <div className=" p-2 h-14 bg-white shadow-md flex justify-between items-center">
       <h1 className='tracking-widest  uppercase text-sm sm:text-xl font-semibold'>Edit products</h1>
        
        </div>
         <div className="max-h-[69.9vh] overflow-hidden overflow-y-scroll">
        <EditProduct data={product} fetchProduct={fetchProduct}/>
       </div>
        </section>
  )
}

export default UpdateProuct