const ProductCartSkeleton = () => {
  return (
    <div className='w-full bg-white'>
      <div className='w-full h-20 rounded-md rounded-b-none animate-pulse transition-all duration-300 bg-gray-300'>
        <img
          src={''}
          alt=''
          className='w-full h-full rounded-md rounded-b-none object-scale-down'
        />
      </div>
      <div className='p-2 h-10 bg-gray-300 my-2 animate-pulse transition-all duration-300'>
        <p className='text-ellipsis line-clamp-2 text-xs font-extrabold'>
          {''}
        </p>
        <p>{''}</p>
        <div className='text-sm flex gap-1'>
          {' '}
          <span className='line-through text-red-500'>{''}</span>
          <p className='flex items-center gap-1'>
            <span className='text-green-600 font-semibold'>{''}</span>
            <span className='text-orange-600 text-xs'>{''}</span>
          </p>
        </div>
       
      </div>
       <div className='flex gap-2 items-center px-2 h-12  transition-all duration-1000'>
          <button
            className='flex-1 animate-pulse transition-all duration-300 bg-gray-300 rounded border border-gray-100 px-2 py-2 text-xs font-semibold'
          >
            {''}
          </button>
          <button
            className='flex-1 animate-pulse transition-all duration-300 bg-gray-300 rounded border border-gray-100 px-2 py-2 text-white text-xs font-semibold'
          >
            {''}
          </button>
        </div>
    </div>
  );
};

export default ProductCartSkeleton;
