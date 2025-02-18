import { IoCloseCircle } from 'react-icons/io5';
import InputText from '../UI/InputText';
import { useState } from 'react';
import { addressApi } from '../common/api';
import { toast } from 'react-toastify';
import { UseGlobalContext } from '../context/globalContext';

const AddAddress = ({ onCloseModel }) => {
  const [address, setAddress] = useState({
    addressLine: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    mobile: '',
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
    const {fetchAddresses} = UseGlobalContext()
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const validayeAddress = (values) => {
    const error = {};
    if (!values.addressLine) {
      error.addressLine = 'Address Line is required';
    }
    if (!values.city) {
      error.city = 'City is required';
    }
    if (!values.state) {
      error.state = 'State is required';
    }
    if (!values.country) {
      error.country = 'Country is required';
    }
    if (!values.pincode) {
      error.pincode = 'Pincode is required';
    }
    //validate pincode
    if (values.pincode && !/^[0-9]{6}$/.test(values.pincode)) {
      error.pincode = 'Invalid pincode';
    }

    if (!values.mobile) {
      error.mobile = 'Mobile number is required';
    }
    //validate mobile number
    if (values.mobile && !/^[0-9]{10}$/.test(values.mobile)) {
      error.mobile = 'Invalid mobile number';
    }
    return error;
  };
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const errors = validayeAddress(address);
    setError(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setLoading(true);
    try {
      const data = await addressApi.addAddress(address);
      toast.success(data?.message);
      fetchAddresses();  //update addresses in global state after adding a new address
      setAddress({
        addressLine: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        mobile: '',
      });
      onCloseModel();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className='bg-black bg-opacity-70 fixed top-0 bottom-0 left-0 right-0 z-50 backdrop-blur-md'>
      <div className='bg-white p-4 w-full max-w-lg mx-auto rounded mt-8 max-h-[75vh] sm:max-h-[75vh] overflow-hidden overflow-y-scroll customscrollbar relative  '>
        <div className=''>
          <button
            onClick={onCloseModel}
            className='w-fit block ml-auto text-white bg-black rounded-full hover:text-red-500 hover:bg-red-600 transition-all duration-300 hover:scale-110'
          >
            <IoCloseCircle size={25} className='hover:text-white' />
          </button>
        </div>
        <h2 className='text-base sm:text-lg font-medium tracking-widest'>Add Address</h2>
        <div className='p-2'>
          <form onSubmit={handleAddressSubmit}>
            <div>
              <InputText
                label='address Line'
                type='text'
                id='addressLine'
                name='addressLine'
                value={address.addressLine}
                onChange={handleAddressChange}
                placeholder='Enter address'
                autoFocus={true}
                disabled={loading}
              />
              {error.addressLine && (
                <p className='error'>{error.addressLine}</p>
              )}
            </div>
            <div>
              <InputText
                label='City'
                type='text'
                id='city'
                name='city'
                value={address.city}
                onChange={handleAddressChange}
                placeholder='Enter city'
                disabled={loading}
              />
              {error.city && <p className='error'>{error.city}</p>}
            </div>
            <div>
              <InputText
                label='State'
                type='text'
                id='state'
                name='state'
                value={address.state}
                onChange={handleAddressChange}
                placeholder='Enter state'
                disabled={loading}
              />
              {error.state && <p className='error'>{error.state}</p>}
            </div>
            <div>
              <InputText
                label='Country'
                type='text'
                id='country'
                name='country'
                value={address.country}
                onChange={handleAddressChange}
                placeholder='Enter country'
                disabled={loading}
              />
              {error.country && <p className='error'>{error.country}</p>}
            </div>
            <div>
              <InputText
                label='Pincode'
                type='number'
                id='pincode'
                name='pincode'
                value={address.pincode}
                onChange={handleAddressChange}
                placeholder='Enter pincode'
                disabled={loading}
              />
              {error.pincode && <p className='error'>{error.pincode}</p>}
            </div>
            <div>
              <InputText
                label='Mobile'
                type='number'
                id='mobile'
                name='mobile'
                value={address.mobile}
                onChange={handleAddressChange}
                placeholder='Enter mobile number'
                disabled={loading}
              />
              {error.mobile && <p className='error'>{error.mobile}</p>}
            </div>
            <div className='w-full max-w-lg my-2 flex items-center justify-center'>
              <button
                type='submit'
                className='text-white bg-green-600 rounded hover:bg-green-700 w-full px-5 py-2 transition-all duration-300'
              >
                {loading ? 'Adding...' : 'Add Address'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddAddress;
