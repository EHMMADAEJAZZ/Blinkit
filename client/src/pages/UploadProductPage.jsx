import UploadProduct from "../components/UploadProduct";
const UploadProductPage = () => {
  
   
  return (
    <section className="">
        <div className=" p-2 h-14 bg-white shadow-md flex justify-between items-center">
       <h1 className='tracking-widest  uppercase text-sm sm:text-xl font-semibold'>Add products</h1>
       
      
        </div>
         <div className="max-h-[69.9vh] overflow-hidden overflow-y-scroll scrollbar-none">
        <UploadProduct/>
       </div>
        </section>
  )
}

export default UploadProductPage