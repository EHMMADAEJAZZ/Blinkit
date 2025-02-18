import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '../common/api';
import { toast } from 'react-toastify';
import formatCurrency from '../utils/currencyFormat';
import Divider from '../components/Divider';
import minute_delivery from '../assets/minute_delivery.png';
import Best_Prices_Offers from '../assets/Best_Prices_Offers.png';
import Wide_Assortment from '../assets/Wide_Assortment.png';
import discountedPrice from '../utils/pricewithDiscount';
import AddToCart from '../components/AddToCart';
import ProdectDisplayPageSkeleton from '../skeleton/ProdectDisplayPageSkeleton';
const ProductDisplayPage = () => {
  const [isLoading, setisLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(0);
  const { productId } = useParams();
  const id = productId.split('-').pop();
  console.log("productId: " + productId)
  const fetchProduct = async () => {
    setisLoading(true);
    try {
      const response = await productApi.fetchProductDetails(id);
      console.log(response?.data);
      setProduct(response?.data);
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  const pricewithDiscount = discountedPrice(product?.price, product?.discount);
  if(isLoading){
    return <div>
      <ProdectDisplayPageSkeleton/>
    </div>
  }
  return (
    <section className='w-full '>
      <div className='fixed  top-28 sm:top-20 w-full grid grid-cols-1 md:grid-cols-[500px_1fr] max-h-[80vh] min-h-[80vh] md:max-h-[82vh] md:min-h-[82vh] overflow-hidden overflow-y-scroll customscrollbar scroll-smooth bg-blue-50'>
        <div className='p-4 border-r-2'>
          <div className='w-full min-h-56 max-h-56  bg-neutral-100 shadow-2xl rounded '>
            <img
              src={product?.images[image]}
              alt='product_image'
              className='w-full min-h-56 max-h-56 object-scale-down bg-blend-color-burn rounded'
            />
          </div>
          <div className='flex gap-4 items-center justify-center my-5'>
            {product &&
              product?.images.map((_, index) => (
                <span
                  key={index}
                  className={`inline-block text-center w-3 h-3  rounded-full ${
                    image === index ? 'bg-blue-600/60' : 'bg-gray-500/30'
                  }`}
                >
                  {''}
                </span>
              ))}
          </div>
          <div className='flex gap-4 items-center  my-5  flex-wrap'>
            {product &&
              product?.images?.map((img, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 sm:w-20 sm:h-20 border p-1 rounded ${
                    image === index
                      ? 'scale-125 backdrop-blur-lg '
                      : 'bg-slate-100'
                  } `}
                  onClick={() => setImage(index)}
                >
                  <img
                    src={img}
                    alt='product_image'
                    className='w-full h-full rounded cursor-pointer hover:opacity-90 object-scale-down bg-blend-color-burn'
                  />
                </div>
              ))}
          </div>
          <div className='my-2'>
            {product && product?.stock < 1 ? (
              <div className='flex text-xs sm:text-sm items-center gap-2 text-red-600'>
                <p>Out of Stock</p>
                <img
                  src={minute_delivery}
                  alt='delivery_icon'
                  className='w-6 h-6'
                />
              </div>
            ) : (
              <div className='flex text-xs sm:text-sm items-center gap-2 text-green-600'>
                <p>Available</p>
                <img
                  src={minute_delivery}
                  alt='delivery_icon'
                  className='w-6 h-6'
                />
                <p>Get it delivered in 10 minutes </p>
              </div>
            )}
          </div>
          
          <div>
           <p className=' font-semibold'>Unit:</p>
          <p className=' text-base text-justify'>{product?.unit}</p>
          </div>
        </div>
        <div className='  shadow-inner p-4 md:pl-7 md:max-h-[82vh] md:min-h-[82vh] overflow-hidden overflow-y-scroll customscrollbar scrollbar-none scroll-smooth'>
          <p className='w-fit text-xs lg:text-sm text-red-600  border-gray-900/30'>
            10 min
          </p>
          <h1 className='text-lg md:text-xl font-semibold capitalize truncate'>
            {product?.name}
          </h1>
          {/* <p className='w-fit text-xs lg:text-sm  '>{product?.unit}</p> */}
          <Divider className='mt-0.5 mb-2' />
          <div className='flex items-center gap-1'>
            <p>Price:</p>
            <p className='line-through text-red-600'>
              {formatCurrency('INR', product?.price)}
            </p>
            <p className='text-gray-600 bg-green-200 text-sm md:text-xl font-semibold border px-2 py-1 border-gray-500/60'>
              {formatCurrency('INR', pricewithDiscount)}
            </p>
            {Boolean(product?.discount) && (
              <p className=' flex items-center flex-wrap text-yellow-600 text-[10px] sm:text-sm truncate gap-1'>
                <span>{product?.discount}%</span> <span>discount</span>
              </p>
            )}
          </div>
          <p className='my-2 text-sm text-justify'>{product?.description}</p>
          <div className='w-20'>

          <AddToCart data={product}/>
          </div>
          <div>
            {product?.stock < 1 && (
              <p className='text-sm text-red-600 -mt-2'>out of stock</p>
            )}
          </div>
          <h2 className='text-lg sm:text-xl font-semibold'>
            Why Shop From binketit?
          </h2>
          <div className='flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-3 my-4 '>
            <div>
              <img
                src={minute_delivery}
                alt='minute_delivery'
                className='w-14 h-14 sm:w-20 sm:h-20'
              />
            </div>
            <div className='my-2 text-sm'>
              <h4 className='font-semibold'>Superfast Delivery</h4>
              <p className='text-justify'>
                Get Your order delivered to your doorstep at the earilest from
                dark store near you
              </p>
            </div>
          </div>
          <div className='flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-3 my-4 '>
            <div>
              <img
                src={Best_Prices_Offers}
                alt='Best_Prices_Offers'
                className='w-14 h-14 sm:w-20 sm:h-20'
              />
            </div>
            <div className='my-2 text-sm'>
              <h4 className='font-semibold'>Best Prices & Offers</h4>
              <p className='text-justify'>
                Shop with confidence, get the best prices and offers on all your
                favorite products
              </p>
            </div>
          </div>
          <div className='flex flex-col items-start sm:flex-row sm:items-center gap-1 sm:gap-3 my-4 '>
            <div>
              <img
                src={Wide_Assortment}
                alt='Wide_Assortment'
                className='w-14 h-14 sm:w-20 sm:h-20'
              />
            </div>
            <div className='my-2 text-sm'>
              <h4 className='font-semibold'>Wide Assortment</h4>
              <p className='text-justify'>
                Shop from over 10000+ products, no matter what you&apos;re looking
                for
              </p>
            </div>
          </div>
          <Divider />
          <div>
            <h2 className='text-sm md:text-lg font-semibold capitalize my-2 underline'>
              Product Details:
            </h2>
            <div className='grid gap-2'>
              {product?.moreDetails &&
                Object.keys(product?.moreDetails).map(
                  (key, index) => (
                    <div key={index} className=''>
                      <p className='text-sm text-justify'>
                        <span className=' font-semibold'>{key}:</span> {product?.moreDetails[key]}
                      </p>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
