import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import AddAddress from '../components/AddAddress';
import { UseGlobalContext } from '../context/globalContext';
import EditAddress from '../components/EditAddress';
import ConfirmDeleteBox from '../components/ConfirmDeleteBox';
import { addressApi } from '../common/api';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
const Address = () => {
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isDeleteAddressOpen, setIsDeleteAddressOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addreseList } = useSelector((state) => state.address);
  const { fetchAddresses } = UseGlobalContext();

  const toggleAddAddress = () => {
    setIsAddressOpen(!isAddressOpen);
  };
  const toggleEditAddAddress = () => {
    setIsEditAddressOpen(!isEditAddressOpen);
  };
  const toggleDeleteAddress = (id) => {
    setIsDeleteAddressOpen(!isDeleteAddressOpen);
    setDeleteId(id);
  };
  useEffect(() => {
    fetchAddresses();
  }, []);
  const handleEditAddress = (data) => {
    setIsEditAddressOpen(!isEditAddressOpen);
    setEditAddressData(data);
  };
  const handleDeleteAddress = async (addressId) => {
    setDeleting(true);
    try {
      const res = await addressApi.deleteAddress(addressId);
      toast.success(res?.message);
      fetchAddresses();
    } catch (error) {
      if(error?.message){

        toast.error(error?.message);
      }
    } finally {
      setDeleting(false);
    }
  };
  const handlePrimaryAddress = async (addressId) => {
    setLoading(true);
    try {
      const res = await addressApi.setPrimaryAddress(addressId);
      toast.success(res?.message);
      fetchAddresses();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const disabledAddress = async (addressId) => {
    setLoading(true);
    try {
      const res = await addressApi.disableAddress(addressId);
      toast.success(res?.message);
      fetchAddresses();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  const enableAddress = async (addressId) => {
    setLoading(true);
    try {
      const res = await addressApi.enableAddress(addressId);
      toast.success(res?.message);
      fetchAddresses();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className='bg-blue-50  w-full top-28 sm:top-20 p-0 sm:p-1'>
      <div className='w-full shadow border-b-2  bg-white p-2 flex items-center justify-between '>
        <h3 className='font-semibold text-lg tracking-widest'>Saved Address</h3>
        <button
          onClick={toggleAddAddress}
          className='text-xs sm:text-sm bg-primary-200 hover:bg-primary-100 border border-gray-500 rounded-sm text-white uppercase py-1 px-3 tracking-widest sm:font-semibold'
        >
          
          Add address
        </button>
      </div>
      <div className='bg-white w-full  min-h-[63vh] sm:min-h-[72vh] max-h-[63vh] sm:max-h-[72vh] overflow-hidden overflow-y-scroll scrollbar-none scroll-smooth '>
        {/* addressess */}
        <div className=''>
          <div className=' flex flex-col gap-2 p-4'>
            {addreseList[0] &&
              addreseList.map((addres, index) => (
                <div
                  key={index}
                  className=' w-full max-w-2xl rounded text-xs font-medium flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 shadow-md border  '
                >
                  <div className='grid gap-1'>
                    <p>{addres?.addressLine}</p>
                    <p>{addres?.city}</p>
                    <p>
                      <span>{addres?.state}</span>-{' '}
                      <span>{addres?.pincode}</span>
                    </p>
                    <p>{addres?.country}</p>
                    <div className='flex gap-2 items-center'>
                      <p className='text-green-600 capitalize'>
                        {addres?.status ? (
                          <span>active</span>
                        ) : (
                          <span className='text-orange-400 capitaliz'>
                            disabled
                          </span>
                        )}
                      </p>
                      <p
                        className={`text-orange-400 capitalize  ${loading?'cursor-wait':"cursor-pointer"}`}
                      >
                        {addres?.status ? (
                          <span
                            onClick={() => disabledAddress(addres?._id)}
                            className='text-orange-400 capitaliz'
                          >
                            disable
                          </span>
                        ) : (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              enableAddress(addres?._id);
                            }}
                            className='text-green-600 capitalize'
                          >
                            enable
                          </span>
                        )}
                      </p>
                    </div>
                    <p className='text-blue-500 capitalize mt-2'>
                      {addres?.isDefault ? (
                        <span>Primary</span>
                      ) : (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrimaryAddress(addres?._id);
                          }}
                          className={`text-orange-500   border border-gray-300 block w-fit px-4 py-1 rounded ${
                            loading ? 'cursor-wait' : 'cursor-pointer'
                          }`}
                        >
                          set primary
                        </span>
                      )}
                    </p>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(addres);
                    }}
                    className='flex sm:flex-col items-center sm:justify-between gap-4'
                  >
                    <button className='w-fit p-1 border rounded-md capitalize text-xs font-semibold bg-green-700 text-white hover:bg-green-800 transition-all duration-300 tracking-widest'>
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDeleteAddress(addres._id);
                      }}
                      className='w-fit p-1 border rounded-md capitalize text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-300 tracking-widest'
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* summary */}
      </div>
      {isAddressOpen && <AddAddress onCloseModel={toggleAddAddress} />}
      {isEditAddressOpen && (
        <EditAddress
          addressData={editAddressData}
          onCloseModel={toggleEditAddAddress}
        />
      )}
      <div className='w-full'>
        {isDeleteAddressOpen && (
          <ConfirmDeleteBox
            closeModel={toggleDeleteAddress}
            deleteHandler={handleDeleteAddress}
            label='Are you sure you want to delete this address?'
            deleteId={deleteId}
            deleting={deleting}
          />
        )}
      </div>
    </section>
  );
};

export default Address;
