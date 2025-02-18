import Model from '../UI/Model';
// import { toast } from 'react-toastify';
import Divider from './Divider';

const ConfirmDeleteBox = ({
  closeModel,
  label,
  deleteHandler,
  deleteId,
  deleting,
}) => {
  return (
    <div className='bg-gray-900 w-full min-h-screen flex justify-center items-center'>
      <Model onCloseModel={closeModel} className=' max-w-lg p-5  '>
        <div className='flex flex-col  min-h-[100px] '>
          <div className='flex-1'>
            <h1 className='text-xs sm:text-sm font-semibold tracking-widest'>
              Delete Permanently
            </h1>
            <Divider className='bg-red-700 mt-1' />
            <p className='text-red-600 text-xs tracking-wide'>{label}</p>
          </div>
          <div className='flex justify-between items-center p-2'>
            <button
              onClick={closeModel}
              className='tracking-widest px-2 py-1 border border-red-500 hover:bg-red-500 rounded hover:text-white font-semibold hover:scale-110 transition-all duration-500 w-32 shadow-md shadow-red-600'
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await deleteHandler(deleteId);
                closeModel();
              }}
              className={`tracking-widest px-2 py-1 border border-green-600 hover:bg-green-600 rounded hover:text-white font-semibold hover:scale-110 transition-all duration-500 w-32 shadow-md shadow-green-600 ${deleting?"bg-green-600 cursor-wait text-white scale-110":""}`}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Model>
    </div>
  );
};

export default ConfirmDeleteBox;
