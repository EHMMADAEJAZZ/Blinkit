const CheckBox = ({
  label,
  id,
  name,
  onChange,
  checked = false,
  disabled,
  className,
}) => {
  return (
    <div className={`min-w-full flex items-center  gap-2 py-2  ${className}`}>
      {label && (
        <label htmlFor={id} className="text-gray-400 text-xs font-bold tracking-wider  capitalize">
          {label}
        </label>
      )}
      <input
        type='checkbox'
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
      />
    </div>
  );
};

export default CheckBox;
