import OverLay from './OverLay';
import { IoCloseCircle } from 'react-icons/io5';
const Model = ({ children, onCloseModel,className }) => {
  return (
    <OverLay>
    <div className={`bg-neutral-100 p-4 w-full max-w-md mx-auto rounded-md mt-8 max-h-[75vh] sm:max-h-[75vh] overflow-hidden overflow-y-scroll scrollbar-none relative ${className} `}>
        <div className=''>
          <button onClick={onCloseModel} className='w-fit block ml-auto text-white bg-black rounded-full hover:text-red-500 hover:bg-red-600 transition-all duration-300 hover:scale-110'>
            <IoCloseCircle size={25} className='hover:text-white' />
          </button>
        </div>
        <div className='h-full w-full flex items-center justify-center '>
          {children}
        </div>
      </div>
    </OverLay>
  );
};

export default Model;
