import { useEffect, useState } from 'react';
import CategorySlide from '../skeleton/CategorySlide';
import { productApi } from '../common/api';
import CardProduct from '../components/CardProduct';
import { useSearchParams } from 'react-router-dom';
import NoData from '../components/NoData';
import { toast } from 'react-toastify';
const Search = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [params] = useSearchParams();
  let searchText=''
  if(params.get('search')){
    searchText = params.get('search');
  }
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await productApi.searchProducts(
        currentPage,
        limit,
        searchText
      );
      setData(response?.data?.data);
      setMessage(response?.message)
      setTotalPages(Math.ceil(response?.data?.totalDocuments / limit));
    } catch (error) {
      toast.error(error?.message)
      setMessage(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, limit, searchText]);
  const handlePage = (page) => {
    if (currentPage === page || currentPage <= 0) {
      return;
    }
    setCurrentPage(page);
  };
  const handleNextPage = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };
  if(isLoading){
    return (
      <section className=' w-full scrollbar-none scroll-smooth'>
      <div className='fixted w-full top-0  min-h-[82vh] scrollbar-none scroll-smooth'>
       <div className='mt-7 sm:mt-16 max-h-[65vh] sm:max-h-[65vh] overflow-hidden overflow-y-auto scrollbar-none scroll-smooth grid justify-items-center grid-cols-1 gap-1  sm:grid-cols-3 scroll-none md:grid-cols-4 lg:grid-cols-5 sm:gap-4 lg:gap-5  p-4'>
        <CategorySlide length={20} />
    </div>
    </div>
    </section>)
  }
  return (
    <section className=' w-full scrollbar-none scroll-smooth'>
      <div className='fixted w-full top-0  min-h-[82vh] scrollbar-none scroll-smooth'>
        <div className='fixed top-24 sm:top-20  w-full  py-4 capitalize font-semibold flex items-center justify-between p-2 sm:px-10 gap-4'>
          <p className='text-xs sm:text-sm'>
            search Results: <span>{data && data?.length}</span>
          </p>
          <div className='flex items-center gap-2 '>
            <p className='text-xs sm:text-base font-medium'>show</p>
            <select className='w-16 cursor-pointer border text-base font-medium border-gray-300 outline-none rounded' name="limit" id="limit" value={limit} onChange={(e)=>setLimit(e.target.value)}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className='mt-7 sm:mt-16 max-h-[65vh] sm:max-h-[65vh] overflow-hidden overflow-y-auto scrollbar-none scroll-smooth grid justify-items-center grid-cols-1 gap-1  sm:grid-cols-3 scroll-none md:grid-cols-4 lg:grid-cols-5 sm:gap-4 lg:gap-5  p-4'>
          
            <>
              { data && data.length > 0 && (data?.map((item, index) => (
                <CardProduct key={index} data={item} />
              )))
              }
            </>
            <>
              {  !data  && (<NoData label={message}/>)
              }
            </>
          
        </div>
      </div>
       {
        totalPages && totalPages > 1 && ( <div className='bg-gray-500/30 z-30 fixed bottom-12 w-full p-2 flex gap-2 items-center justify-center text-gray-800 font-semibold'>
     
        {currentPage > 1 && (
          <button
            onClick={handlePrevPage}
            className={`w-fit px-1 capitalize font-semibold text-black bg-primary-200 rounded`}
          >
            prev
          </button>
        )}

        {totalPages && 
          [...Array(totalPages)]?.map((_, index) => (
            <span
              onClick={() => handlePage(index + 1)}
              className={`w-6 h-6 p-1  rounded text-center inline-block  text-xs font-semibold ${
                currentPage === index + 1
                  ? 'bg-red-400 text-slate-200 cursor-not-allowed'
                  : 'bg-red-600 text-white cursor-pointer'
              }`}
              key={index}
            >
              {index + 1}
            </span>
          ))}
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            className={`w-fit px-1 capitalize font-semibold text-black bg-primary-200 rounded`}
          >
            next
          </button>
        )}
      </div>)
      }
     
    </section>
  );
};

export default Search;
