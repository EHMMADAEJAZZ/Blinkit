
const SubCategorySkeleton = () => {
    const subcate = new Array(20).fill(0);
  return (
    <div className="w-full flex flex-col gap-4 ">
        {subcate.map((_, index) => (
          <div key={index} className="h-10 rounded-sm border border-gray-700  bg-gray-300 animate-ping transition-all duration-500"></div>
        ))}
      <br />

    </div>
  )
}

export default SubCategorySkeleton