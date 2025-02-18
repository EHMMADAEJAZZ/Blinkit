import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import CategoryHomeSkeleton from "../skeleton/CategoryHomeSkeleton.jsx";
import validUrl from "../utils/createValidUrl";
import { useNavigate } from "react-router-dom";
import CategoryWiseProducts from "../components/CategoryWiseProducts";
const Home = () => {
  const {allCategories,isLoading:categoryLoading}=useSelector(state=>state.category);
  const { allSubCategories } = useSelector((state) => state.subCategory);
  const navigate = useNavigate()
   
  const handeRedirect = (categoryId, categoryName) => {
    const subcategory = allSubCategories.find((sub) => {
    const filtered = sub.category.some((cat) => {
      return cat._id === categoryId;
    });
    return filtered;
  });
  const url =validUrl(categoryName)
  navigate(`/${url}/${categoryId}/${subcategory?._id}`)
  };
  return (
    <section className="max-h-[82dvh] overflow-hidden overflow-y-scroll">
      <div className="container mx-auto px-4">
        <div className={`my-2 w-full  min-h-48  animate-plus  ${(!banner || !bannerMobile )&&"animate-pulse"} `}>
          <img
          className="w-full h-full hidden lg:block object-scale-down"
          src={banner}
          alt="banner"
          />
          <img
          className=" w-full h-full lg:hidden object-scale-down"
          src={bannerMobile}
            alt="banner"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 my-4 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 py-5">
        {
         categoryLoading?<CategoryHomeSkeleton/>:(
           allCategories.map((category,index)=>(
             <div key={index} className="w-full min-h-36 max-h-36 overflow-hidden p-1 cursor-pointer" onClick={()=>handeRedirect(category._id,category.name)}>
               <div>
                <img src={category.image} alt={category.name} className="w-full h-40 object-scale-down" />
               </div>
             </div>
           ))
         )
        }

      </div>
      {/* Disply categories */}
      {
        allCategories?.map((category,index)=>(
          <CategoryWiseProducts key={index} categoryId={category?._id} categoryName={category?.name} />
        ))
      }
      <div className="container mx-auto px-4 my-2"></div>
    </section>
  )
};

export default Home;
