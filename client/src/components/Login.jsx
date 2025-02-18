import { useState } from "react"
import InputText from "../UI/InputText"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import {Link, useNavigate} from "react-router-dom"
import api from "../common/api";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
   const [isError, setIsError] = useState('')
   const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const handleChange =(e)=>{
    const {name,value} = e.target;
    setUser({...user, [name]: value })
  }
  const handleLogin =async(e)=>{
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrors(validateInputs(user))
      if(Object.values(errors).length){
        return;
      }
      const data = await api.loginUser(user);
      localStorage.setItem('accessToken', data?.data?.accessToken);
      localStorage.setItem('refreshToken', data?.data?.refreshToken);
      dispatch(login(data?.data))
      setIsLoading(false);
      setIsError('');
      toast.success(data.message)
      setUser({
        email: '',
        password: '',
        
      });
      navigate('/')
      
    } catch (error) {
      if(error?.message){
        toast.error(error?.message)
          setIsError(error?.message);  
      }
    }finally{
      setIsLoading(false)
    }
  }
  function validateInputs(values){
    const error = {};
    if (!values.email) {
      error.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      error.email = 'Invalid email address';
    }
    if (!values.password) {
      error.password = 'Password is required';
    } 
    return error;
  }
  const valiidate = Object.values(user).every(el=>el)
  return (
    <div className="w-full min-h-full p-5">
      <h1 className="text-center  capitalize text-xs sm:text-sm text-slate-300 font-medium tracking-widest ">welcome to the blinkit</h1>
      <h1 className="text-center uppercase text-white font-bold tracking-widest underline underline-offset-4 text-xs sm:text-sm">login</h1>
      {/* Form to accept user input for username and password */}
      <form onSubmit={handleLogin}>
        <div>

        <InputText
        type='email'
        label='email'
        name='email'
        id='email'
        placeholder='enter your email address'
        value={user.email} 
        // required={true}
        disabled={isLoading}
        autoFocus={true}
        onChange={handleChange}
        
        />
        {
          errors.email && <p className='error'>{errors.email}</p>
        }
        </div>
        <div>

        <InputText
        type={showPassword ?"text":"password"}
        label='password'
        name='password'
        id='password'
        placeholder='enter your password'
        value={user.password}
        // required={true}
        disabled={isLoading}
        onChange={handleChange}
        icon={showPassword?<IoMdEye size={25} color="red" onClick={()=>setShowPassword(false)} /> : <IoMdEyeOff size={25} color="red" onClick={()=>setShowPassword(true)}  />}
        
        />
       
        {
          errors.password && <p className='error'>{errors.password}</p>
        }
        </div>
        <div className="flex justify-center mt-5">

        <button type='submit' disabled={isLoading} className={`
        min-w-[150px] p-2 rounded-sm ${!valiidate?"bg-primary-100":"bg-gradient-to-tr from-rose-600 to-indigo-600"}`}>
          {isLoading? 'Loading...' : 'Login'}
        </button>
        </div>
      </form>
       <div>
      {
        isError && <p className='error'>{isError}</p>  // Show error message if registration fails
      }
     </div>
     <div className="flex">
        <p className="text-center mt-4 text-gray-500">forgot password? <span className="text-blue-600 underline"><Link to='/forgot-password'>reset here</Link> </span></p>
      </div>

    </div>
  )
}

export default Login