const SelectInput = ({
  label,
  name,
  options,
  id,
  value,
  disabled,
  onChange = () => {},
  className,
  defaultOption
}) => {
  return (
    
    <div className={`min-w-full flex flex-col gap-1 py-2  ${className}`}>
      {label && <label className="text-neutral-600 text-xs font-bold tracking-wider  capitalize" htmlFor={id}>{label}</label>}
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className='w-full p-2 max-h-[300px] overflow-hidden overflow-y-scrolll outline-transparent border border-slate-300 rounded-md focus:border focus:border-white bg-blue-50 text-gray-600 z-0 text-sm'
      >
        <option value={''}>
          {defaultOption}
        </option>
        {options.map((option, index) => (
          <option
            className='capitalize cursor-pointer my-5 bg-slate-200 text-green-600 border border-red-500 hover:text-xs focus:text-red-500'
            key={index}
            value={option._id || option.value}
          >
            {option.name || option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
