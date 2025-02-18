import { useState } from 'react';
import {  FaRegCircleUser } from 'react-icons/fa6';
import { useSelector} from 'react-redux';
import UploadAvatar from '../components/UploadAvatar';

import Divider from '../components/Divider';
import ChangePassword from '../components/ChangePassword';
import UpdateUser from '../components/UpdateUser';
const Profile = () => {
  const [showUpload, setShowUpload] = useState(false);
  
   const { userDetails } = useSelector((state) => state.user);
 
 
  const onClose = ()=>{
    setShowUpload(false)
  }
  
 
  return (
    <div className='max-h-[69.9vh] p-2 sm:p-4 overflow-hidden overflow-y-scroll'>
      <div className='w-20 h-20 bg-slate-300 rounded-full flex justify-center items-center overflow-hidden drop-shadow-lg border border-gray-400'>
        {userDetails?.avatar ? (
          <img
            src={userDetails?.avatar}
            alt={userDetails?.name}
            className=' w-full h-full'
          />
        ) : (
          <FaRegCircleUser size={60} />
        )}
      </div>
      <button onClick={()=>setShowUpload(true)} className='w-fit min-w-20 py-[0.5px] px-1 mt-1 bg-gray-200 border rounded-full border-primary-100 hover:border-primary-200 hover:bg-primary-100 hover:text-white'>
        edit...
      </button>
      {
        showUpload && (<UploadAvatar onClose={onClose} />)
      }
      {/* update email name mobile */}
      <Divider className='my-5' />
      <UpdateUser/>
      <Divider className='my-5' />
      {/* reset password */}
      <ChangePassword/>
    </div>
  );
};

export default Profile;
