import { useLocation, useNavigate } from "react-router-dom";
import { useMobile } from "../hooks/useMobile";

const SearchInput = ({
  icon,
  name,
  placeholder,
  onChange = () => {},
  required,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  autoComplete = 'off',
  minLength = 0,
  defaultValue
  
}) => {
  const navigate = useNavigate()
  const isMobile = useMobile();
  const loaction = useLocation();
  const isSearchPage = loaction.pathname==='/search';
  const handleNavigate = ()=>{
    if(isMobile && isSearchPage){
        navigate('/')
      }
  }
  return (
    <div className={`w-full h-full flex items-center `}>
      {icon && (
        <button onClick={handleNavigate} className= {`flex justify-center items-center h-full group-focus-within:text-primary-200 primary-100 cursor-pointer text-neutral-600 rounded-full p-1 w-8 sm:w-10 text-xl sm:text-2xl ${(isMobile && isSearchPage) ?'bg-white mx-2 h-8 w-8':''} `}>
          {icon}
        </button>
      )}
      <input
        type='search'
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        minLength={minLength}
        className='w-full bg-inherit h-full outline-none p-2.5'
      />
      
    </div>
  );
};

export default SearchInput;
