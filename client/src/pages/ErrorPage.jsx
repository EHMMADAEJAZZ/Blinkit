import { useRouteError, useNavigate } from 'react-router-dom';
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className='flex h-screen w-screen justify-center items-center bg-gray-100'>
      <div className='max-w-[400px] sm:max-w-[500px] p-16 bg-gray-100 text-center shadow-red-600 shadow-md uppercase text-red-600 '>
        <h1 className='text-sm  font-semibold leading-6'>
          {error?.status} Page Not Found ! {error?.data}
        </h1>
        <p className='text-xs sm:text-sm mt-3 text-gray-700'>
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className='mt-5'>
          <button
            className='bg-black text-white text-sm uppercase p-2 hover:bg-red-800 transition-all duration-300 hover:scale-x-110'
            onClick={() => navigate(-1)}
          >
            <span className='font-medium'>&larr;</span> go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
