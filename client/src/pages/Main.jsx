import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <main className='flex-1 min-w-full  mt-32 mb-16 sm:mb-12 sm:mt-20 max-h-[82dvh] overflow-hidden overflow-y-hidden scrollbar-none scroll-smooth'>
      
      <Outlet />
      
    </main>
  );
};

export default Main;
