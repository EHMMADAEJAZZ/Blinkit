const CategorySlide = ({length=6}) => {
  return (
    <>
      {new Array(length).fill(null).map((_, index) => (
        <div key={index} className='h-52 border p-2 grid gap-2 w-full sm:max-w-52 animate-pulse'>
          <div className='min-h-14 bg-blue-100 rounded'></div>
          <div className='p-3 w-20 bg-blue-100 rounded'></div>
          <div className='p-3 bg-blue-100 rounded'></div>
          <div className='p-3 w-14 bg-blue-100 rounded'></div>
          
          <div className='flex items-center justify-between gap-4'>
            <div className='p-3 w-20 bg-blue-100 rounded'></div>
            <div className='p-3 w-20 bg-blue-100 rounded'></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorySlide;
