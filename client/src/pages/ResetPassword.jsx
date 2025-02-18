import { useState } from "react"
import InputText from "../UI/InputText"
import api from "../common/api";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useSearchParams , useNavigate} from "react-router-dom";
const ResetPassword = () => {
    const [pass, setPass] = useState({
        password:'',confirmPassword:''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false)
    const [searchParams]=useSearchParams();
    const navigate = useNavigate()
    const handleChange =(e)=>{
        const {name, value} = e.target;
        setPass((prev)=>{
            return {...prev,[name]:value}
        })
 
    }
    const handleResetPassword =async(e)=>{
      e.preventDefault();
      setErrors(validateInputs(pass));
      if (Object.values(errors).length) {
        return
      }
      setIsLoading(true)
      try {
      
      const token =searchParams.get('token')
        const data = await api.resetPassword(token,pass)
        toast.success(data?.message)
        setPass({
            password:'',
            confirmPassword:''
        })
        navigate('/auth')
      } catch (error) {
        if(error?.message){
         setErrors(error?.message)

        toast.error(error?.message);
      }
      }finally{
        setIsLoading(false);

      }
    }
    function validateInputs(values){
        const error={};
       if (!values.password) {
      error.password = 'Password is required';
    } else if (values.password.length < 8) {
      error.password = 'Password should be at least 8 characters long';
    }if (!values.confirmPassword) {
      error.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword !== values.password) {
      error.confirmPassword = 'Passwords do not match';
    }
    return error;
        
    }
  return (
    <div className="w-full min-h-[80dvh] flex justify-center items-center">

    
    <div className="w-full max-w-lg mx-auto min-h-[300px]  bg-gradient-to-t from-orange-400 to-indigo-600 p-5 border border-gray-500  rounded-md shadow-blue-50 shadow-md">
    
      <h1 className="text-center uppercase text-white font-bold tracking-widest underline underline-offset-4 text-xs sm:text-sm mt-5">Reset password</h1>
      {/* Form to accept user input for username and password */}
      <form onSubmit={handleResetPassword}>
         <div>

        <InputText
        type={showPassword ?"text":"password"}
        label='new password'
        name='password'
        id='password'
        placeholder='enter your password'
        value={pass.password}
        // required={true}
        disabled={isLoading}
        onChange={handleChange}
        icon={showPassword? <IoMdEyeOff size={25} color="white" onClick={()=>setShowPassword(false)} />: <IoMdEye size={25} color="white" onClick={()=>setShowPassword(true)}/>}
        
        />
        {
          errors.password && <p className='error'>{errors.password}</p>
        }
        </div>
          <div>
          <InputText
            type={showPassword ? 'text' : 'password'}
            label='confirm new Password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='confirmPassword'
            value={pass.confirmPassword}
            // required={true}
            disabled={isLoading}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className='error'>{errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex justify-center mt-5">

        <button type='submit' disabled={isLoading} className={`
        min-w-[150px] p-2 rounded-sm bg-gradient-to-tr text-white capitalize text-sm sm:text-lg hover:from-gray-600 to-indigo-600 transition-all animate-pulse duration-500 hover:animate-none ${isLoading ? 'bg-gray-600 cursor-wait animate-bounce':'from-rose-600 to-indigo-600'}`}>
          {isLoading? 'Loading...' : 'reset'}
        </button>
        </div>
      </form>
       
     

    </div>
    </div>
  )
}

export default ResetPassword