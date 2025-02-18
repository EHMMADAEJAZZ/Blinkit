import { useState } from "react"
import InputText from "../UI/InputText"
import api from "../common/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
     const [isLoading, setIsLoading] = useState(false);
      const [errors, setErrors] = useState('');
    const handleChange =(e)=>{
        setEmail(e.target.value);
 
    }
    const handleForgotPassword =async(e)=>{
      e.preventDefault();
      if(!email){
        setErrors('email is required');
      }
      setIsLoading(true)
      try {
        const data = await api.forgotPassword({email})
        toast.success(data?.message)
        setEmail('')
      } catch (error) {
        if(error?.message){

        toast.error(error?.message);
      }
      }finally{
        setIsLoading(false);

      }
    }
  return (
    <div className="w-full min-h-[80dvh] flex justify-center items-center">

    
    <div className="w-full max-w-lg mx-auto min-h-[300px]  bg-gradient-to-t from-orange-400 to-indigo-600 p-5 border border-gray-500  rounded-md shadow-blue-50 shadow-md">
     
      <h1 className="text-center uppercase text-white font-bold tracking-widest underline underline-offset-4 text-xs sm:text-sm mt-5">forgot password</h1>
      {/* Form to accept user input for username and password */}
      <form onSubmit={handleForgotPassword}>
        <div>
{
          errors && <p className='error'>{errors}</p>
        }
        <InputText
        type='email'
        label='email'
        name='email'
        id='email'
        placeholder='enter your email address'
        value={email} 
        required={true}
        disabled={isLoading}
        autoFocus={true}
        onChange={handleChange}
        
        />
        
        </div>
        
        <div className="flex justify-center mt-5">

        <button type='submit' disabled={isLoading}  className={`
        min-w-[150px] p-2 rounded-sm bg-gradient-to-tr text-white capitalize text-sm sm:text-lg  ${isLoading ? 'bg-gray-600 cursor-wait animate-bounce':'from-rose-600 to-indigo-600'}`}>
          {isLoading? 'Loading...' : 'forgot password'}
        </button>
        </div>
      </form>
       
     

    </div>
    </div>
  )
}

export default ForgotPassword