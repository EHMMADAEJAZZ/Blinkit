import { Bounce,  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api, { categoryApi, subcategoryApis } from './common/api';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from './features/user/userSlice';
import { setAllCategories } from './features/category/categorySlice';
import {
  setSubcategories,
} from './features/subCategory/subCategorySlice';
// import Spinner from './UI/Spinner';
import AppLayout from './skeleton/AppLayout';
import Mobilecart from './components/Mobilecart';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

 const location = useLocation()
  const getUser = async () => {
      setIsLoading(true);
    try {
      const data = await api.getMe();
      dispatch(login(data?.data));
    } catch (error) {
      throw new Error(error?.message);
    }finally{
      setIsLoading(false);
    }
  };
  const getCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryApi.fetchCategories();
      dispatch(setAllCategories(data?.data));
    } catch (error) {
      throw new Error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchSubCategory = async () => {
      setIsLoading(true);
    try {
      const data = await subcategoryApis.fetchSubCategories();
      // console.log(data?.data);
      dispatch(setSubcategories(data?.data));
      
    } catch (error) {
      throw new Error(error?.message);
    } finally {
        setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getUser();
    getCategories();
    fetchSubCategory();
    // cleanup function
    return () => {
      // Add any necessary cleanup code here
    };
  }, []);
  if (isLoading) {
    return(
      
        <AppLayout/>
      
    ) 
      
  }

  return (
    <>
      <Outlet />
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce}
        className='max-w-lg'
      />
     {
      location.pathname!=='/checkout' && (<Mobilecart/>)
     }
        
      
    </>
  );
}

export default App;
