import {  useState } from 'react';
import ImageInput from '../UI/ImageInput';
import InputText from '../UI/InputText';
import Model from '../UI/Model';
import Divider from '../components/Divider';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { categoryApi } from '../common/api';
import { toast } from "react-toastify";
import Spinner from '../UI/Spinner';
import { useDispatch } from 'react-redux';
import { addCategory } from '../features/category/categorySlice';
import ImagePreview from './ImagePreview';
const UploadCategory = ({ closeModel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [category, setCategory] = useState({
    name: '',
    image: '',
  });
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch()
  // setIsLoading(false)
  // useEffect(() => {
  //   if (!category.image) {
  //     setPreview(undefined);
  //     return;
  //   }
  //   const objectUrl = URL.createObjectURL(category.image);
  //   setPreview(objectUrl);
  //   // free memory when ever this component is unmounted
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [category.image]);
  const handleChangeCategory = (e) => {
    setCategory({ ...category, name: e.target.value });
  };
  
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if(!file){
      return;
    }
    setCategory({ ...category, image: file });
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };
  const handleCategory = async(e) => {
    e.preventDefault();
    setError(validateInputs(category));
    setIsLoading(true);
    try {
      let formData = new FormData()
      formData.append('name', category.name);
      formData.append('image', category.image);
      const data = await categoryApi.addCategory(formData);
      toast.success(data?.message)
     dispatch(addCategory(data?.data))
      closeModel()
    } catch (error) {
      if(error?.message){

        toast.error(error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  function validateInputs(values) {
    const errors = {};
    if (!values.name) {
      errors.name = 'category name is required';
    }
    if (!values.image) {
      errors.image = 'category image is required';
    }
    return errors;
  }
  return (
    <section className='min-h-[500px] max-h-[550px] max-w-lg w-full bg-white'>
      <Model onCloseModel={closeModel} className='min-w-sm'>
        <div>
          <h1 className='uppercase text-center sm:text-left text-sm sm:text-xl font-semibold'>
            upload category
          </h1>
          <Divider />
          <form onSubmit={handleCategory} className='flex flex-col gap-3'>
            <div>
              <InputText
                label='Name'
                name='name'
                value={category.name}
                placeholder='enter category name'
                onChange={handleChangeCategory}
              />
              {error.name && (
                <p className='error text-xs'>{error.name}</p>
              )}
            </div>

            <div>
              <div className='flex flex-col items-center sm:flex-row  gap-2'>
                <div className='w-full sm:w-40 h-40 bg-blue-50 flex justify-center items-center'>
                  <ImagePreview image={preview} className='w-full sm:w-40 h-40' />
                </div>

                <ImageInput
                  label='upload image'
                  id='categoryImage'
                  name='image'
                  className='flex items-center gap-2 cursor-pointer'
                  onChange={handleChangeFile}
                  icon={<MdOutlineCloudUpload size={20} />}
                />
              </div>
              {error.image && (
                <p className='error text-xs'>{error.image}</p>
              )}
            </div>
            <div className='flex justify-center my-2'>
              <button
                type='submit'
                disabled={isLoading || !category.name}
                className={`${(category.name && category.image)?"bg-primary-200 text-slate-600":"bg-slate-300 text-gray-800" } px-4 py-2 w-full rounded font-medium uppercase text-xs sm:text-sm tracking-widest`}
              >
                {isLoading ? <Spinner/> : 'Add category'}
              </button>
            </div>
          </form>
        </div>
      </Model>
    </section>
  );
};

export default UploadCategory;
