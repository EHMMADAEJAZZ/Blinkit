import {  useEffect, useState } from 'react';
import { productApi } from '../common/api';
import ProductCartAdmin from '../components/ProductCartAdmin';
import ProductCartSkeleton from '../skeleton/ProductCartSkeleton';
import { CiSearch } from 'react-icons/ci';
import NoData from '../components/NoData';
import ConfirmDeleteBox from '../components/ConfirmDeleteBox';
import { toast } from 'react-toastify';
const ProductPage = () => {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
const [openConfirmBox, setOpenConfirmBox] = useState(false);
    const [deleteId, SetDeleteId] = useState('');
 

  const allProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productApi.fetchProducts(
        currentPage,
        limit,
        search
      );
      setProduct(response?.data?.data);
      setTotalPages(Math.ceil(response?.data?.totalDocuments / limit));
      setLimit(10)
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    allProducts();
  }, [currentPage, search]);
  const handlePageChange = (page) => {
    if (currentPage === page) {
      return;
    }
    setCurrentPage(page);
  };
  const handlePrevPageChange = () => {
    if (currentPage > 1 ) {
      setCurrentPage(currentPage - 1);
    } else {
      return;
    }
  };
  const handleNextPageChange = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      return;
    }
  };
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setCurrentPage(1);
    setSearch(value);
  };
  function debounce(cb, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
      const toggleConfirmBox = () => {
    setOpenConfirmBox(!openConfirmBox);
  };
   const deleteProduct = async (id) => {
  setIsDeleting(true);
    try {
      const res= await productApi.deleteProduct(id);
      toast.success(res?.message)
    } catch (error) {
      toast.error(error?.message)
      
    }finally{
      setIsDeleting(false);
     
    }
      
    };
     const handleDelete = (id) => {
     toggleConfirmBox();
     SetDeleteId(id);
  };
  const handleChange =debounce( handleSearchChange, 400) ;
  const skeleton = new Array(18).fill('');

  if (isLoading) {
    return (
      <section className=''>
        <div className=' sm:p-2 h-14 bg-white shadow-md flex justify-between items-center'>
          <h1 className='tracking-widest  uppercase text-sm sm:text-xl font-semibold'>
            {''}
          </h1>
          <button className='text-xs sm:text-sm bg-primary-200 hover:bg-primary-100 border border-gray-500 rounded-sm text-white uppercase py-1 px-3 tracking-widest sm:font-semibold'>
            {''}
          </button>
        </div>
        <div className='max-h-[69.9vh] p-2 sm:p-4 overflow-hidden overflow-y-scroll'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 '>
            {skeleton?.map((_, index) => (
              <div
                key={index}
                className='border-2 border-gray-100 rounded-md shadow bg-[#e9f0fb] w-44 sm:32 h-44 lg:w-40 overflow-hidden hover:scale-105 transition-all duration-300 group'
              >
                <ProductCartSkeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className='w-full scrollbar-none'>
      <div className='p-2 z-40   top-28 sm:top-20 w-full bg-white shadow-md flex justify-between items-center gap-2'>
        <h1 className='tracking-widest  uppercase text-sm sm:text-xl font-semibold'>
          products
        </h1>
        <div className='flex  items-center   border  max-w-[300px] xs:w-[300px] border-gray-300 rounded group focus-within:border-primary-200  focus-within:border-l-0 '>
          <CiSearch
            size={35}
            className='w-10 rounded font-semibold p-2 h-10 cursor-pointer group-focus-within:bg-gray-600 group-focus-within:text-white '
          />
          <input
            type='text'
            name='search'
            onChange={handleChange}
            placeholder='search product'
            className='w-full full text-xs p-2 rounded  outline-none '
          />
        </div>
      </div>
      <div className='w-full z-10  max-h-[65vh] p-2 sm:p-6 overflow-hidden overflow-y-scroll scrollbar-none'>
        <div className='min-h-[58dvh] md:min-h-[64dvh] '>
          <div className='w-full grid xs:grid-cols-2 gap-1 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {!products?.length  ? (
              <div className='w-full flex justify-center items-center'>

                <NoData />
              </div>
            ) : (
              products?.map((product, index) => (
                <div
                  key={index}
                  className='border-2 border-gray-400 rounded-md shadow-md shadow-gray-500 bg-[#e9f0fb] [&::-webkit-scrollbar]:hidden  overflow-hidden lg:hover:scale-105  transition-all duration-300 group'
                >
                  <ProductCartAdmin data={product} handleDelete={handleDelete}  />
                   
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <div className='fixed bottom-10 items-center w-full px-4 py-2 bg-gray-400/60  flex flex-wrap gap-3'>
          <button
            onClick={handlePrevPageChange}
            className={`px-2 py-1   rounded border bg-primary-200 hover:bg-primary-100 cursor-pointer border-gray-500 w-16  text-xs font-semibold capitalize text-black tracking-widest ${
              currentPage === 1 ? 'hidden' : 'block'
            } `}
          >
            prev
          </button>

          <div className=' items-center flex  gap-2 '>
            {new Array(totalPages).fill('').map((_, index) => (
              <span
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 text-center text-white  rounded block ${
                  currentPage === index + 1 ? 'bg-red-600 cursor-not-allowed' : 'bg-gray-700 cursor-pointer'
                }`}
                key={index}
              >
                {index + 1}
              </span>
            ))}
          </div>

          <button
            onClick={handleNextPageChange}
            className={`px-2 py-1  rounded border bg-primary-200  hover:bg-primary-100 cursor-pointer border-gray-500 w-16 text-xs font-semibold capitalize text-black tracking-widest  ${
              currentPage === totalPages ? 'hidden' : 'block'
            }`}
          >
            next
          </button>
          
        </div>
      )}
       {openConfirmBox && (
        <div className='w-full  justify-center items-center min-h-screen'>

        <ConfirmDeleteBox
          closeModel={toggleConfirmBox}
          label='Are you sure you want to delete this product?'
          deleteHandler={deleteProduct}
          deleteId={deleteId}
          deleting={isDeleting}
          />
          </div>
      )}
    </section>
  );
};

export default ProductPage;
