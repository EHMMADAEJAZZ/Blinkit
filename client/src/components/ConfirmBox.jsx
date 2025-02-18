import { useState } from 'react';
import { categoryApi } from '../common/api';
import Model from '../UI/Model';
import { toast } from 'react-toastify';
import Divider from './Divider';
import { useDispatch } from 'react-redux';
import { removeCategory } from '../features/category/categorySlice';
const ConfirmBox = ({ closeModel, data }) => {
  const [deleting, setDeleting] = useState(false);
  const dispatch =useDispatch()
  const deleteCategory = async (id) => {
    setDeleting(true);
    try {
      const response = await categoryApi.deleteCategory(id);
      dispatch(removeCategory(id))
      closeModel();
      toast.success(response?.message);
    } catch (error) {
      if(error?.message){

        toast.error(error?.message);
      }
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className='bg-gray-900'>
      <Model
        onCloseModel={closeModel}
        className='max-w-sm min-h-[200px] sm:min-h-[150px] bg-white'
      >
        <div className='flex flex-col  min-h-[100px] '>
          <div className='flex-1'>
            <h1 className='text-xs sm:text-sm font-semibold tracking-widest'>Delete Permanently</h1>
            <Divider className='bg-red-700 mt-1'/>
            <p className='text-red-600 text-xs tracking-widest'>Are you sure you want to delete this item?</p>
          </div>
          <div className='flex justify-between items-center p-2'>
            <button onClick={closeModel} className='tracking-widest px-2 py-1 border border-red-500 hover:bg-red-500 rounded hover:text-white font-semibold hover:scale-110 transition-all duration-500 w-32 shadow-md shadow-red-600'>Cancel</button>
            <button onClick={()=>deleteCategory(data?._id)} className='tracking-widest px-2 py-1 border border-green-600 hover:bg-green-600 rounded hover:text-white font-semibold hover:scale-110 transition-all duration-500 w-32 shadow-md shadow-green-600'>
                {
                    deleting? 'Deleting...' : 'Delete'
                }
            </button>
          </div>
        </div>
      </Model>
    </div>
  );
};

export default ConfirmBox;
