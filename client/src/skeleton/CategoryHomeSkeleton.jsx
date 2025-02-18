
const CategoryHomeSkeleton = () => {
  return (
    <>
     {
          new Array(10).fill(null).map((_,index)=>(
            <div key={index} className=" min-h-36 rounded p-4 bg-white grid gap-2 shadow animate-pulse">
            <div className="min-h-20 bg-blue-100 rounded "></div>
            <div className="bg-blue-100 h-8 rounded"></div>
            <div className="grid gap-4 grid-cols-2">
              <div className="bg-blue-100 h-8 rounded"></div>
              <div className="bg-blue-100 h-8 rounded"></div>
            </div>
            </div>
          ))
        }
    </>
  )
}

export default CategoryHomeSkeleton