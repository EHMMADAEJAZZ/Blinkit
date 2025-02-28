import {useState } from 'react';
;
import NoData from './NoData';
import UpdateCategory from './UpdateCategory';
import ConfirmBox from './ConfirmBox';
import CategorySkeleton from '../skeleton/CategorySkeleton';


const Categories = ({categories,isLoading}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
const [data,setData] = useState({})

  const toggleModal = () => {
    setIsOpen(!isOpen);
    window.scrollTo(0, 0);
  };
  const toggleDeleteModal = () => {
    setIsOpenDelete(!isOpenDelete);
    window.scrollTo(0, 0);
  };
  if (isLoading) {
    return (
      <div>

      <CategorySkeleton/>
      </div>
    );
  }
  return (
    <div>
      {categories.length > 0 ? (
        <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 [&::-webkit-scrollbar]:hidden'>
          {categories.map((category) => (
            <div
              key={category._id}
              className='border-2 border-gray-400 rounded-md shadow-md shadow-gray-500 bg-[#e9f0fb] w-full xs:w-40 h-56 overflow-hidden hover:scale-105 [&::-webkit-scrollbar]:hidden transition-all duration-300 group'
            >
              <div className=' h-44 w-full   text-center overflow-hidden'>
                <img
                  src={category.image}
                  alt={category.name}
                  className='w-full h-full '
                />
              </div>
              <div className='flex lg:hidden gap-2 items-center px-2 h-12 lg:group-hover:flex'>
                <button
                  onClick={() => {
                    toggleModal();
                    setData(category)
                  }}
                  className='flex-1 bg-green-400 rounded border border-gray-800 px-2 py-1 text-xs font-semibold'
                >
                  Edit
                </button>
                <button
                 onClick={() => {
                    toggleDeleteModal();
                    setData(category)
                  }}
                 className='flex-1 bg-red-600 rounded border border-gray-800 px-2 py-1 text-white text-xs font-semibold'>
                  
                    Delete
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      ) :  (
        <div className='mt-5  flex justify-center items-center'>
          <NoData />
        </div>
      )}
      {isOpen && <UpdateCategory closeModel={toggleModal} data={data} getCategories={''}  />}
      {isOpenDelete && <ConfirmBox closeModel={toggleDeleteModal} data={data} getCategories={''}  />}
    </div>
  );
};

export default Categories;
