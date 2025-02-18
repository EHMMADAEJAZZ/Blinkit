const InputText = ({
  label='',
  type,
  name,
  id,
  value,
  placeholder,
  required,
  disabled,
  onChange = () => {},
  className,
  autoFocus=false,
  autoComplete = 'off',
  icon
}) => {
  return (
    <div className={`min-w-full flex flex-col gap-1 py-2  ${className}`}>
      {label && <label htmlFor={id} className="text-neutral-600 text-xs font-bold tracking-wider  capitalize">{label}</label>}
      <div className="relative">

      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className='w-full p-2 h-full outline-transparent border border-slate-300 rounded-md focus:border focus:border-white bg-blue-50 text-gray-600 z-0 text-sm'
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        />
        {
          icon && (
            <div className='absolute right-0 top-2 pr-2 cursor-pointer'>
              {
                icon
              }
            </div>
          )  // End of icon conditional rendering
        }
        </div>
    </div>
  );
};

export default InputText;
