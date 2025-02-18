import { useState } from "react";
import Otp from "../components/Otp"

const OtpVerification = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [otp, setOtp] = useState('');
    const onComplete=(otp)=>{
        setIsLoading(true)
        setOtp(otp);
        setIsLoading(false)
    }
    const handleOtp = (otp)=>{
        if(!otp) return;
    }
  return (
     <div className='w-full min-h-[80dvh] flex justify-center items-center'>
      <div className=' w-full max-w-lg mx-auto min-h-[300px]  bg-gradient-to-t from-orange-400 to-indigo-600 p-5 border border-gray-500  rounded-md shadow-blue-50 shadow-md'>
        <h1 className='text-center uppercase text-white font-bold tracking-widest underline underline-offset-4 text-xs sm:text-sm mt-5'>
          verify your otp
        </h1>
        <Otp length={6} onComplete={onComplete}/>
        <div className="flex justify-center items-center">

        <button onClick={()=>handleOtp(otp)} className={`
        min-w-[150px] p-2 rounded-sm bg-gradient-to-tr text-white uppercase tracking-widest text-sm sm:text-lg hover:from-gray-600 to-indigo-600 transition-all animate-pulse duration-500 hover:animate-none  ${isLoading ? 'bg-gray-600 cursor-not-allowed animate-bounce':'from-rose-600 to-indigo-600'}`}>verify otp</button>
        </div>
        </div>
    </div>
  )
}

export default OtpVerification