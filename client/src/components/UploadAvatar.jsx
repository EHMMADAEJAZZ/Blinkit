import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import api from "../common/api";
import { toast } from "react-toastify";
import { fetchUserDetailsSuccess } from "../features/user/userSlice";
import Model from "../UI/Model";
const UploadAvatar = ({onClose}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState('')
const dispatch = useDispatch()
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!avatar) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(avatar)
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [avatar])

     const { userDetails } = useSelector((state) => state.user);
     const handleAvatar=async(e)=>{
        e.preventDefault()
        if(!avatar){
            return;
        }
        setIsLoading(true)
        try {
           const formData = new FormData();
           formData.append('avatar', avatar);
           const data = await api.uploadAvatar(formData)
           dispatch(fetchUserDetailsSuccess(data?.data))
           toast.success(data?.message)
           onClose()
            
        } catch (error) {
          
            toast.error(error?.message)
        }finally{
            setIsLoading(false)
        }
     }
     const handleAvatarChange=(e)=>{
        setAvatar(e.target.files[0])

     }
  return (
    <section>
        <Model onCloseModel={onClose}>
           
            <div className='w-20 h-20 bg-slate-300 rounded-full flex justify-center items-center overflow-hidden drop-shadow-lg border border-gray-400'>
                  {userDetails?.avatar ? (
                    <img
                      src={preview?preview: userDetails?.avatar}
                      alt={userDetails?.name}
                      className=' w-full h-full'
                    />
                  ) : (
                    <FaRegCircleUser size={60} />
                  )}
                </div>
                <div className="w-full">
                    <form onSubmit={handleAvatar} className="w-full flex flex-col gap-4">
                        <label htmlFor="avatar" className="w-fit min-w-20  mt-1 text-sm bg-gray-200 border rounded-full border-primary-100 hover:border-primary-200 block p-1 hover:bg-neutral-700 hover:text-white">channge profile</label>
                        <input type="file" name="avatar" 
                        id="avatar" 
                        onChange={handleAvatarChange}
                        
                        className="hidden" />
                        <button type="submit" className={` min-w-20 p-2 mt-1 uppercase text-sm font-semibold bg-gray-200 border rounded-full border-primary-100 hover:border-primary-200 hover:bg-primary-100 hover:text-white ${!avatar && 'cursor-not-allowed'}`}>
                            {
                                isLoading? 'uploading...' : 'upload'
                            }
                        </button>
                    </form>
                </div>
        </Model>
    </section>
  )
}

export default UploadAvatar