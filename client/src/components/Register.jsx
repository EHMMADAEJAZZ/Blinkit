import { useState } from 'react';
import InputText from '../UI/InputText';
import { IoMdEye } from 'react-icons/io';
import { IoMdEyeOff } from 'react-icons/io';
import api from '../common/api';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    confirmPassword: '',
  });
  // const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors(validateInputs(user));
    if (Object.values(errors).length) {
      return;
    }
    try {
      setIsLoading(true);
      
      const data = await api.registerUser(user);
      setIsLoading(false);
      setIsError('');
      toast.success(data.message)
      setUser({
        name: '',
        email: '',
        password: '',
        mobile: '',
        confirmPassword: '',
      });
    } catch (error) {
      if(error?.message){

        toast.error(error?.message);
        setIsError(error?.message);
      }
        
    } finally {
      setIsLoading(false);
    }
  };
  function validateInputs(values) {
    const error = {};
    if (!values.email) {
      error.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      error.email = 'Invalid email address';
    }
    if (!values.password) {
      error.password = 'Password is required';
    } else if (values.password.length < 8) {
      error.password = 'Password should be at least 8 characters long';
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)){
      error.password='Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }
    if (!values.name) {
      error.name = 'Name is required';
    }
    if (!values.mobile) {
      error.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/i.test(values.mobile)) {
      error.mobile = 'Invalid mobile number';
    }
    if (!values.confirmPassword) {
      error.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword !== values.password) {
      error.confirmPassword = 'Passwords do not match';
    }
    return error;
  }
  const valiidate = Object.values(errors).every((el) => el);
  return (
    <div className='w-full p-5'>
      <h1 className='text-center capitalize text-slate-300 font-medium tracking-widest text-xs sm:text-sm mb-2 '>
        welcome to the blinkit
      </h1>

      <h1 className='text-center uppercase text-white text-xs sm:text-2xl font-bold tracking-widest underline underline-offset-4'>
        Register
      </h1>
      {/* Form to accept user input for username and password */}
      <form onSubmit={handleRegister}>
        <div>
          <InputText
            type='text'
            label='Name'
            name='name'
            id='name'
            placeholder='enter your name'
            value={user.name}
            // required={true}
            disabled={isLoading}
            onChange={handleChange}
            autoFocus={true}
          />
          {errors.name && <p className='error'>{errors.name}</p>}
        </div>
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
            onChange={handleChange}
          />
          {errors.email && <p className='error'>{errors.email}</p>}
        </div>
        <div>
          <InputText
            type='text'
            label='Mobile'
            name='mobile'
            id='mobile'
            placeholder='enter your mobile number here'
            value={user.mobile}
            // required={true}
            disabled={isLoading}
            onChange={handleChange}
          />
          {errors.mobile && <p className='error'>{errors.mobile}</p>}
          {/* Show error message if mobile number is invalid */}
        </div>
        <div>
          <InputText
            type={showPassword ? 'text' : 'password'}
            label='password'
            name='password'
            id='password'
            placeholder='enter password'
            value={user.password}
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
          {errors.password && <p className='error'>{errors.password}</p>}
        </div>
        <div>
          <InputText
            type={showPassword ? 'text' : 'password'}
            label='confirmPassword'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='confirmPassword'
            value={user.confirmPassword}
            // required={true}
            disabled={isLoading}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className='error'>{errors.confirmPassword}</p>
          )}
        </div>
        <div className='flex justify-center mt-5'>
          <button
            type='submit'
            disabled={isLoading}
            className={`
        min-w-[150px] p-2 rounded-sm ${
          !valiidate
            ? "bg-primary-100"
            : 'bg-gradient-to-tr from-rose-600 to-indigo-600'
        }`}
          >
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </div>
      </form>
      <div>
        {
          isError && <p className='error'>{isError}</p> // Show error message if registration fails
        }
      </div>
    </div>
  );
};

export default Register;
