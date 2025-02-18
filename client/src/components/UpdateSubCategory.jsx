import Model from '../UI/Model';
import Divider from '../components/Divider';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { toast } from 'react-toastify';
import Spinner from '../UI/Spinner';
import { useState } from 'react';
import InputText from '../UI/InputText';
import ImageInput from '../UI/ImageInput';
import SelectInput from '../UI/SelectInput';
import { useSelector } from 'react-redux';
import { IoCloseCircle } from 'react-icons/io5';
import { subcategoryApis } from '../common/api';
import ImagePreview from './ImagePreview';
const UpdateSubCategory = ({ closeModel,fetchSubCategory,data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [category, setCategory] = useState({
    name: data.name,
    image: data.image,
    category: [...data.category],
  });
const [previewImg, setPreviewImg] = useState(null);
  const { allCategories } = useSelector((state) => state.category);
  
  const handleChangeCategory = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };
  const handleChangeSubCategory = (e) => {
    const { value } = e.target;
    const cateExixted = category.category.map((el) => el._id);
    if (cateExixted.includes(value)) {
      toast.error('This category already added');
      return;
    }
    const categoryDetails = allCategories.find((el) => el._id === value);
    setCategory((prev) => {
      return { ...prev, category: [...prev.category, categoryDetails] };
    });
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }
    setCategory({ ...category, image: file });
     const objectUrl = URL.createObjectURL(file);
    setPreviewImg(objectUrl);
  };
  const handleCategory = async (e) => {
    e.preventDefault();
    setError(validateInputs(category));
    const subCategories = category.category.map((category) => category._id);
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append('name', category.name);
      formData.append('image', category.image);
      formData.append('category', subCategories);
      const response = await subcategoryApis.updateSubCategory(data._id,formData);
      toast.success(response?.message);
      closeModel();
      fetchSubCategory()
    } catch (error) {
      toast.error(error?.message);
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
    if (!values.category) {
      errors.category = 'category name is required';
    }
    return errors;
  }
  const handleRemoveCategory = (id) => {
    // remove category from state array
    const index = category.category.findIndex((c) => c._id === id);
    category.category.splice(index, 1);
    setCategory((prev) => {
      return {
        ...prev,
      };
    });
  };
  return (
    <section className='min-h-[400px]  max-w-lg w-full bg-white'>
      <Model onCloseModel={closeModel}>
        <div className='py-4'>
          <h1 className='uppercase text-center sm:text-left text-xs xs:text-xl font-semibold'>
            update sub category
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
              {error.name && <p className='error text-xs'>{error.name}</p>}
            </div>

            <div>
              <div className='flex flex-col items-center sm:flex-row  gap-2'>
                <div className='w-full sm:w-40 h-40 bg-blue-50 flex justify-center items-center'>
                  <ImagePreview image={previewImg || data?.image} className='w-full sm:w-40 h-40' />
                </div>

                <ImageInput
                  label='upload sub category image'
                  id='subcategoryImage'
                  name='image'
                  className='flex items-center gap-2 cursor-pointer'
                  onChange={handleChangeFile}
                  icon={<MdOutlineCloudUpload size={20} />}
                />
              </div>
              {error.image && <p className='error text-xs'>{error.image}</p>}
            </div>
            <div
              className={`w-full  items-center gap-2 flex-wrap border border-gray-600 p-2 transition-all duration-500 ${
                category?.category.length > 0 ? 'flex' : 'hidden'
              }`}
            >
              {category?.category &&
                category.category.map((el, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-1 border border-green-600 p-1 hover:animate-pulse transition-all duration-500 hover:border-red-600 hover:bg-red-600 hover:text-white'
                  >
                    <span className='text-xs'>{el.name} </span>
                    <IoCloseCircle
                      size={20}
                      className='cursor-pointer transition-all duration-500 hover:scale-125 text-red-600 hover:text-white'
                      onClick={() => handleRemoveCategory(el._id)}
                    />
                  </div>
                ))}
            </div>
            <div>
              <SelectInput
                label='select Category'
                options={allCategories}
                name='category'
                id='category'
                onChange={handleChangeSubCategory}
              />
              {error.category && (
                <p className='error text-xs'>{error.category}</p>
              )}
            </div>

            <div className='flex justify-center my-2'>
              <button
                type='submit'
                disabled={isLoading || !category.name}
                className={`${
                  category.name && category.image && category.category[0]
                    ? 'bg-primary-200 text-slate-600'
                    : 'bg-slate-300 text-gray-800 cursor-not-allowed'
                } px-4 py-2 w-full rounded font-medium uppercase text-xs sm:text-sm tracking-widest`}
              >
                {isLoading ? <Spinner /> : 'Add sub category'}
              </button>
            </div>
          </form>
        </div>
      </Model>
    </section>
  );
};

export default UpdateSubCategory;
