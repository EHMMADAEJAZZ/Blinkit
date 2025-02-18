import { useState } from 'react';
import InputText from '../UI/InputText';
import TextArea from '../UI/TextArea';
import ImageInput from '../UI/ImageInput';
import SelectInput from '../UI/SelectInput';
import CheckBox from '../UI/CheckBox';
import ImagePreview from './ImagePreview';
import { MdOutlineCloudUpload } from 'react-icons/md';
import Divider from './Divider';
import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IoCloseCircle } from 'react-icons/io5';
import { productApi } from '../common/api';
import AddField from './AddField';
import successAlert from '../utils/successAlert';
const initialState = {
  name: '',
  price: '',
  discount: '',
  category: [],
  subcategory: [],
  quantity: '',
  images: [],
  stock: '',
  unit:'',
  description: '',
  moreDetails: {},
  published: false,
};
const UploadProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [error, setError] = useState({});
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const { allCategories } = useSelector((state) => state.category);
  const { allSubCategories } = useSelector((state) => state.subCategory);
  const [showAddFieldModel, setShowAddFieldModel] = useState(false);
  const [addField, setAddField] = useState('');

  function validateInputs(values) {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.price || parseInt(values.price) <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    if (!values.discount) {
      errors.discount = 'Discount is required';
    } else if (parseInt(values.discount) > parseInt(values.price)) {
      errors.discount = 'Discount must be less than or equal to price';
    }
    if (!values.category.length) {
      errors.category = 'Category is required';
    }
    if (!values.subcategory.length) {
      errors.subcategory = 'Subcategory is required';
    }
    if (!values.quantity || values.quantity <= 0) {
      errors.quantity = 'Quantity must be greater than 0';
    }
    if (!values.stock || values.stock <= 0) {
      errors.stock = 'Stock must be greater than 0';
    }
    if (!values.unit || values.unit <= 0) {
      errors.stock = 'unit must be greater than 0';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    if (!values.images.length) {
      errors.images = 'Please upload at least one image';
    }
    return errors;
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleChangeFile = (e) => {
    const images = [...e.target.files];
    setProduct((prev) => {
      return {
        ...prev,
        images: [...prev.images, ...e.target.files],
      };
    });

    images.forEach((image) => {
      setPreview((prev) => {
        return [...prev, URL.createObjectURL(image)];
      });
    });

  };

  const handleDeleteImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    const updatedPreview = preview.filter((_, i) => i !== index);
    setProduct((prev) => {
      return {
        ...prev,
        images: [...updatedImages],
      };
    });
    setPreview(updatedPreview);
  };
  const handleChangeCategory = (e) => {
    const { value } = e.target;
    const categoryExited = product.category.filter((el) => el._id === value);
  
  const sub = allSubCategories.filter(s=>{
    return s.category.some((cat) => {
      return cat._id == value
    });
  })

  setSubCategories(sub)
    if (categoryExited.length) {
      toast.error('This category already added');
      return;
    }
    const categoryDetails = allCategories.find((el) => el._id === value);
    setProduct((prev) => {
      return { ...prev, category: [...prev.category, categoryDetails] };
    });
    setSelectedCategory('');
  };
  const handleChangeSubCategory = (e) => {
    let { value } = e.target;
    const subCategoryExixted = product.subcategory.filter(
      (el) => el._id === value
    );
    if (subCategoryExixted.length) {
      toast.error('This category already added');
      return;
    }
    let subcategoryDetails = allSubCategories.find((el) => el._id === value);
    setProduct((prev) => {
      return {
        ...prev,
        subcategory: [...prev.subcategory, subcategoryDetails],
      };
    });
    setSelectedSubcategory('');
  };
  const handleRemoveCategory = (id) => {
    // remove category from state array
    const index = product.category.findIndex((c) => c._id === id);
    product.category.splice(index, 1);
    setProduct((prev) => {
      return {
        ...prev,
      };
    });
  };
  const handleRemoveSubCategory = (id) => {
    // remove category from state array
    const index = product.subcategory.findIndex((c) => c._id === id);
    product.subcategory.splice(index, 1);
    setProduct((prev) => {
      return {
        ...prev,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validateInputs(product));
    if (Object.keys(error).length > 0) {
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('discount', product.discount);
    formData.append('quantity', product.quantity);
    formData.append('stock', product.stock);
    formData.append('unit', product.unit);
    formData.append('description', product.description);
    formData.append('published', product.published);
    product.category.forEach((category) => {
      formData.append('category', category._id);
    });
    product.subcategory.forEach((subcategory) => {
      formData.append('subcategory', subcategory._id);
    });
    if (Object.values(product.moreDetails).length > 0) {
      formData.append('moreDetails', JSON.stringify(product.moreDetails));
    }
    product.images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await productApi.addProduct(formData);
      // toast.success(response?.message);
      successAlert(response?.message)
      setProduct(initialState)
      setPreview([])
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setUploading(false);
    }
  };
  const handleAddField = (e) => {
    setAddField(e.target.value);
  };
  const handleAddMoreField = () => {
 const feeldExisted = Object?.keys(product?.moreDetails)?.find(field => field===addField);
 if(feeldExisted){
   toast.error('This field already added');
   return;
 }
    setProduct((prev) => {
      return { ...prev, moreDetails: { ...prev.moreDetails, [addField]: '' } };
    });
    setAddField('');
    setShowAddFieldModel(false);
  };
  return (
    <section className='w-full'>
      <div className='max-w-3xl  mx-auto my-0 sm:my-3 px-10 py-5 shadow-md shadow-blue-400 rounded'>
        <h1 className='text-sm shadow shadow-blue-200 uppercase font-bold tracking-widest p-2 text-red-600'>
          Upload Product
        </h1>
        <Divider className='mb-4 mt-0' />
        <div className='w-full '>
          <form
            onSubmit={handleSubmit}
            className='w-full flex flex-col sm:grid grid-cols-2 gap-4'
          >
            <div>
              <InputText
                name='name'
                type='text'
                label='product Name'
                id='name'
                value={product.name}
                onChange={handleChange}
                placeholder='enter product name'
                disabled={uploading}
              />
              {error.name && <p className='error'>{error.name}</p>}
            </div>
            <div>
              <InputText
                name='price'
                type='number'
                label='product Price'
                id='price'
                value={product.price}
                onChange={handleChange}
                placeholder='enter product price'
                 disabled={uploading}
              />
              {error.price && <p className='error'>{error.price}</p>}
            </div>
            <div>
              <InputText
                name='discount'
                type='number'
                label='product Discount'
                id='discount'
                value={product.discount}
                onChange={handleChange}
                placeholder='enter product discount'
                 disabled={uploading}
              />
              {error.discount && <p className='error'>{error.discount}</p>}
            </div>
            <div>
              <InputText
                name='quantity'
                type='number'
                label='product Quantity'
                id='quantity'
                value={product.quantity}
                onChange={handleChange}
                placeholder='enter product quantity'
                 disabled={uploading}
              />
              {error.quantity && <p className='error'>{error.quantity}</p>}
            </div>
            <div>
              <InputText
                name='stock'
                type='number'
                label='product Stock'
                id='stock'
                value={product.stock}
                onChange={handleChange}
                placeholder='enter product stock'
                 disabled={uploading}
              />
              {error.stock && <p className='error'>{error.stock}</p>}
            </div>
              <div>
              <InputText
                name='unit'
                type='text'
                label='product unit'
                id='unit'
                value={product.unit}
                onChange={handleChange}
                placeholder='enter product stock'
                 disabled={uploading}
              />
              {error.unit && <p className='error'>{error.unit}</p>}
            </div>
            <div className='col-span-full'>
              <TextArea
                name='description'
                label='product Description'
                id='description'
                value={product.description}
                onChange={handleChange}
                placeholder='enter product description'
                rows={3}
                cols={5}
                 disabled={uploading}
              />
              {error.description && (
                <p className='error'>{error.description}</p>
              )}
            </div>
            <div className='col-span-full'>
              <div className='flex flex-col items-center justify-center h-20 bg-blue-50 rounded border border-slate-300'>
                <ImageInput
                  label='upload product images'
                  id='categoryImage'
                  name='images'
                  multiple={true}
                   disabled={uploading}
                  className='flex flex-col items-center cursor-pointer text-xs capitalize tracking-widest font-semibold '
                  onChange={handleChangeFile}
                  icon={
                    <MdOutlineCloudUpload
                      size={35}
                      className='text-neutral-600'
                    />
                  }
                />
                
              </div>
              {error.images && <p className='error text-xs'>{error.images}</p>}
            </div>
            <div className='w-full p-2 col-span-full my-3  h-24 bg-neutral-200 flex items-center justify-start rounded '>
              <div className='h-full p-2 max-w-full overflow-x-auto flex justify-center items-center gap-2 '>
                {preview.length > 0 ? (
                  preview.map((img, index) => (
                    <div
                      key={index}
                      className='h-full flex gap-2 relative bg-slate-400 group'
                    >
                      <ImagePreview
                        image={img}
                        className='max-w-20 max-h-20 object-scale-down '
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className='absolute bg-red-400  hover:bg-red-600 hover:scale-110 text-center rounded-full right-0 bottom-0 '
                      >
                        <MdDeleteForever className=' text-center text-white w-6 h-6 p-1 cursor-pointer block lg:hidden lg:group-hover:block' />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>images</p>
                )}
              </div>
            </div>

            <div className='col-span-full'>
              <SelectInput
                name='category'
                label='product Category'
                id='category'
                defaultOption='select product Category'
                value={selectedCategory}
                options={allCategories}
                onChange={handleChangeCategory}
                 disabled={uploading}
              />
              {error.category && <p className='error'>{error.category}</p>}
            </div>
            <div
              className={`w-full  items-center gap-2 flex-wrap col-span-full border border-gray-300 bg-blue-50 p-2 transition-all duration-500 ${
                product?.category.length > 0 ? 'flex' : 'hidden'
              }`}
            >
              {product?.category &&
                product?.category?.map((el, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-1 border border-green-600 p-1 hover:animate-pulse transition-all duration-500 hover:border-red-600 hover:bg-red-600 hover:text-white'
                  >
                    <span className='text-xs'>{el?.name} </span>
                    <IoCloseCircle
                      size={20}
                      className='cursor-pointer transition-all duration-500 hover:scale-125 text-red-600 hover:text-white'
                      onClick={() => handleRemoveCategory(el._id)}
                    />
                  </div>
                ))}
            </div>
            <div className='col-span-full'>
              <SelectInput
                name='subcategory'
                label='product Subcategory'
                id='subcategory'
                defaultOption='select product subCategory'
                value={selectedSubcategory}
                options={subCategories}
                onChange={handleChangeSubCategory}
                 disabled={uploading}
              />
              {
                error.subcategory && <p className='error'>{error.subcategory}</p>
              }
            </div>
            <div
              className={`w-full  items-center gap-2 flex-wrap col-span-full border border-gray-300 bg-blue-50 p-2 transition-all duration-500 ${
                product?.subcategory.length > 0 ? 'flex' : 'hidden'
              }`}
            >
              {product?.subcategory &&
                product.subcategory.map((el, i) => (
                  <div
                    key={i}
                    className='flex items-center gap-1 border border-green-600 p-1 hover:animate-pulse transition-all duration-500 hover:border-red-600 hover:bg-red-600 hover:text-white'
                  >
                    <span className='text-xs'>{el.name} </span>
                    <IoCloseCircle
                      size={20}
                      className='cursor-pointer transition-all duration-500 hover:scale-125 text-red-600 hover:text-white'
                      onClick={() => handleRemoveSubCategory(el._id)}
                    />
                  </div>
                ))}
            </div>
            <div className='col-span-full'>
              <CheckBox
                name='published'
                label='Publish product'
                id='published'
                checked={product.published}
                 disabled={uploading}
                onChange={
                  (e) => {
                    setProduct((prev) => ({...prev, published: e.target.checked }));
                  }}
                
              />
              {error.published && <p className='error'>{error.published}</p>}
            </div>

            {Object?.keys(product?.moreDetails)?.map((key, index) => (
               <div key={index}>
                  <TextArea
                    name={key}
                    label={key}
                    id={key}
                     disabled={uploading}
                    value={product?.moreDetails[key]}
                    onChange={(e) => {
                      const { value } = e.target;
                      setProduct((prev) => {
                        return {
                          ...prev,
                          moreDetails: { ...prev.moreDetails, [key]: value },
                        };
                      });
                    }}
                    placeholder={`enter ${key}`}
                    rows={3}
                    cols={5}
                  />
                  
                </div>
            ))}
            <div className='col-span-full'>
              <button
                type='button'
                 disabled={uploading}
                onClick={() => setShowAddFieldModel(true)}
                className='bg-primary-200 px-4 py-2 rounded border border-slate-300 text-xs sm:text-sm tracking-widest font-bold hover:bg-primary-100 capitalize'
              >
                Add Field
              </button>
            </div>
            <div className='w-full flex justify-center items-center my-2 col-span-full'>
              <button
               disabled={uploading}
                type='submit'
                className={` bg-primary-200 text-white hover:bg-primary-100 px-4 py-3 w-full rounded  uppercase text-xs sm:text-sm tracking-widest font-bold ${uploading?"bg-red-600 text-white cursor-wait hover:bg-red-400":""}`}
              >
                {uploading ? 'uploading...' : 'Add product'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showAddFieldModel && (
        <AddField
          onClose={() => setShowAddFieldModel(false)}
          onChange={handleAddField}
          value={addField}
          submit={handleAddMoreField}
        />
      )}
    </section>
  );
};

export default UploadProduct;
