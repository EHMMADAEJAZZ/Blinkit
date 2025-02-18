import { useEffect } from 'react';
import { useState } from 'react';

import { useRef } from 'react';

const Otp = ({ length, onComplete }) => {
  const [otps, setOtps] = useState(new Array(length).fill(''));
  const inputRef = useRef([]);
  useEffect(()=>{
    inputRef.current[0].focus();
  },[])
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) {
      return;
    }
    const newOtps = [...otps];
    newOtps[index] = value.substring(value.length-1);
    setOtps(newOtps);
    if (value && inputRef.current[index + 1]) {
      focusRight(index);
    }
    const combinedOtps = newOtps.join('');
    if (combinedOtps.length === length) {
      onComplete(combinedOtps);
    }
  };
  const handleKeyDown = (e, index) => {
    const newOtps = [...otps];
    if (e.key === 'ArrowRight' && index < length) {
      focusRight(index);
      return;
    }
    if (e.key === 'ArrowLeft' && index > 0) {
     e.target.setSelectionRange(1, 1);
      focusLeft(index);
      return;
    }
    if (e.key === 'Backspace' && index > 0) {
      if (index > 0) {
        newOtps[index] = '';
        setOtps(newOtps);
        focusLeft(index);
        return;
      }
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const clipBoardData = e.clipboardData.getData('text');
    let newOtps = [...otps];
    if (!isNaN(clipBoardData)) {
      newOtps = clipBoardData.split('');
      setOtps(newOtps);
      const combinedOtps = newOtps.join('');
      if (combinedOtps.length === length) {
        onComplete(combinedOtps);
      }
    }
  };
  const handleClick = (e, index) => {
    e.target.setSelectionRange(1, 1);
    if (
      inputRef.current[index - 1] &&
      inputRef.current[index - 1].value === ''
    ) {
      inputRef.current[otps.indexOf('')].focus();
    }
    if (index < length - 1 && inputRef.current[index].value) {
      inputRef.current[index + 1].focus();
    }
  };
  function focusRight(index) {
    if (index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  }
  function focusLeft(index) {
    if (index > 0 && inputRef.current[index - 1]) {
      inputRef.current[index - 1].focus();
    }
  }
  
  return (
   
        <div className='w-full  flex items-center justify-center min-h-32 gap-2'>
          {otps?.map((_, index) => (
            <input
              key={index}
              ref={(input) => {
                inputRef.current[index] = input;
              }}
              type='text'
              value={otps[index]}
              onChange={(e) => handleChange(e, index)}
              inputMode='numeric'
              maxLength={1}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={(e) => handleClick(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              
              className='w-14 h-14 text-center
               bg-gray-400 border outline-0 border-gray-600 shadow-sm shadow-blue-300 text-white transition-all focus:animate-pulse duration-300'
            />
          ))}
        </div>
     
  );
};

export default Otp;
