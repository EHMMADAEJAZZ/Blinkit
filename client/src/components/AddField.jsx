import { useState } from 'react';
import InputText from '../UI/InputText';
import Model from '../UI/Model';
const AddField = ({ onClose, submit, value, onChange = () => {} }) => {
  const [error, setError] = useState('');
  const handleAddField = () => {
    if (value === '') {
      setError('Please enter a field name');
      return;
    }
    submit();
  };
  return (
    <section className='w-[300px]'>
      <Model onCloseModel={onClose} className='w-full p-2 sm:p-2 bg-slate-50 '>
        <div className='w-full max-w-[400px] p-5 flex flex-col gap-4'>
          <div>
            <InputText
              type='text'
              autoFocus={true}
              id='addfield'
              value={value}
              onChange={onChange}
              placeholder='Enter field Name'
              label='Field Name'
            />
            
            {error ? (
              <p className='text-red-500 text-xs mt-1'>{error}</p>
            ) : (
              <p className='text-gray-800 capitalize text-sm mt-1 '>
                add field for more details
              </p>
            )}
          </div>
          <button
            type='submit'
            onClick={handleAddField}
            className='bg-primary-200 px-4 py-2 rounded border border-slate-300 text-xs  tracking-widest font-bold hover:bg-primary-100 capitalize'
          >
            Add Field
          </button>
        </div>
      </Model>
    </section>
  );
};

export default AddField;
