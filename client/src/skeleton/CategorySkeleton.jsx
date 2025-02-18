
const CategorySkeleton = () => {
    const categories = new Array(10).fill("")
  return (
     <div className='w-full grid grid-col-1 xs:grid-cols-2 content-center items-center sm:grid-cols-3 p-4  md:grid-cols-5 lg:grid-cols-5 gap-4'>
          {categories.map((_,index) => (
            <div
              key={index}
              className='border-2 border-gray-400 rounded-md shadow-md shadow-gray-500 bg-[#e9f0fb] w-full xs:w-40 h-56 overflow-hidden hover:scale-105 transition-all duration-300 group'
            >
              <div className=' h-44 w-full animate-pulse  text-center overflow-hidden'>
                <img
                  src=""
                  alt=""
                  className='w-full h-full '
                />
              </div>
              <div className='hidden gap-2 items-center px-2 h-12 group-hover:flex'>
                <button
                  
                  className='flex-1 bg-green-400 rounded border border-gray-800 px-2 py-1 text-xs font-semibold'
                >
                  
                </button>
                <button
                 
                 className='flex-1 bg-red-600 rounded border border-gray-800 px-2 py-1 text-white text-xs font-semibold'>
                  
                    
                  
                </button>
              </div>
            </div>
          ))}
        </div>
  )
}

export default CategorySkeleton