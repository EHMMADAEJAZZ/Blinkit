import { useState } from 'react';
import InputText from '../UI/InputText';
import { useSelector,useDispatch} from 'react-redux';
import api from '../common/api';
import { toast } from 'react-toastify';
import { fetchUserDetailsSuccess } from '../features/user/userSlice';
const UpdateUser = () => {
    const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
   const { userDetails } = useSelector((state) => state.user);
  const [user, setUser] = useState({
   name: userDetails?.name,
   email: userDetails?.email,
   mobile: userDetails?.mobile,
  })
  const dispatch = useDispatch()
     const handleChange = (e) => {
    const {name,value}= e.target;
    setUser((prev)=>{
      return {...prev,[name]:value}
    });
  };
  const handleUpdate=async(e)=>{
    e.preventDefault();
    setErrors(validateInputs(user))
    if (Object.keys(errors).length) {
      return;
    } 
    setIsLoading(true)
    try {
        const data = await api.updateUser(user);
      dispatch(fetchUserDetailsSuccess(data?.data))
      toast.success(data?.message);

    } catch (error) {
      toast.error(error?.message);
      
    }finally{
      setIsLoading(false)
    }
  }
  function validateInputs(values){
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.mobile) {
      errors.mobile = 'Mobile is required';
    } else if (!/^[0-9]{10}$/.test(values.mobile)) {
      errors.mobile = 'Invalid mobile number';
    }
    return errors;
  }
  const valiidate = Object.values(user).every(el=>el)
  return (
    <div className='w-full'>
        <h1 className='uppercase text-sm sm:text-xl font-semibold'>update user</h1>
        <form onSubmit={handleUpdate}>
          <div>

          <InputText 
          type='text'
          label='name'
          id='name'
          name='name'
          value={user.name}
          onChange={handleChange}
          
          
          />
          {
            errors?.name && <p className='error'>{errors?.name}</p>
          }
          </div>
          <div>
            <InputText 
            type='email'
            label='email'
            id='email'
            name='email'
            value={user.email}
            onChange={handleChange}
            />
            {
              errors?.email && <p className='error'>{errors?.email}</p>
            }
          </div>
          <div>
            <InputText 
            type='text'
            label='mobile'
            id='mobile'
            name='mobile'
            value={user.mobile}
            onChange={handleChange}
            />
            {
              errors.mobile && <p className='error'>{errors.mobile}</p>
            }
          </div>
         <div className="flex justify-center mt-5">

        <button type='submit' disabled={isLoading} className={`text-white uppercase font-semibold
        min-w-[150px] p-2 rounded-sm ${!valiidate?"bg-primary-100":"bg-orange-400"} ${isLoading?"cursor-wait bg-orange-200":""}`}>
          {isLoading? 'updateing...' : 'save'}
        </button>
        </div>
        </form>
      </div>
  )
}

export default UpdateUser