const ImageInput = ({
    label,
  name,
  id,
  multiple=false,
  required,
  disabled,
  onChange = () => {},
  className,
  autoFocus=false,
  autoComplete = 'off',
  icon
}) => {
  return (
   <div className="min-w-full flex flex-col gap-1 py-2">
    {  label && 
  
<label htmlFor={id} className={`"text-gray-400 text-xs font-bold tracking-wider  capitalize" ${className}`}>
 <p>{label}</p> {icon}
   </label>

    
    }

      <input
        type='file'
        name={name}
        id={id}
        multiple={multiple}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className='hidden'
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        accept='image/*'
        />
        </div>
       
   
  );
};

export default ImageInput;