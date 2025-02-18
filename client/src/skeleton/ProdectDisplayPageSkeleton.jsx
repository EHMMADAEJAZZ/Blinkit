
const ProdectDisplayPageSkeleton = () => {
    const product = new Array(6).fill(null)
  return (
    <div className="animate-pulse">
         <div className='fixed  top-28 sm:top-20 w-full grid grid-cols-1 md:grid-cols-[500px_1fr] max-h-[80vh] min-h-[80vh] md:max-h-[82vh] md:min-h-[82vh] overflow-hidden overflow-y-scroll customscrollbar scroll-smooth bg-gray-300/60'>
        <div className='p-4 border-r-2'>
          <div className='w-full min-h-56 max-h-56  bg-white shadow-2xl rounded '>
            <img
              src={''}
              alt=''
              className='w-full min-h-56 max-h-56 object-scale-down bg-gray-300'
            />
          </div>
          <div className='flex gap-4 items-center justify-center my-5'>
            {
              product.map((_, index) => (
                <span
                  key={index}
                  className={`inline-block text-center w-3 h-3  rounded-full 
                   bg-gray-500/30
                  `}
                >
                  {''}
                </span>
              ))}
          </div>
          <div className='flex gap-4 items-center  my-5  flex-wrap'>
            {
              product?.map((_, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 sm:w-20 sm:h-20 border p-1 rounded  `}
                  
                >
                  <img
                    src={''}
                    alt=''
                    className='w-full h-full rounded cursor-pointer hover:opacity-90 object-scale-down bg-gray-300'
                  />
                </div>
              ))}
          </div>
          <div className='my-2'>
            
              
              <div className='flex text-xs sm:text-sm items-center gap-2 '>
                <p>{''}</p>
                <img
                  src={''}
                  alt=''
                  className='w-6 h-6 bg-gray-300'
                />
                <p className="w-full p-6 bg-gray-300/40"></p>
              </div>
            
          </div>
          
          <div>
           <p className=' font-semibold'></p>
          <p className=' text-base text-justify'>{''}</p>
          </div>
        </div>
        <div className='  shadow-inner p-4 md:pl-7 md:max-h-[82vh] md:min-h-[82vh] overflow-hidden overflow-y-scroll customscrollbar scrollbar-none scroll-smooth'>
          <p className='w-fit text-xs lg:text-sm '>
            {''}
          </p>
          <h1 className='text-lg bg-gray-300/80 p-5 md:text-xl font-semibold capitalize truncate'>
            {''}
          </h1>
         
          <div className='flex items-center gap-1 my-2'>
            <p></p>
            <p className='line-through text-red-600'>
              {''}
            </p>
            <p className='text-gray-600 bg-gray-300 text-sm md:text-xl font-semibold border p-2 w-20'>
              {''}
            </p>
         
              <p className=' flex items-center flex-wrap text-yellow-600 text-[10px] sm:text-sm truncate gap-1 w-20 p-2 bg-gray-300'>
                <span>{''}</span> <span>{''}</span>
              </p>
          
          </div>
          <p className='my-2 text-sm text-justify p-4 bg-gray-300'>{''}</p>
          <div className='w-20'>
              <button className="w-20 p-5 bg-gray-300">{''}</button>
          </div>
         
          <h2 className='text-lg sm:text-xl font-semibold p-5 bg-gray-300 my-2'>
            {''}
          </h2>
          <div className='flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-3 my-4 '>
            <div>
              <img
                src={''}
                alt=''
                className='w-14 h-14 sm:w-20 sm:h-20 bg-gray-300'
              />
            </div>
            <div className='my-2 text-sm'>
              <h4 className='font-semibold p-2 bg-gray-300 w-20'>{''}</h4>
              <p className='text-justify p-2 bg-gray-300 my-1 w-20'>
                {''}
              </p>
            </div>
          </div>
          <div className='flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-3 my-4 '>
            <div>
              <img
                src={''}
                alt=''
                className='w-14 h-14 sm:w-20 sm:h-20 bg-gray-300'
              />
            </div>
            <div className='my-2 text-sm'>
             <h4 className='font-semibold p-2 bg-gray-300 w-20'>{''}</h4>
              <p className='text-justify p-2 bg-gray-300 my-1 w-20'>
               {''}
              </p>
            </div>
          </div>
          <div className='flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-3 my-4 '>
            <div>
              <img
                src={''}
                alt=''
                className='w-14 h-14 sm:w-20 sm:h-20 bg-gray-300'
              />
            </div>
            <div className='my-2 text-sm'>
              <h4 className='font-semibold p-2 bg-gray-300 w-20'>{''}</h4>
              <p className='text-justify p-2 bg-gray-300 my-1 w-20'>
                {''}
              </p>
            </div>
          </div>
          <div>
            <h2 className='text-sm md:text-lg font-semibold capitalize my-2 underline p-2 bg-gray-300'>
              {''}
            </h2>
            <div className='grid gap-2'>
              {product?.moreDetails &&
                Object.keys(product?.moreDetails).map(
                  (key, index) => (
                    <div key={index} className=''>
                      <p className='text-sm text-justify'>
                        <span className=' font-semibold'>{key}:</span> {product?.moreDetails[key]}
                      </p>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProdectDisplayPageSkeleton