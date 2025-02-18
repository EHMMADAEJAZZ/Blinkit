import { useEffect, useState } from "react";
import UploadSubCategory from "../components/UploadSubCategory";
import SubCategory from "../components/SubCategory";
import { subcategoryApis } from "../common/api";
import { toast } from "react-toastify";

const SubCategoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
   const [isOpen, setIsOpen] = useState(false);
   const [subCategories, setSubCategories] = useState([]);
      const toggleModal = () =>{ 
        setIsOpen(!isOpen);
        window.scrollTo(0, 0);
      };
      const fetchSubCategory = async() =>{
        setIsLoading(true)
        try {
          const data = await subcategoryApis.fetchSubCategories();
          setSubCategories(data?.data);
          
        } catch (error) {
         if(error?.message){

        toast.error(error?.message);
      }
        }finally{
          setIsLoading(false)
        }
      }
      useEffect(() => {
        fetchSubCategory();
      }, [])
  return (
    <section className="">
        <div className=" sm:p-2 h-14 bg-white shadow-md flex justify-between items-center">
       <h1 className='  uppercase text-sm sm:text-xl font-semibold tracking-widest'>sub category</h1>
       <button onClick={toggleModal} className="text-xs sm:text-sm bg-primary-200 hover:bg-primary-100 border border-gray-500 rounded-sm text-white uppercase py-1 px-3 tracking-widest sm:font-semibold">Add sub category</button>
        </div>
        <div className="max-h-[69.9vh] overflow-hidden overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          <SubCategory data={subCategories} isLoading={isLoading} fetchSubCategory={fetchSubCategory} />
        </div>
        {/* sub category model to upload sub category */}
        {
            isOpen && (
                  <UploadSubCategory closeModel={toggleModal} fetchSubCategory={fetchSubCategory} />
            )
        }
        </section>
  )
}

export default SubCategoryPage