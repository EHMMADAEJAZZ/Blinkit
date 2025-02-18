import { CiSearch } from 'react-icons/ci';
import { TypeAnimation } from 'react-type-animation';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import { useMobile } from '../hooks/useMobile';
import { FaArrowLeft } from 'react-icons/fa';
import debounce from '../utils/debounce';
const Search = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const search = location.pathname === '/search';
    setIsSearch(search);
  }, [location]);
  const handleNavigate = () => {
    navigate('/search');
  };
  const isMobile = useMobile();
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setParams({ search: event.target.value });
  };
  //debouncing
  const debouncedSearchChange = useCallback(
    debounce(handleSearchChange, 300),
    []
  );

  // console.log(search)

  return (
    <div className='w-full max-w-[450px] h-full mx-auto min-w-[200px] sm:min-w-[250px]  md:min-w-[350px] lg:min-w-[450px] sm:h-10 flex items-center border  bg-slate-200 rounded-md text-neutral-500 group focus-within:border-primary-200 '>
      {isSearch ? (
        <SearchInput
          icon={isMobile ? <FaArrowLeft /> : <CiSearch />}
          placeholder='search for Atta Dal Rice etc'
          name='search'
          onChange={debouncedSearchChange}
          autoFocus={true}
          defaultValue={params.get('search')}
        />
      ) : (
        <div onClick={handleNavigate} className='w-full  p-2'>
          <TypeAnimation
            sequence={[
              'search "Miilk"',
              1000,
              'search "sugar"',
              1000,
              'search "Paneer"',
              1000,
              'search "Chocolate"',
              1000,
              'search "Rice"',
              1000,
              'search "Atta"',
              1000,
              'search "Chips"',
              1000,
            ]}
            wrapper='span'
            speed={50}
            className='w-full text-center text-neutral-600 text-xs sm:text-sm font-semibold capitalize px-2'
            repeat={Infinity}
          />
        </div>
      )}
      {!isSearch && (
        <button
          onClick={handleNavigate}
          className=' flex justify-center items-center h-full cursor-pointer text-neutral-600 rounded-full p-1 w-8 sm:w-10 text-xl sm:text-2xl '
        >
          <CiSearch />
        </button>
      )}
    </div>
  );
};

export default Search;
