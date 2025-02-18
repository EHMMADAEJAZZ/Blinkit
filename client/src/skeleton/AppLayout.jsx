
const AppLayout = () => {
  return (
     <section className="max-h-[82dvh] overflow-hidden overflow-y-scroll">
           <div className="container mx-auto px-4">
             <div className={`my-2 w-full  min-h-48  animate-plus bg-slate-200 animate-pulse `}>
              
             </div>
           </div>
           <div className="container mx-auto px-4 my-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
     
           </div>
         </section>
  )
}

export default AppLayout