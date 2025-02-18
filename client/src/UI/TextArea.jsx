
const TextArea = ({label,name,id,cols,rows,onChange,placeholder,value,disabled,className,required}) => {
  return (
    <div className={`min-w-full flex flex-col gap-1 py-2  ${className}`}>
        {
            label && <label className="text-neutral-600 text-xs font-bold tracking-wider  capitalize" htmlFor={id}>{label}</label>
        }
        <textarea
            id={id}
            name={name}
            cols={cols}
            rows={rows}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            required={required}
             className='w-full p-2 h-full outline-transparent border border-slate-300 rounded-md focus:border focus:border-white bg-blue-50 text-gray-600 z-0 text-sm resize-none'
        />
    </div>
  )
}

export default TextArea