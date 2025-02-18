import { useEffect, useState } from "react"
import UploadCategory from "../components/UploadCategory"
import Categories from "../components/Categories";
import { useSelector } from 'react-redux';

// import Divider from "../components/Divider"
const Category = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const {allCategories} = useSelector(state=>state.category)
    useEffect(() => {
        setCategories(allCategories);
      }, [allCategories]);
    const toggleModal = () =>{ 
      setIsOpen(!isOpen);
      window.scrollTo(0, 0);
    };
  return (
    <section className="">
        <div className=" sm:p-2 h-14 bg-white shadow-md flex justify-between items-center [&::-webkit-scrollbar]:hidden">
       <h1 className='tracking-widest  uppercase text-sm sm:text-xl font-semibold'>category</h1>
       <button onClick={toggleModal} className="text-xs sm:text-sm bg-primary-200 hover:bg-primary-100 border border-gray-500 rounded-sm text-white uppercase py-1 px-3 tracking-widest sm:font-semibold">Add category</button>
        </div>
        {/* category model to upload cotegory */}
        {
            isOpen && (
                  <UploadCategory closeModel={toggleModal} />
            )
        }
     <div className="max-h-[69.9vh] overflow-hidden overflow-y-scroll [&::-webkit-scrollbar]:hidden p-4">
      <Categories categories={categories} />
     </div>
     
    </section>
  )
}

export default Category