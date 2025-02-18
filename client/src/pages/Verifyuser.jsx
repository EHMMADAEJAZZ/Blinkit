import { useState } from "react";
import { toast } from "react-toastify";
import api from "../common/api";
import {useNavigate, useSearchParams} from "react-router-dom"
const Verifyuser = () => {
     const [isLoading, setIsLoading] = useState(false);
       const [searchParams] = useSearchParams();
   const navigate = useNavigate()
    
    const handleVerifyUser =async(e)=>{
      e.preventDefault();
     const code = searchParams.get('code');
     console.log(code)
     setIsLoading(true)
      try {
        const data = await api.verifyUser(code)
        console.log(data);
        toast.success(data?.message)
        navigate('/')
      } catch (error) {
        console.log(error)
        
        toast.error(error?.message)
      }finally{
        setIsLoading(false);

      }
    }
  return (
     <div className="w-full min-h-[80dvh] flex justify-center items-center">
    <div className="w-full max-w-lg mx-auto min-h-[300px]  bg-gradient-to-t from-orange-400 to-indigo-600 p-5 border border-gray-500  rounded-md shadow-blue-50 shadow-md">
      
      <h1 className="text-center uppercase text-white font-bold tracking-widest underline underline-offset-4 text-sm sm:text-lg mt-5">verify your email</h1>
      <form onSubmit={handleVerifyUser}>
       
        
        <div className="flex justify-center mt-5">

        <button type='submit' disabled={isLoading} className={`text-sm sm:text-lg text-white font-medium capitalize
        min-w-[150px] p-2 rounded-sm transition-all animate-pulse duration-500 hover:animate-none bg-gradient-to-tr from-rose-600 to-indigo-600`}>
          {isLoading? 'verifying...' : 'verify email'}
        </button>
        </div>
      </form>
       
      </div>
      </div>
  )
}

export default Verifyuser