import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { productApi } from '../common/api';
import { useEffect, useState } from 'react';
import ProductCartSkeleton from '../skeleton/ProductCartSkeleton';
import CardProduct from '../components/CardProduct';
import NoData from '../components/NoData';
import { toast } from 'react-toastify';

const CategoryListingPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { allSubCategories } = useSelector((state) => state.subCategory);
  console.log(allSubCategories);
  const {categoryId,subcategoryId,category} = useParams();
  // console.log(id.split()[0]);
  const subcategory = allSubCategories.find((sub) => {
    const filtered = sub.category.some((cat) => {
      return cat._id === categoryId;
    });
    return filtered;
  });
  
  const subcategoryName = subcategory?.name;
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await productApi.fetchProductsByCategoryAndSubcategory(
        categoryId,
        subcategoryId,
        currentPage,
        limit
      );
      setData(response?.data?.data);
      setTotalPages(Math.ceil(response?.data?.totalDocuments / limit));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const sub = allSubCategories.filter(s=>{
    return s.category.some((cat) => {
      return cat._id === categoryId
    });
  })
  console.log(categoryId,sub)
  useEffect(() => {
    fetchData();
  }, [categoryId,subcategoryId]);
 
  const handlePrevPageChange = () => {
    if (currentPage > 1) {
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
  
  return (
    <section className=''>
      <div className='fixed top-28 sm:top-20 w-full grid grid-cols-[120px_1fr] sm:grid-cols-[200px_1fr] min-h-[82vh]  max-h-[82vh]'>
        <div className='max-h-[75vh] sm:min-h-[82vh]  sm:max-h-[82vh] py-4 sm:p-2 border-r-2 z-50 shadow-slate-400/40 shadow-2xl overflow-hidden overflow-y-scroll customscrollbar  grid gap-4'>
        
          {
            sub.map((s,index)=>{
             
              return(
              
              <Link to={`/${category}/${s?.category[0]._id}/${s._id}`} key={index} className={`w-full flex flex-col lg:flex-row items-center cursor-pointer p-4 sm:p-2 shadow-lg gap-2 border-b-2 ${subcategoryId===s._id?"bg-green-200":"bg-white"} hover:bg-green-600/30`}>
                <div className={`max-w-12 min-w-16 mx-auto lg:mx-0 max-sm:hidden `}>
                  <img src={s.image} alt={s?.name} className='w-16 h-16 object-scale-down' />
                </div>
                <p className='text-xs text-wrap   text-center lg:text-left -mt-3'>{s?.name}</p>
              </Link>
            )})
          }
        
        </div>
        {/* poducts */}
        <div className=' max-h-[82vh]  '>
           <div className='bg-white shadow-lg p-4'>
                  <h3 className='text-base sm:text-xl font-semibold'> {subcategoryName}</h3>
                </div>
          <div className={`max-h-[65vh] sm:min-h-[70vh] sm:max-h-[69vh]   overflow-hidden overflow-y-scroll scrollbar-none  grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4 justify-items-center`}>
            {isLoading &&
              [...Array(24)].map((_, i) => <ProductCartSkeleton key={i} />)}
              
               {
               data.length>0 ? (data?.map((product,index)=>(
                    <CardProduct data={product} key={index} />
                ))):(
                  <div>
                    <NoData label='No Product Found' />
                  </div>
                )
               }
              
          </div>
          {totalPages > 1 && (
          <div className={`fixed bottom-10 bg-white w-full shadow-2xl border-t-2  ${totalPages > 1 ? 'flex ':"hidden"}  gap-2 items-center min-h-14 px-2  flex-wrap`}>
            <button
            onClick={handlePrevPageChange}
            className={`px-1 py-0.5 text-center  rounded border bg-primary-200 hover:bg-primary-100 cursor-pointer border-gray-500 w-fit  text-xs font-semibold capitalize text-black tracking-widest  `}
          >
            prev
          </button>
          <div className=' items-center flex  gap-1 '>
          
              <span className='text-sm sm:text-lg text-gray-800'>{currentPage} / {totalPages}</span>
          </div>
          <button
            onClick={handleNextPageChange}
            className={`px-1 py-0.5 text-center rounded border bg-primary-200  hover:bg-primary-100 cursor-pointer border-gray-500 w-fit text-xs font-semibold capitalize text-black tracking-widest  `}
          >
            next
          </button>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryListingPage;
