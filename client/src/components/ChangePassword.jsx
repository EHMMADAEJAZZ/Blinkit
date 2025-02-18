import { useState } from "react"
import InputText from "../UI/InputText"
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import api from "../common/api";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
  
    })
    const handleChange=(e)=>{
        const {name,value}= e.target;
        setNewPassword((prev)=>{
            return {...prev,[name]:value};
        })
    }
    const handlePassword =async(e)=>{
        e.preventDefault();
    setErrors(validateInputs(newPassword));
    if (Object.values(errors).length) {
      return;
    }
    setIsLoading(true)
    try {
        const data = await api.changeCurrentPassword(newPassword);
        toast.success(data?.message)
    } catch (error) {
        if(error?.message){

        toast.error(error?.message);
      }
    }finally{
        setIsLoading(false);
    }
    }
     function validateInputs(values) {
    const error = {};
   
    if (!values.currentPassword) {
      error.currentPassword = 'Password is required';
    } 
    if (!values.newPassword) {
      error.newPassword = 'Password is required';
    } else if (values.newPassword.length < 8) {
      error.newPassword = 'Password should be at least 8 characters long';
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.newPassword)){
      error.newPassword='Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }
   
    if (!values.confirmNewPassword) {
      error.confirmNewPassword = 'Confirm password is required';
    } else if (values.confirmNewPassword !== values.newPassword) {
      error.confirmNewPassword = 'Passwords do not match';
    }
    return error;
  }
  const valiidate = Object.values(errors).every((el) => el);
  return (
    <div className="w-full">
        <h1 className='uppercase text-sm sm:text-xl font-semibold'>change password</h1>
        <form onSubmit={handlePassword}>
          
        <div>
          <InputText
            type={showCurrentPassword ? 'text' : 'password'}
            label='currentPassword'
            name='currentPassword'
            id='currentPassword'
            placeholder='enter currentPassword'
            value={newPassword.currentPassword}
            // required={true}
            disabled={isLoading}
            onChange={handleChange}
            icon={
              showPassword ? (
                <IoMdEyeOff
                  size={25}
                  color='white'
                  onClick={() => setShowCurrentPassword(false)}
                />
              ) : (
                <IoMdEye
                  size={25}
                  color='white'
                  onClick={() => setShowCurrentPassword(true)}
                />
              )
            }
          />
          {errors.currentPassword && <p className='error'>{errors.currentPassword}</p>}
        </div>
        <div>
          <InputText
            type={showPassword ? 'text' : 'password'}
            label='newPassword'
            name='newPassword'
            id='newPassword'
            placeholder='enter newPassword'
            value={newPassword.newPassword}
            // required={true}
            disabled={isLoading}
            onChange={handleChange}
            icon={
              showPassword ? (
                <IoMdEyeOff
                  size={25}
                  color='white'
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoMdEye
                  size={25}
                  color='white'
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />
          {errors.newPassword && <p className='error'>{errors.newPassword}</p>}
        </div>
        <div>
          <InputText
            type={showPassword ? 'text' : 'password'}
            label='confirmNewPassword'
            name='confirmNewPassword'
            id='confirmNewPassword'
            placeholder='enter confirmNewPassword'
            value={newPassword.confirmNewPassword}
            // required={true}
            disabled={isLoading}
            onChange={handleChange}
           
          />
          {errors.confirmNewPassword && <p className='error'>{errors.confirmNewPassword}</p>}
        </div>
          <div className='flex justify-center mt-5'>
         <button type='submit' disabled={isLoading} className={`text-white uppercase font-semibold
        min-w-[150px] p-2 rounded-sm ${!valiidate?"bg-primary-100 cursor-not-allowed":"bg-orange-400"} ${isLoading?"cursor-wait bg-orange-200":""}`}>
          {isLoading? 'updating...' : 'change password'}
        </button>
        </div>
        </form>
    </div>
  )
}

export default ChangePassword